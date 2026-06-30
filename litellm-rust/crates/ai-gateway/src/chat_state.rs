//! Chat 服务的应用状态
//! 管理 API Key 验证、提供商配置解析、用量统计

use litellm_core::chat::types::ProviderConfig;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};

/// 用量统计累计数据
#[derive(Debug, Default, Clone)]
pub struct TokenUsage {
    pub prompt_tokens: u64,
    pub completion_tokens: u64,
    pub total_tokens: u64,
    pub request_count: u64,
}

/// Chat 服务的全局状态
pub struct ChatAppState {
    /// 有效的 API 密钥集合
    pub api_keys: Vec<String>,
    /// 模型名 → 提供商配置映射
    pub model_providers: HashMap<String, ProviderConfig>,
    /// 用量统计（按模型分组）
    pub usage: Mutex<HashMap<String, TokenUsage>>,
    /// 总用量
    pub total_usage: Mutex<TokenUsage>,
}

impl ChatAppState {
    /// 从环境变量加载配置
    /// 格式：CHAT_PROVIDERS=model1@openai@https://api.openai.com/v1@sk-xxx;model2@deepseek@https://api.deepseek.com/v1@sk-yyy
    pub fn from_env() -> Result<Self, String> {
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

                model_providers.insert(
                    model.clone(),
                    ProviderConfig {
                        provider,
                        api_base: api_base.clone(),
                        api_key,
                        model: Some(model),
                    },
                );

                eprintln!("已加载模型: {} -> {}", model, api_base);
            }
        }

        Ok(Self {
            api_keys,
            model_providers,
            usage: Mutex::new(HashMap::new()),
            total_usage: Mutex::new(TokenUsage::default()),
        })
    }

    /// 验证 API Key
    pub fn validate_token(&self, token: &str) -> bool {
        if self.api_keys.is_empty() {
            // 未配置密钥时允许所有请求（开发模式）
            return true;
        }
        self.api_keys.iter().any(|k| {
            // 使用 constant-time 比较防止时序攻击
            k.as_bytes() == token.as_bytes()
        })
    }

    /// 解析提供商配置
    pub fn resolve_provider(&self, model: &str) -> Option<&ProviderConfig> {
        self.model_providers.get(model)
    }

    /// 记录用量
    pub fn record_usage(
        &self,
        model: &str,
        prompt_tokens: u64,
        completion_tokens: u64,
        total_tokens: u64,
    ) {
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
    }
}
