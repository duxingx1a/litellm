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

/// POST /login — 使用 Bearer token 登录
/// 前端发送 { username: "", password: "master_key" } 或直接 Bearer token
pub async fn login(
    State(state): State<Arc<ChatAppState>>,
    headers: HeaderMap,
    body: Option<Json<Value>>,
) -> impl IntoResponse {
    // 方式1：Bearer token
    if let Some(auth) = headers.get("authorization") {
        if let Ok(auth_str) = auth.to_str() {
            let token = auth_str.strip_prefix("Bearer ").unwrap_or("");
            if state.validate_token(token) {
                return (StatusCode::OK, Json(json!({
                    "token": token,
                    "user_id": "default_user",
                    "user_role": "admin",
                    "user_email": "admin@local"
                }))).into_response();
            }
        }
    }

    // 方式2：表单登录 { username, password }
    if let Some(Json(body)) = body {
        if let Some(password) = body.get("password").and_then(|v| v.as_str()) {
            if state.validate_token(password) {
                return (StatusCode::OK, Json(json!({
                    "token": password,
                    "user_id": "default_user",
                    "user_role": "admin",
                    "user_email": "admin@local"
                }))).into_response();
            }
        }
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
        "logo_url": null,
        "theme_mode": "light",
    }))
}

/// 创建管理路由（不包含 state，由上层统一注入）
pub fn router() -> axum::Router<Arc<ChatAppState>> {
    axum::Router::new()
        .route("/login", axum::routing::post(login))
        .route("/get/ui_settings", axum::routing::get(ui_settings))
        .route("/get/ui_theme_settings", axum::routing::get(ui_theme_settings))
        .route("/user/info", axum::routing::get(user_info))
}
