/**
 * AI GO API 基礎設定
 * 所有環境變數從 Vite 的 import.meta.env 讀取，嚴禁硬編碼
 */

export const API_BASE = import.meta.env.VITE_AIGO_API_BASE;
export const APP_SLUG = import.meta.env.VITE_AIGO_APP_SLUG;

/**
 * 通用 fetch 包裝
 * @param {'GET'|'POST'|'PATCH'|'DELETE'} method
 * @param {string} path - 相對於 API_BASE 的路徑
 * @param {object|null} body
 * @param {object} extraHeaders
 * @returns {Promise<{ok: boolean, status: number, data: any}>}
 */
export async function apiRequest(method, path, body = null, extraHeaders = {}) {
  const url = `${API_BASE}${path}`;
  const headers = { 'Content-Type': 'application/json', ...extraHeaders };
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(url, opts);
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = text; }
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    console.error(`[API] ${method} ${path} 網路錯誤:`, err);
    return { ok: false, status: 0, data: { detail: '網路連線失敗' } };
  }
}

// authedRequest has been moved to auth.js to support Token Rotation and avoid circular dependency.
