/**
 * 預訂 API 模組
 * 全部使用 AI GO 標準系統表，不需要 Custom Table
 * 
 * 資料映射：
 * ┌─────────────────────────────────────────────────────────┐
 * │ sale_orders（訂單主檔）                                  │
 * │  state: draft → sale → done                            │
 * │  customer_id: FK → customers.id                         │
 * │  amount_total: 訂單總額                                  │
 * │  date_order: 訂購日期                                    │
 * │  tax_type: tax_included / tax_exempt                    │
 * │  invoice_format: duplicate / triplicate / none          │
 * │  carrier_type: barcode / citizen_digital / mobile / none│
 * │  carrier_id: 載具編號                                    │
 * │  client_order_ref: 外部訂單編號                          │
 * │  note: 特殊需求                                          │
 * │  custom_data: {                                          │
 * │    checkin, checkout, guest_count,                       │
 * │    guest_name, guest_phone, guest_email,                │
 * │    special_request, payment_method,                     │
 * │    booking_status: pending/confirmed/completed/cancelled│
 * │    review_rating, review_comment, review_at             │
 * │  }                                                       │
 * ├─────────────────────────────────────────────────────────┤
 * │ sale_order_lines（訂單明細）                              │
 * │  product_id: FK → product_templates.id（房型）           │
 * │  name: 房型名稱                                          │
 * │  product_uom_qty: 入住晚數                               │
 * │  price_unit: 每晚價格                                    │
 * │  price_subtotal: 小計                                    │
 * │  custom_data: { checkin, checkout }                      │
 * └─────────────────────────────────────────────────────────┘
 * 
 * 客戶映射：
 * ┌─────────────────────────────────────────────────────────┐
 * │ customers（客戶資料）                                    │
 * │  name: 旅客姓名                                          │
 * │  email: 信箱                                             │
 * │  phone: 電話                                             │
 * │  customer_type: 'individual'                             │
 * │  status: 'active'                                        │
 * │  custom_data: { user_id, preferences }                  │
 * └─────────────────────────────────────────────────────────┘
 */
import { apiRequest } from './config.js';
import { authedRequest } from './auth.js';
import { withDomain, domainFilter } from './domain.js';

/**
 * 建立或取得客戶記錄（依 email 查找）
 */
async function ensureCustomer({ name, email, phone, userId }) {
  // 先查詢是否已存在
  const search = await authedRequest('POST', '/ext/proxy/customers/query', {
    filters: [{ column: 'email', op: 'eq', value: email }],
    limit: 1,
  });

  if (search.ok && Array.isArray(search.data) && search.data.length > 0) {
    return search.data[0].id;
  }

  // 建立新客戶
  const create = await authedRequest('POST', '/ext/proxy/customers', {
    name,
    email,
    phone,
    customer_type: 'individual',
    status: 'active',
    custom_data: withDomain({ user_id: userId }),
  });

  if (create.ok && create.data?.id) return create.data.id;
  return null;
}

/**
 * 計算入住晚數
 */
function calcNights(checkin, checkout) {
  const d1 = new Date(checkin);
  const d2 = new Date(checkout);
  return Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
}

/**
 * 建立預訂訂單
 * @param {object} params
 * @param {string} params.roomId - product_templates UUID
 * @param {string} params.roomName - 房型名稱
 * @param {number} params.pricePerNight - 每晚價格
 * @param {string} params.checkin - 入住日期 YYYY-MM-DD
 * @param {string} params.checkout - 退房日期 YYYY-MM-DD
 * @param {number} params.guestCount - 人數
 * @param {object} params.guest - { name, phone, email }
 * @param {string} params.specialRequest - 特殊需求
 * @param {string} params.paymentMethod - 付款方式
 * @param {object} params.invoice - { format, taxType, carrierType, carrierId }
 */
