//! LiteLLM Chat Gateway — 精简版 AI 代理服务器
//!
//! 功能：chat/completions 代理转发 + API Key 验证 + 用量统计
//!
//! 配置方式：
//!   LITELLM_MASTER_KEY=your-key
//!   CHAT_PROVIDERS=gpt-4o@openai@https://api.openai.com/v1@sk-xxx;claude-3@anthropic@https://api.anthropic.com/v1@sk-yyy
//!   HOST=0.0.0.0
//!   PORT=4001

use std::sync::Arc;

use litellm_ai_gateway::chat_state::ChatAppState;
use litellm_ai_gateway::routes::chat;

const DEFAULT_HOST: &str = "127.0.0.1";
const DEFAULT_PORT: u16 = 4001;

#[tokio::main]
async fn main() {
    // 加载配置
    let chat_state = match ChatAppState::from_env() {
        Ok(state) => state,
        Err(e) => {
            eprintln!("配置加载失败: {}", e);
            std::process::exit(1);
        }
    };

    let state = Arc::new(chat_state);

    let host = std::env::var("HOST").unwrap_or_else(|_| DEFAULT_HOST.to_string());
    let port = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(DEFAULT_PORT);

    // 构建路由
    let app = chat::router(state);

    let listener = tokio::net::TcpListener::bind((host.as_str(), port))
        .await
        .expect("端口绑定失败");

    eprintln!(
        "🚀 LiteLLM Chat Gateway 已启动: http://{}:{}",
        host, port
    );
    eprintln!("   端点: POST /v1/chat/completions");
    eprintln!("   健康检查: GET /health");

    axum::serve(listener, app)
        .await
        .expect("服务器错误");
}
