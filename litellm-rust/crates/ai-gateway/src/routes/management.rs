//! 管理 API 路由 — 逐步替代 Python 后端的核心功能
//!
//! 个人精简版 API：
//! - POST /login — 用 master key 登录
//! - GET /get/ui_settings — 返回最小 UI 配置
//! - GET /user/info — 返回当前用户信息
//! - GET /global/spend/logs — 返回用量数据（从 PostgreSQL）

use axum::{
    extract::State,
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    Json,
};
use serde_json::{json, Value};
use std::sync::Arc;

use crate::chat_state::ChatAppState;

/// POST /login 或 /v2/login — 用户名+密码或直接Bearer登录
pub async fn login(
    State(state): State<Arc<ChatAppState>>,
    headers: HeaderMap,
    Json(body): Json<Value>,
) -> impl IntoResponse {
    // 方式1：Bearer token（优先）
    if let Some(auth) = headers.get("authorization") {
        if let Ok(auth_str) = auth.to_str() {
            let token = auth_str.strip_prefix("Bearer ").unwrap_or("");
            if state.validate_token(token) {
                return (
                    StatusCode::OK,
                    [
                        (axum::http::header::SET_COOKIE, format!("token={}; Path=/; SameSite=Lax; Max-Age=86400", token)),
                    ],
                    Json(json!({
                        "token": token,
                        "user_id": "default_user",
                        "user_role": "admin",
                        "user_email": "admin@local",
                        "redirect_url": "/"
                    })),
                ).into_response();
            }
        }
    }

    // 方式2：JSON body { username, password }
    let password = body
        .get("password")
        .and_then(|v| v.as_str())
        .unwrap_or("");

    if state.validate_token(password) {
        return (
            StatusCode::OK,
            [
                (axum::http::header::SET_COOKIE, format!("token={}; Path=/; SameSite=Lax; Max-Age=86400", password)),
            ],
            Json(json!({
                "token": password,
                "user_id": "default_user",
                "user_role": "admin",
                "user_email": "admin@local",
                "redirect_url": "/"
            })),
        ).into_response();
    }

    (StatusCode::UNAUTHORIZED, Json(json!({"error": "密钥无效"}))).into_response()
}

/// GET /get/ui_settings — UI 配置
pub async fn ui_settings(State(state): State<Arc<ChatAppState>>) -> impl IntoResponse {
    let models: Vec<Value> = state
        .model_providers
        .keys()
        .map(|m| json!({"model_name": m, "litellm_params": {"model": m}}))
        .collect();

    Json(json!({
        "admin_ui_disabled": false,
        "auto_redirect_to_sso": false,
        "is_control_plane": false,
        "default_ui_mode": "all",
        "enable_projects_ui": false,
        "model_list": models,
    }))
}

/// GET /user/info — 当前用户信息
pub async fn user_info() -> impl IntoResponse {
    Json(json!({
        "user_id": "default_user",
        "user_role": "admin",
        "user_email": "admin@local",
        "max_budget": null,
        "spend": 0.0,
        "models": [],
        "tpm_limit": null,
        "rpm_limit": null,
    }))
}

/// GET /litellm/.well-known/litellm-ui-config — 前端 UI 配置
pub async fn ui_config() -> impl IntoResponse {
    Json(json!({
        "server_root_path": "",
        "proxy_base_url": "",
        "auto_redirect_to_sso": false,
        "admin_ui_disabled": false,
        "sso_configured": false,
        "is_control_plane": false,
    }))
}

/// GET /get/ui_theme_settings — 主题设置
pub async fn ui_theme_settings() -> impl IntoResponse {
    Json(json!({
        "values": {
            "logo_url": null,
            "favicon_url": null,
        }
    }))
}

/// 通用 mock 端点（返回空数据，避免前端 404 阻塞）
pub async fn mock_empty() -> impl IntoResponse {
    Json(json!({}))
}
pub async fn mock_array() -> impl IntoResponse {
    Json(json!([]))
}

/// GET /global/spend — 总用量
pub async fn global_spend(State(state): State<Arc<ChatAppState>>) -> impl IntoResponse {
    let total = state.total_usage.lock().unwrap_or_else(|e| e.into_inner());
    let usage = state.usage.lock().unwrap_or_else(|e| e.into_inner());

    let model_spend: Vec<Value> = usage
        .iter()
        .map(|(model, u)| {
            json!({
                "model": model,
                "prompt_tokens": u.prompt_tokens,
                "completion_tokens": u.completion_tokens,
                "total_tokens": u.total_tokens,
                "requests": u.request_count,
            })
        })
        .collect();

    Json(json!({
        "total_spend": 0.0,
        "total_tokens": total.total_tokens,
        "prompt_tokens": total.prompt_tokens,
        "completion_tokens": total.completion_tokens,
        "total_requests": total.request_count,
        "model_spend": model_spend,
    }))
}

/// GET /model/info — 模型列表
pub async fn model_info(State(state): State<Arc<ChatAppState>>) -> impl IntoResponse {
    let models: Vec<Value> = state
        .model_providers
        .iter()
        .map(|(name, _cfg)| json!({ "model_name": name, "model_info": { "id": name } }))
        .collect();
    Json(json!({ "data": models }))
}

/// 创建管理路由（不包含 state，由上层统一注入）
pub fn router() -> axum::Router<Arc<ChatAppState>> {
    axum::Router::new()
        .route("/login", axum::routing::post(login))
        .route("/v2/login", axum::routing::post(login))
        .route("/get/ui_settings", axum::routing::get(ui_settings))
        .route("/get/ui_theme_settings", axum::routing::get(ui_theme_settings))
        .route("/get_image", axum::routing::get(mock_empty))
        .route("/default_config.content.json", axum::routing::get(mock_empty))
        .route("/user/info", axum::routing::get(user_info))
        .route("/public/litellm_blog_posts", axum::routing::get(mock_array))
        .route("/public/model_hub/info", axum::routing::get(mock_empty))
        .route("/get/favicon", axum::routing::get(mock_empty))
        .route("/global/spend", axum::routing::get(global_spend))
        .route("/model/info", axum::routing::get(model_info))
}
