/**
 * 示範訂房 — 首頁主程式
 * 動態渲染精選房型、設施、評價
 */
import { initI18n, t, getLang } from './i18n.js';
import { initApp, initScrollAnimations } from './navigation.js';
import { rooms as staticRooms } from './data/rooms.js';
import { isLoggedIn } from './api/auth.js';
import { fetchFeaturedRooms } from './api/rooms.js';

// ──── 初始化 ────
initI18n();
initApp();

// ──── 設定搜尋框日期預設值 ────
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const afterTmr = new Date(today);
afterTmr.setDate(afterTmr.getDate() + 2);

const checkinInput = document.getElementById('search-checkin');
const checkoutInput = document.getElementById('search-checkout');
if (checkinInput) {
  checkinInput.min = today.toISOString().split('T')[0];
  checkinInput.value = tomorrow.toISOString().split('T')[0];
}
if (checkoutInput) {
  checkoutInput.min = tomorrow.toISOString().split('T')[0];
  checkoutInput.value = afterTmr.toISOString().split('T')[0];
}

// 搜尋按鈕
document.getElementById('search-submit')?.addEventListener('click', () => {
  const checkin = checkinInput?.value;
  const checkout = checkoutInput?.value;
  const guests = document.getElementById('search-guests')?.value || 2;
  window.location.href = `rooms.html?checkin=${checkin}&checkout=${checkout}&guests=${guests}`;
});

// ──── 渲染精選房型 ────
function renderFeaturedRooms(roomsList) {
  const featuredGrid = document.getElementById('featured-rooms-grid');
  if (!featuredGrid) return;
  const featured = roomsList.filter(r => r.featured).slice(0, 4);
  featuredGrid.innerHTML = featured.map((room, idx) => `
    <div class="room-card" data-animate style="transition-delay: ${idx * 100}ms">
      <a href="room-detail.html?id=${room.id}" style="text-decoration:none;color:inherit">
        <div class="room-card-img-wrap">
          <img src="${room.image}" alt="${getLang() === 'en' ? room.nameEn : room.name}" width="600" height="400" loading="lazy">
          ${room.badge ? `<span class="room-card-badge badge badge-accent">${getLang() === 'en' ? room.badgeEn : room.badge}</span>` : ''}
        </div>
        <div class="room-card-body">
          <div class="room-card-category">${getLang() === 'en' ? room.categoryEn : room.category}</div>
          <h3 class="room-card-title">${getLang() === 'en' ? room.nameEn : room.name}</h3>
          <div class="room-card-specs">
            <span>${room.area} ${t('rooms.area')}</span>
            <span>•</span>
            <span>${room.maxGuests} ${t('rooms.guests')}</span>
            <span>•</span>
            <span>${room.bed}</span>
          </div>
          <div class="room-card-footer">
            <div class="room-card-price">
              <span class="currency">${t('common.currency')}</span>
              <span class="amount">${room.price.toLocaleString()}</span>
              <span class="unit">${t('rooms.pernight')}</span>
            </div>
            <span class="btn btn-sm btn-primary">${t('rooms.view')}</span>
          </div>
        </div>
      </a>
    </div>
  `).join('');
}

// 先渲染靜態資料（確保快速首屏），再嘗試 API 更新
renderFeaturedRooms(staticRooms);

(async () => {
  if (isLoggedIn()) {
    const r = await fetchFeaturedRooms();
    if (r.ok && r.data.length > 0) renderFeaturedRooms(r.data);
  }
})();

// ──── 渲染設施亮點 ────
const facilitiesData = [
  { icon: 'pool', key: 'facility.pool', descKey: 'facility.pool.short' },
  { icon: 'spa', key: 'facility.spa', descKey: 'facility.spa.short' },
  { icon: 'restaurant', key: 'facility.restaurant', descKey: 'facility.restaurant.short' },
  { icon: 'gym', key: 'facility.gym', descKey: 'facility.gym.short' },
  { icon: 'lounge', key: 'facility.lounge', descKey: 'facility.lounge.short' },
  { icon: 'parking', key: 'facility.parking', descKey: 'facility.parking.short' },
  { icon: 'wifi', key: 'facility.wifi', descKey: 'facility.wifi.short' },
  { icon: 'concierge', key: 'facility.concierge', descKey: 'facility.concierge.short' },
];

