/**
 * 房型 API 模組
 * 從 AI GO product_templates (type=service) 讀取房型資料
 * 
 * 系統表映射：
 * - name → 中文名稱
 * - description → 中文描述
 * - description_sale → 英文描述
 * - list_price → 價格
 * - default_code → room slug (如 'ocean-view-deluxe')
 * - image_url → 完整圖片 URL
 * - custom_data → { name_en, category, category_en, area, floor, bed, max_guests,
 *                   bathroom, bathroom_en, view, view_en, featured, badge, badge_en,
 *                   amenities, amenities_en, image_path }
 */
import { authedRequest } from './auth.js';
import { domainFilter } from './domain.js';

/**
 * 將 AI GO product_template 記錄轉換為前端房型格式
 * 確保與原 rooms.js 的資料結構一致
 */
function transformRoom(p) {
  const cd = (typeof p.custom_data === 'string') ? JSON.parse(p.custom_data) : (p.custom_data || {});
  return {
    id: p.default_code || p.id,
    aigoId: p.id,
    name: p.name,
    nameEn: cd.name_en || p.name,
    category: cd.category || '',
    categoryEn: cd.category_en || '',
    description: p.description || '',
    descriptionEn: p.description_sale || '',
    image: cd.image_path || p.image_url || '',
    price: Number(p.list_price) || 0,
    area: cd.area || 0,
    floor: cd.floor || '',
    bed: cd.bed || '',
    maxGuests: cd.max_guests || 2,
    bathroom: cd.bathroom || '',
    bathroomEn: cd.bathroom_en || '',
    view: cd.view || '',
    viewEn: cd.view_en || '',
    featured: cd.featured || false,
    badge: cd.badge || '',
    badgeEn: cd.badge_en || '',
    amenities: cd.amenities || [],
    amenitiesEn: cd.amenities_en || [],
  };
}

// ──── 快取 ────
let _roomsCache = null;
let _cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 分鐘

function isCacheValid() {
  return _roomsCache && (Date.now() - _cacheTime < CACHE_TTL);
}

/**
 * 取得所有房型（從 AI GO product_templates，篩選 type=service）
 * 使用 ext/proxy（Bearer Token）存取
 */
export async function fetchAllRooms() {
  // 快取命中
  if (isCacheValid()) return { ok: true, data: _roomsCache };

  await ensureValidToken();

  // 使用進階查詢：type=service + app_domain=booking（雙重隔離）
  const r = await authedRequest('POST', '/ext/proxy/product_templates/query', {
    filters: [
      { column: 'type', op: 'eq', value: 'service' },
      { column: 'active', op: 'eq', value: true },
      domainFilter(),
    ],
    order_by: [{ column: 'list_price', direction: 'asc' }],
    limit: 50,
  });

  if (r.ok && Array.isArray(r.data)) {
    _roomsCache = r.data.map(transformRoom);
    _cacheTime = Date.now();
    return { ok: true, data: _roomsCache };
  }
  return { ok: false, status: r.status, data: r.data };
}

/**
 * 以 default_code (slug) 取得單一房型
 */
export async function fetchRoomBySlug(slug) {
  // 先試快取
  if (isCacheValid()) {
    const found = _roomsCache.find(r => r.id === slug);
    if (found) return { ok: true, data: found };
  }

  await ensureValidToken();

  const r = await authedRequest('POST', '/ext/proxy/product_templates/query', {
    filters: [
      { column: 'default_code', op: 'eq', value: slug },
      { column: 'type', op: 'eq', value: 'service' },
      domainFilter(),
    ],
    limit: 1,
  });

  if (r.ok && Array.isArray(r.data) && r.data.length > 0) {
    return { ok: true, data: transformRoom(r.data[0]) };
  }
  return { ok: false, status: r.status, data: null };
}

/**
 * 以分類篩選房型
 */
export async function fetchRoomsByCategory(category) {
  const all = await fetchAllRooms();
  if (!all.ok) return all;

  if (!category || category === 'all') return all;
  const filtered = all.data.filter(r =>
    r.category === category || r.categoryEn === category
  );
  return { ok: true, data: filtered };
}

/**
 * 取得精選房型（featured=true）
 */
export async function fetchFeaturedRooms() {
  const all = await fetchAllRooms();
  if (!all.ok) return all;
  return { ok: true, data: all.data.filter(r => r.featured) };
}

/**
 * 清除快取（語言切換時呼叫）
 */
export function clearRoomsCache() {
  _roomsCache = null;
  _cacheTime = 0;
}
