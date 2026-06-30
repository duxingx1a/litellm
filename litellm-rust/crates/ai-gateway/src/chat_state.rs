//! Chat 服务的应用状态
//! 管理 API Key 验证、提供商配置解析、用量统计（内存+PostgreSQL持久化）

use litellm_core::chat::types::ProviderConfig;
use std::collections::HashMap;
use std::sync::Mutex;
use tokio::sync::mpsc;

/// 用量统计累计数据
#[derive(Debug, Default, Clone)]
pub struct TokenUsage {
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
    pub request_count: u64,
}

/// 单次用量记录（用于异步写入 PostgreSQL）
#[derive(Debug, Clone)]
pub struct UsageRecord {
    pub model: String,
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
}

/// Chat 服务的全局状态
pub struct ChatAppState {
    /// 有效的 API 密钥集合
    pub api_keys: Vec<String>,
    /// 模型名 → 提供商配置映射
    pub model_providers: HashMap<String, ProviderConfig>,
    /// 用量统计（按模型分组，内存中）
    pub usage: Mutex<HashMap<String, TokenUsage>>,
    /// 总用量
    pub total_usage: Mutex<TokenUsage>,
    /// PostgreSQL 异步写入通道
    pub db_tx: Option<mpsc::UnboundedSender<UsageRecord>>,
}

impl ChatAppState {
    /// 从环境变量加载配置，同时启动 PostgreSQL 后台写入器
    pub async fn from_env() -> Result<Self, String> {
        let master_key = std::env::var("LITELLM_MASTER_KEY")
            .map(|k| k.trim().to_string())
            .unwrap_or_default();

        let api_keys: Vec<String> = if master_key.is_empty() {
            Vec::new()
        } else {
            vec![master_key]
        };

        let mut model_providers = HashMap::new();

        // 解析 CHAT_PROVIDERS 环境变量
        if let Ok(providers_str) = std::env::var("CHAT_PROVIDERS") {
            for entry in providers_str.split(';') {
                let entry = entry.trim();
                if entry.is_empty() {
                    continue;
                }
                let parts: Vec<&str> = entry.splitn(4, '@').collect();
                if parts.len() < 4 {
                    eprintln!("警告: 跳过无效的提供商配置: {}", entry);
                    continue;
                }
                let model = parts[0].trim().to_string();
                let provider = parts[1].trim().to_string();
                let api_base = parts[2].trim().to_string();
                let api_key = parts[3].trim().to_string();

                let display_name = model.clone();
                model_providers.insert(
                    model.clone(),
                    ProviderConfig {
                        provider,
                        api_base: api_base.clone(),
                        api_key,
                        model: Some(model),
                    },
                );

                eprintln!("已加载模型: {} -> {}", display_name, api_base);
            }
        }

        // 启动 PostgreSQL 后台写入器
        let db_tx = Self::spawn_db_writer().await;

        Ok(Self {
            api_keys,
            model_providers,
            usage: Mutex::new(HashMap::new()),
            total_usage: Mutex::new(TokenUsage::default()),
            db_tx,
        })
    }