const facilityIcons = {
  pool: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 12h20M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0M6 4v8M18 4v8"/></svg>',
  spa: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22c-4-4-8-7.5-8-12a8 8 0 0 1 16 0c0 4.5-4 8-8 12z"/><circle cx="12" cy="10" r="3"/></svg>',
  restaurant: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>',
  gym: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 6.5h11M3 12h18M6.5 17.5h11M4.5 6.5v11M19.5 6.5v11"/></svg>',
  lounge: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 11H3M21 15H3M21 19H3M21 11a2 2 0 0 0-2-2h-2M5 11V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/></svg>',
  parking: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>',
  wifi: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>',
  concierge: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M6 3l.5 1M18 3l-.5 1"/></svg>',
};

const facilitiesGrid = document.getElementById('facilities-grid');
if (facilitiesGrid) {
  facilitiesGrid.innerHTML = facilitiesData.map((f, idx) => `
    <div class="facility-card" data-animate style="transition-delay: ${idx * 80}ms">
      <div class="facility-icon">${facilityIcons[f.icon] || ''}</div>
      <h4 data-i18n="${f.key}">${t(f.key)}</h4>
      <p>${t(f.descKey)}</p>
    </div>
  `).join('');
}

// ──── 渲染住客評價 ────
const reviewsData = [
  {
    name: '陳小姐', nameEn: 'Ms. Chen', initial: '陳',
    text: '入住海景套房的體驗超乎想像！從房間就能看到整片太平洋，早晨的日出美得讓人屏息。服務人員的細心程度也讓我們非常感動。',
    textEn: 'The ocean view suite exceeded all expectations! We could see the entire Pacific from our room, and the sunrise was breathtaking. The staff\'s attention to detail truly moved us.',
    date: '2026/03', stars: 5,
  },
  {
    name: '林先生', nameEn: 'Mr. Lin', initial: '林',
    text: '特別推薦檜木和室房型，濃濃的日式氛圍搭配台灣的山林景色，非常有特色。晚上泡著檜木浴缸看星空，是一輩子難忘的體驗。',
    textEn: 'Highly recommend the cypress tatami room. The Japanese atmosphere combined with Taiwan\'s mountain scenery is unique. Soaking in the cypress bathtub under the stars was unforgettable.',
    date: '2026/02', stars: 5,
  },
  {
    name: '王小姐', nameEn: 'Ms. Wang', initial: '王',
    text: '帶家人入住家庭房，空間寬敞且設施齊全，孩子們也玩得很開心。infinity pool 是最大亮點！位置離九份老街也不遠，很方便。',
    textEn: 'Stayed with family in the family suite - spacious and well-equipped, kids loved it. The infinity pool was the highlight! Also conveniently close to Jiufen Old Street.',
    date: '2026/01', stars: 5,
  },
];

const reviewsGrid = document.getElementById('reviews-grid');
if (reviewsGrid) {
  reviewsGrid.innerHTML = reviewsData.map((r, idx) => `
    <div class="review-card" data-animate style="transition-delay: ${idx * 100}ms">
      <div class="review-stars">
        ${'★'.repeat(r.stars)}
      </div>
      <p class="review-text">"${getLang() === 'en' ? r.textEn : r.text}"</p>
      <div class="review-author">
        <div class="review-avatar">${r.initial}</div>
        <div>
          <div class="review-name">${getLang() === 'en' ? r.nameEn : r.name}</div>
          <div class="review-date">${r.date}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ──── 重新初始化滾動動畫（因為卡片是 JS 動態注入的） ────
initScrollAnimations();

// ──── 語言切換時重新渲染 ────
window.addEventListener('langchange', () => {
  location.reload();
});
