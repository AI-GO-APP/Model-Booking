/**
 * App Domain 隔離常數與工具
 * 
 * 根據 AI GO Custom App Dev 文件第 13 章：
 * 「共享資料表隔離策略 (Data Domain Separation)」
 * 
 * 所有共用系統表的寫入與查詢都必須使用 app_domain 標籤
 * 以避免同一租戶下多個 App（訂房、電商、旅行社）的資料互相污染
 */

/** 訂房平台 App Domain 識別碼 */
export const APP_DOMAIN = 'booking';

/**
 * 將 app_domain 注入 custom_data
 * 確保 app_domain 永遠在最上層，不會被覆蓋
 * @param {object} customData - 原始 custom_data 物件
 * @returns {object} 含 app_domain 的 custom_data
 */
export function withDomain(customData = {}) {
  return { app_domain: APP_DOMAIN, ...customData };
}

/**
 * 產生 app_domain 過濾條件
 * 用於所有共用系統表的查詢 filters
 * 
 * AI GO 目前以 ilike 操作符對 JSONB 欄位做文字匹配
 * @returns {{ column: string, op: string, value: string }}
 */
export function domainFilter() {
  return {
    column: 'custom_data',
    op: 'ilike',
    value: `%app_domain%${APP_DOMAIN}%`,
  };
}