export async function createBooking(params) {
  await ensureValidToken();

  const nights = calcNights(params.checkin, params.checkout);
  const subtotal = params.pricePerNight * nights;

  // 1. 確保客戶存在
  const customerId = await ensureCustomer({
    name: params.guest.name,
    email: params.guest.email,
    phone: params.guest.phone,
    userId: params.userId,
  });

  // 2. 建立銷售訂單
  const orderPayload = {
    state: 'draft',
    date_order: new Date().toISOString().split('T')[0],
    customer_id: customerId,
    amount_untaxed: subtotal,
    amount_total: subtotal,
    amount_tax: 0,
    note: params.specialRequest || '',
    // 將電子發票等非標準專用欄位全部移入 custom_data 防止 AI GO 拒絕請求
    custom_data: withDomain({
      checkin: params.checkin,
      checkout: params.checkout,
      nights: nights,
      guest_count: params.guestCount,
      guest_name: params.guest.name,
      guest_phone: params.guest.phone,
      guest_email: params.guest.email,
      special_request: params.specialRequest || '',
      payment_method: params.paymentMethod || 'credit_card',
      booking_status: 'confirmed',
      room_slug: params.roomSlug,
      room_name: params.roomName,
      invoice: {
        tax_type: params.invoice?.taxType || 'tax_included',
        invoice_format: params.invoice?.format || 'none',
        carrier_type: params.invoice?.carrierType || 'none',
        carrier_id: params.invoice?.carrierId || ''
      }
    }),
  };

  const orderR = await authedRequest('POST', '/ext/proxy/sale_orders', orderPayload);
  if (!orderR.ok) return orderR;

  const orderId = orderR.data?.id;

  // 3. 建立訂單明細（房型 × 晚數）
  const linePayload = {
    order_id: orderId,
    name: params.roomName,
    product_uom_qty: nights,
    price_unit: params.pricePerNight,
    price_total: subtotal,
    custom_data: withDomain({
      product_template_id: params.roomId,
      checkin: params.checkin,
      checkout: params.checkout,
    }),
  };

  const lineR = await authedRequest('POST', '/ext/proxy/sale_order_lines', linePayload);

  return {
    ok: true,
    data: {
      orderId,
      orderName: orderR.data?.name || orderR.data?.data?.name,
      nights,
      subtotal,
      customerId,
    },
  };
}

/**
 * 取得用戶的所有訂單
 */
export async function fetchMyOrders() {
  await ensureValidToken();

  const r = await authedRequest('POST', '/ext/proxy/sale_orders/query', {
    filters: [
      domainFilter(),
    ],
    order_by: [{ column: 'created_at', direction: 'desc' }],
    limit: 50,
  });

  if (r.ok && Array.isArray(r.data)) {
    return {
      ok: true,
      data: r.data
        .filter(o => {
          const cd = typeof o.custom_data === 'string' ? JSON.parse(o.custom_data) : o.custom_data;
          return cd?.booking_status; // 只返回含預訂資料的訂單
        })
        .map(transformOrder),
    };
  }
  return r;
}

/**
 * 取得單一訂單
 */
export async function fetchOrder(orderId) {
  await ensureValidToken();

  const r = await authedRequest('GET', `/ext/proxy/sale_orders/${orderId}`);
  if (r.ok) return { ok: true, data: transformOrder(r.data) };
  return r;
}

/**
 * 轉換訂單為前端格式
 */
function transformOrder(o) {
  const cd = typeof o.custom_data === 'string' ? JSON.parse(o.custom_data) : (o.custom_data || {});
  return {
    id: o.id,
    name: o.name,
    state: o.state,
    dateOrder: o.date_order,
    amountTotal: Number(o.amount_total) || 0,
    // 預訂資訊
    checkin: cd.checkin,
    checkout: cd.checkout,
    nights: cd.nights,
    guestCount: cd.guest_count,
    guestName: cd.guest_name,
    roomName: cd.room_name,
    roomSlug: cd.room_slug,
    bookingStatus: cd.booking_status,
    paymentMethod: cd.payment_method,
    specialRequest: cd.special_request,
    // 發票
    invoiceFormat: o.invoice_format,
    carrierType: o.carrier_type,
    carrierId: o.carrier_id,
    taxType: o.tax_type,
    // 評價
    reviewRating: cd.review_rating || null,
    reviewComment: cd.review_comment || null,
  };
}

/**
 * 提交住客評價（寫入 sale_orders.custom_data）
 */
export async function submitReview(orderId, rating, comment) {
  await ensureValidToken();

  // 先讀取現有 custom_data
  const existing = await authedRequest('GET', `/ext/proxy/sale_orders/${orderId}`);
  if (!existing.ok) return existing;

  const cd = typeof existing.data.custom_data === 'string'
    ? JSON.parse(existing.data.custom_data)
    : (existing.data.custom_data || {});

  cd.review_rating = rating;
  cd.review_comment = comment;
  cd.review_at = new Date().toISOString();

  return authedRequest('PATCH', `/ext/proxy/sale_orders/${orderId}`, {
    custom_data: cd,
  });
}
