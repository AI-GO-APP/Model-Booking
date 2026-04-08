/**
 * AI GO 認證模組
 * 使用 Independent 模式的 Custom App User 認證
 * 
 * 端點對照：
 * - 註冊：POST /custom-app-auth/{slug}/register
 * - 登入：POST /custom-app-auth/{slug}/login
 * - 用戶：GET  /custom-app-auth/{slug}/me
 * - 刷新：POST /custom-app-auth/{slug}/refresh
 * - 登出：POST /custom-app-auth/{slug}/logout
 */
import { apiRequest, APP_SLUG } from './config.js';

const AUTH_PREFIX = `/custom-app-auth/${APP_SLUG}`;

// ──── localStorage key 常數 ────
const TOKEN_KEY = 'aigo_access_token';
const REFRESH_KEY = 'aigo_refresh_token';
const USER_KEY = 'aigo_user';
const EXPIRES_KEY = 'aigo_token_expires';

// ──── 內部工具 ────
function saveTokens(data) {
  localStorage.setItem(TOKEN_KEY, data.access_token);
  localStorage.setItem(REFRESH_KEY, data.refresh_token);
  // 記錄到期時間（毫秒）
  const expiresAt = Date.now() + (data.expires_in * 1000);
  localStorage.setItem(EXPIRES_KEY, String(expiresAt));
  if (data.user) {
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  }
}

function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}

// ──── 公開 API ────

/**
 * 註冊新用戶
 * @param {string} email
 * @param {string} password
 * @param {string} displayName
 */
export async function register(email, password, displayName) {
  const r = await apiRequest('POST', `${AUTH_PREFIX}/register`, {
    email,
    password,
    display_name: displayName,
  });
  if (r.ok) saveTokens(r.data);
  return r;
}

/**
 * 用戶登入
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
  const r = await apiRequest('POST', `${AUTH_PREFIX}/login`, { email, password });
  if (r.ok) saveTokens(r.data);
  return r;
}

/**
 * 取得當前用戶資訊
 */
export async function getMe() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return { ok: false, status: 401, data: null };
  const r = await apiRequest('GET', `${AUTH_PREFIX}/me`, null, {
    'Authorization': `Bearer ${token}`,
  });
  if (r.ok) localStorage.setItem(USER_KEY, JSON.stringify(r.data));
  return r;
}

/**
 * 刷新 Token（Token Rotation：舊 refresh_token 立即失效）
 */
export async function refreshToken() {
  const refreshTk = localStorage.getItem(REFRESH_KEY);
  if (!refreshTk) return { ok: false, status: 401, data: null };
  const r = await apiRequest('POST', `${AUTH_PREFIX}/refresh`, {
    refresh_token: refreshTk,
  });
  if (r.ok) {
    saveTokens(r.data);
  } else {
    // Refresh 失敗 → 強制清除（重新登入）
    clearTokens();
  }
  return r;
}

/**
 * 登出
 */
export async function logout() {
  const token = localStorage.getItem(TOKEN_KEY);
  const refreshTk = localStorage.getItem(REFRESH_KEY);
  if (token && refreshTk) {
    await apiRequest('POST', `${AUTH_PREFIX}/logout`, {
      refresh_token: refreshTk,
    }, {
      'Authorization': `Bearer ${token}`,
    });
  }
  clearTokens();
}

/**
 * 檢查是否已登入
 */
export function isLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY);
}

/**
 * 取得快取的用戶資訊（不發 API）
 */
export function getCachedUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Token 是否即將過期（距離到期 < 60 秒）
 */
export function isTokenExpiringSoon() {
  const exp = localStorage.getItem(EXPIRES_KEY);
  if (!exp) return true;
  return Date.now() > (Number(exp) - 60000);
}

/**
 * 自動刷新守衛：在每次 API 呼叫前檢查並刷新
 */
export async function ensureValidToken() {
  if (!isLoggedIn()) return false;
  if (isTokenExpiringSoon()) {
    const r = await refreshToken();
    return r.ok;
  }
  return true;
}

/**
 * 處理 OAuth 回調（LINE Login 等日後擴充）
 * 解碼 URL query 中的 oauth_token 或 oauth_pending
 */
export function handleOAuthCallback() {
  const params = new URLSearchParams(window.location.search);
  const encoded = params.get('oauth_token');
  if (encoded) {
    try {
      const decoded = JSON.parse(atob(encoded));
      saveTokens(decoded);
      // 清除 URL 參數
      window.history.replaceState({}, '', window.location.pathname);
      return { ok: true, user: decoded.user };
    } catch { /* 忽略解碼錯誤 */ }
  }
  const error = params.get('oauth_error');
  if (error) return { ok: false, error };
  return null;
}
