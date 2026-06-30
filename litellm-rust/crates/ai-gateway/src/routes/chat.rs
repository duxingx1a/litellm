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
        "proxy_base_url": "http://127.0.0.1:3000",
        "auto_redirect_to_sso": false,
        "admin_ui_disabled": false,
        "sso_configured": false,
        "is_control_plane": false,
    }))
}

/// SPA fallback: API 返回空 JSON，静态文件原样返回，其他返回 index.html
async fn spa_fallback(req: axum::http::Request<axum::body::Body>) -> impl IntoResponse {
    let path = req.uri().path().to_string();

    // API 路径：返回空 JSON
    if path.starts_with("/v1/") || path.starts_with("/get/") || path.starts_with("/user/")
        || path.starts_with("/key/") || path.starts_with("/public/") || path.starts_with("/global/")
        || path.starts_with("/model/") || path.starts_with("/login") || path.starts_with("/v2/")
        || path.starts_with("/v3/") || path.starts_with("/litellm/")
    {
        return Json(json!({})).into_response();
    }

    // 尝试从静态目录返回对应文件
    let static_dir = std::env::var("STATIC_DIR").unwrap_or_else(|_| "./static".to_string());
    // 去掉 /ui 前缀后尝试匹配
    let file_path = if path.starts_with("/ui/") {
        format!("{}/{}", static_dir, &path[4..])
    } else if path == "/ui" || path == "/ui/" {
        format!("{}/index.html", static_dir)
    } else if path == "/" {
        format!("{}/index.html", static_dir)
    } else {
        format!("{}{}", static_dir, path)
    };

    // 先检查文件是否存在
    if let Ok(metadata) = tokio::fs::metadata(&file_path).await {
        if metadata.is_file() {
            if let Ok(content) = tokio::fs::read(&file_path).await {
                let ct = if file_path.ends_with(".html") || file_path.ends_with("/") {
                    "text/html; charset=utf-8"
                } else if file_path.ends_with(".json") {
                    "application/json"
                } else if file_path.ends_with(".js") {
                    "application/javascript"
                } else if file_path.ends_with(".css") {
                    "text/css"
                } else {
                    "application/octet-stream"
                };
                return (StatusCode::OK, [(axum::http::header::CONTENT_TYPE, ct)], content).into_response();
            }
        }
        if metadata.is_dir() {
            // 目录则尝试 index.html
            let idx = format!("{}/index.html", file_path.trim_end_matches('/'));
            if let Ok(content) = tokio::fs::read(&idx).await {
                return (StatusCode::OK, [(axum::http::header::CONTENT_TYPE, "text/html; charset=utf-8")], content).into_response();
            }
        }
    }

    // 最终 fallback: index.html (SPA)
    let index = format!("{}/index.html", static_dir);
    if let Ok(content) = tokio::fs::read(&index).await {
        (StatusCode::OK, [(axum::http::header::CONTENT_TYPE, "text/html; charset=utf-8")], content).into_response()
    } else {
        (StatusCode::NOT_FOUND, "not found").into_response()
    }
}

/// 创建 chat 路由
pub fn router(state: Arc<ChatAppState>) -> axum::Router {
    use tower_http::services::{ServeDir, ServeFile};
    use tower_http::cors::{Any, CorsLayer};

    let static_dir = std::env::var("STATIC_DIR").unwrap_or_else(|_| "./static".to_string());

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    axum::Router::new()
        .route("/v1/chat/completions", axum::routing::post(chat_completions))
        .route("/health", axum::routing::get(health_check))
        .route("/litellm/.well-known/litellm-ui-config", axum::routing::get(ui_well_known))
        .merge(crate::routes::management::router())
        .layer(cors)
        // 静态资源
        .nest_service("/_next", ServeDir::new(format!("{}/_next", static_dir)))
        .nest_service("/ui/_next", ServeDir::new(format!("{}/_next", static_dir)))
        .nest_service("/assets", ServeDir::new(format!("{}/assets", static_dir)))
        .route_service("/favicon.ico", ServeFile::new(format!("{}/favicon.ico", static_dir)))
        // SPA fallback
        .fallback(spa_fallback)
        .with_state(state)
}
