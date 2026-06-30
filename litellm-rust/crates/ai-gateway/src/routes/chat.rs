//! Chat Completions 路由 — 代理转发到 LLM 提供商
//!
//! POST /v1/chat/completions — OpenAI 兼容的聊天补全接口
//! 验证 API Key → 查找提供商配置 → 转发请求 → 返回响应

use axum::{
    body::Body,
    extract::State,
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use litellm_core::chat::types::{ChatCompletionRequest, ChatCompletionResponse};
use serde_json::{json, Value};
use std::sync::Arc;

use crate::chat_state::ChatAppState;

/// POST /v1/chat/completions
pub async fn chat_completions(
    State(state): State<Arc<ChatAppState>>,
    headers: HeaderMap,
    Json(mut request): Json<ChatCompletionRequest>,
) -> impl IntoResponse {
    // 1. 验证 API Key
    let auth_header = headers
        .get("authorization")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("");

    let token = auth_header.strip_prefix("Bearer ").unwrap_or("");

    if !state.validate_token(token) {
        return (
            StatusCode::UNAUTHORIZED,
            Json(json!({"error": {"message": "无效的 API 密钥", "type": "auth_error"}})),
        )
            .into_response();
    }

    // 2. 根据模型名查找提供商配置
    let provider = match state.resolve_provider(&request.model) {
        Some(p) => p,
        None => {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({"error": {"message": format!("未找到模型: {}", request.model), "type": "invalid_model"}})),
            )
                .into_response();
        }
    };

    // 3. 构建提供商请求
    let provider_url = format!("{}/chat/completions", provider.api_base.trim_end_matches('/'));

    // 确保 model 使用提供商端正确的模型名
    if let Some(ref mapped_model) = provider.model {
        request.model = mapped_model.clone();
    }

    // 4. 转发请求到提供商
    let client = reqwest::Client::new();
    let response = match client
        .post(&provider_url)
        .header("Authorization", format!("Bearer {}", provider.api_key))
        .header("Content-Type", "application/json")
        .json(&request)
        .send()
        .await
    {
        Ok(resp) => resp,
        Err(e) => {
            return (
                StatusCode::BAD_GATEWAY,
                Json(json!({"error": {"message": format!("请求提供商失败: {}", e), "type": "provider_error"}})),
            )
                .into_response();
        }
    };

    let status = response.status();
    let body_bytes = match response.bytes().await {
        Ok(b) => b,
        Err(e) => {
            return (
                StatusCode::BAD_GATEWAY,
                Json(json!({"error": {"message": format!("读取提供商响应失败: {}", e), "type": "provider_error"}})),
            )
                .into_response();
        }
    };

    // 5. 记录用量（异步，不影响响应）
    if status.is_success() {
        if let Ok(completion) = serde_json::from_slice::<ChatCompletionResponse>(&body_bytes) {
            if let Some(usage) = &completion.usage {
                let _ = state.record_usage(
                    &request.model,
                    usage.prompt_tokens as u64,
                    usage.completion_tokens as u64,
                    usage.total_tokens as u64,
                );
            }
        }
    }

    // 6. 返回提供商的原始响应
    (
        StatusCode::from_u16(status.as_u16()).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR),
        [(axum::http::header::CONTENT_TYPE, "application/json")],
        Body::from(body_bytes),
    )
        .into_response()
}

/// 健康检查（也用于验证 chat 服务）
pub async fn health_check() -> &'static str {
    "ok"
}

/// 前端 well-known UI config
async fn ui_well_known() -> impl IntoResponse {
    Json(json!({
        "server_root_path": "",
        "proxy_base_url": null,
        "auto_redirect_to_sso": false,
        "admin_ui_disabled": false,
        "sso_configured": false,
        "is_control_plane": false,
    }))
}

/// 创建 chat 路由（含前端静态文件 + 管理 API）
pub fn router(state: Arc<ChatAppState>) -> axum::Router {
    use tower_http::services::{ServeDir, ServeFile};

    let static_dir = std::env::var("STATIC_DIR").unwrap_or_else(|_| "./static".to_string());
    let index_path = format!("{}/index.html", static_dir);

    // 未匹配 API 请求返回空 JSON
    async fn json_fallback() -> Json<Value> {
        Json(json!({}))
    }

    axum::Router::new()
        .route("/v1/chat/completions", axum::routing::post(chat_completions))
        .route("/health", axum::routing::get(health_check))
        .route("/litellm/.well-known/litellm-ui-config", axum::routing::get(ui_well_known))
        .merge(crate::routes::management::router())
        // 静态资源
        .nest_service("/_next", ServeDir::new(format!("{}/_next", static_dir)))
        .route_service("/favicon.ico", ServeFile::new(format!("{}/favicon.ico", static_dir)))
        // API 通配 fallback（返回空 JSON，避免前端 404 卡死）
        .route("/v1/{*path}", axum::routing::any(json_fallback))
        .route("/public/{*path}", axum::routing::any(json_fallback))
        .route("/get/{*path}", axum::routing::any(json_fallback))
        .route("/key/{*path}", axum::routing::any(json_fallback))
        .route("/user/{*path}", axum::routing::any(json_fallback))
        .route("/model/{*path}", axum::routing::any(json_fallback))
        .route("/global/{*path}", axum::routing::any(json_fallback))
        // SPA fallback: 其他路径返回 index.html
        .route_service("/", ServeFile::new(&index_path))
        .fallback_service(ServeFile::new(&index_path))
        .with_state(state)
}