    /// 启动 PostgreSQL 后台写入 worker
    async fn spawn_db_writer() -> Option<mpsc::UnboundedSender<UsageRecord>> {
        let db_url = std::env::var("DATABASE_URL").ok()?;
        if db_url.is_empty() {
            eprintln!("未配置 DATABASE_URL，用量仅保存在内存中");
            return None;
        }

        let (tx, mut rx) = mpsc::unbounded_channel::<UsageRecord>();

        tokio::spawn(async move {
            // 连接 PostgreSQL
            let (client, connection) = match tokio_postgres::connect(&db_url, tokio_postgres::NoTls).await {
                Ok(conn) => conn,
                Err(e) => {
                    eprintln!("PostgreSQL 连接失败: {}，用量仅保存在内存中", e);
                    return;
                }
            };

            // 后台驱动连接
            tokio::spawn(async move {
                if let Err(e) = connection.await {
                    eprintln!("PostgreSQL 连接断开: {}", e);
                }
            });

            // 确保表存在
            if let Err(e) = client
                .execute(
                    "CREATE TABLE IF NOT EXISTS chat_usage_logs (
                        id SERIAL PRIMARY KEY,
                        model VARCHAR(255) NOT NULL,
                        prompt_tokens BIGINT NOT NULL DEFAULT 0,
                        completion_tokens BIGINT NOT NULL DEFAULT 0,
                        total_tokens BIGINT NOT NULL DEFAULT 0,
                        created_at TIMESTAMP NOT NULL DEFAULT NOW()
                    )",
                    &[],
                )
                .await
            {
                eprintln!("创建用量表失败: {}", e);
                return;
            }

            eprintln!("PostgreSQL 用量写入器已就绪");

            // 批量写入优化：每秒最多写入一次
            let mut batch: Vec<UsageRecord> = Vec::new();
            let mut tick = tokio::time::interval(std::time::Duration::from_secs(1));

            loop {
                tokio::select! {
                    Some(record) = rx.recv() => {
                        batch.push(record);
                        // 积累到 50 条或等待 tick
                        if batch.len() >= 50 {
                            Self::flush_batch(&client, &mut batch).await;
                        }
                    }
                    _ = tick.tick() => {
                        if !batch.is_empty() {
                            Self::flush_batch(&client, &mut batch).await;
                        }
                    }
                    else => break, // channel 关闭
                }
            }
        });

        Some(tx)
    }

    /// 批量写入 PostgreSQL
    async fn flush_batch(
        client: &tokio_postgres::Client,
        batch: &mut Vec<UsageRecord>,
    ) {
        if batch.is_empty() {
            return;
        }

        let records: Vec<UsageRecord> = batch.drain(..).collect();
        let count = records.len();

        for record in &records {
            if let Err(e) = client
                .execute(
                    "INSERT INTO chat_usage_logs (model, prompt_tokens, completion_tokens, total_tokens)
                     VALUES ($1, $2, $3, $4)",
                    &[
                        &record.model,
                        &(record.prompt_tokens as i64),
                        &(record.completion_tokens as i64),
                        &(record.total_tokens as i64),
                    ],
                )
                .await
            {
                eprintln!("写入用量失败: {}", e);
                // 不因为一条失败而丢弃整批
            }
        }

        if count > 1 {
            eprintln!("已批量写入 {} 条用量记录", count);
        }
    }

    /// 验证 API Key
    pub fn validate_token(&self, token: &str) -> bool {
        if self.api_keys.is_empty() {
            return true;
        }
        self.api_keys.iter().any(|k| {
            k.as_bytes() == token.as_bytes()
        })
    }

    /// 解析提供商配置
    pub fn resolve_provider(&self, model: &str) -> Option<&ProviderConfig> {
        self.model_providers.get(model)
    }

    /// 记录用量（内存 + 异步写入 PostgreSQL）
    pub fn record_usage(
        &self,
        model: &str,
        prompt_tokens: u64,
        completion_tokens: u64,
        total_tokens: u64,
    ) {
        // 内存中的累计统计
        if let Ok(mut usage) = self.usage.lock() {
            let entry = usage.entry(model.to_string()).or_default();
            entry.prompt_tokens += prompt_tokens;
            entry.completion_tokens += completion_tokens;
            entry.total_tokens += total_tokens;
            entry.request_count += 1;
        }
        if let Ok(mut total) = self.total_usage.lock() {
            total.prompt_tokens += prompt_tokens;
            total.completion_tokens += completion_tokens;
            total.total_tokens += total_tokens;
            total.request_count += 1;
        }

        // 异步写入 PostgreSQL
        if let Some(ref tx) = self.db_tx {
            let _ = tx.send(UsageRecord {
                model: model.to_string(),
                prompt_tokens,
                completion_tokens,
                total_tokens,
            });
        }
    }
}
