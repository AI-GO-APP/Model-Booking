/**
 * 示範訂房 — 導航列 + 頁尾元件
 * 所有頁面共用，動態注入 HTML
 */
import { t, toggleLang, getLang } from './i18n.js';
import { isLoggedIn, getCachedUser } from './api/auth.js';

/** 產生 SVG 圖示 */
const icons = {
  menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  close: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  globe: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  mapPin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  facebook: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  instagram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
  line: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.271.173-.508.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>',
};

/**
 * 取得目前頁面路徑
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  return page;
}

/**
 * 產生導航列 HTML
 */
function createNavbar() {
  const currentPage = getCurrentPage();
  const navLinks = [
    { href: 'index.html', key: 'nav.home' },
    { href: 'rooms.html', key: 'nav.rooms' },
    { href: 'facilities.html', key: 'nav.facilities' },
    { href: 'gallery.html', key: 'nav.gallery' },
    { href: 'about.html', key: 'nav.about' },
    { href: 'faq.html', key: 'nav.faq' },
    { href: 'contact.html', key: 'nav.contact' },
  ];

  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'main-nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Main navigation');

  nav.innerHTML = `
    <div class="navbar-inner container-wide">
      <a href="index.html" class="navbar-brand" aria-label="${t('footer.brand')}">
        <span class="brand-icon">✦</span>
        <span class="brand-text" data-i18n="footer.brand">${t('footer.brand')}</span>
      </a>

      <ul class="navbar-links" id="nav-links">
        ${navLinks.map(link => `
          <li>
            <a href="${link.href}" class="nav-link ${currentPage === link.href ? 'active' : ''}" data-i18n="${link.key}">${t(link.key)}</a>
          </li>
        `).join('')}
      </ul>

      <div class="navbar-actions">
        <button class="btn-lang" id="lang-toggle" aria-label="Toggle language" title="切換語言">
          ${icons.globe}
          <span data-i18n="nav.lang">${t('nav.lang')}</span>
        </button>
        <a href="account.html" class="btn-account ${currentPage === 'account.html' ? 'active' : ''}" aria-label="${t('nav.account')}" title="${isLoggedIn() ? (getCachedUser()?.display_name || t('nav.account')) : t('nav.account')}">
          ${isLoggedIn() ? (() => { const u = getCachedUser(); const initial = (u?.display_name || u?.email || '')[0]?.toUpperCase() || ''; return `<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:var(--color-accent);color:white;font-size:12px;font-weight:600">${initial}</span>`; })() : icons.user}
        </a>
        <a href="booking.html" class="btn btn-accent btn-sm nav-cta" data-i18n="nav.booking">${t('nav.booking')}</a>
        <button class="btn-mobile-menu" id="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
          ${icons.menu}
        </button>
      </div>
    </div>

    <!-- 手機選單 -->
    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <ul class="mobile-menu-links">
        ${navLinks.map(link => `
          <li>
            <a href="${link.href}" class="mobile-link ${currentPage === link.href ? 'active' : ''}" data-i18n="${link.key}">${t(link.key)}</a>
          </li>
        `).join('')}
        <li>
          <a href="account.html" class="mobile-link ${currentPage === 'account.html' ? 'active' : ''}" data-i18n="nav.account">${t('nav.account')}</a>
        </li>
      </ul>
      <a href="booking.html" class="btn btn-accent btn-lg mobile-cta" data-i18n="nav.booking">${t('nav.booking')}</a>
    </div>
  `;

  return nav;
}

/**
 * 產生頁尾 HTML
 */
function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.id = 'site-footer';

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="footer-brand">
            <span class="brand-icon">✦</span>
            <span class="brand-text" data-i18n="footer.brand">${t('footer.brand')}</span>
          </div>
          <p class="footer-desc" data-i18n="footer.desc">${t('footer.desc')}</p>
          <div class="footer-contact-info">
            <div class="footer-info-item">
              ${icons.mapPin}
              <span data-i18n="contact.address.value">${t('contact.address.value')}</span>
            </div>
            <div class="footer-info-item">
              ${icons.phone}
              <span>02-2498-8888</span>
            </div>
            <div class="footer-info-item">
              ${icons.mail}
              <span>info@demobooking.tw</span>
            </div>
          </div>
        </div>

        <div class="footer-links-col">
          <h4 data-i18n="footer.quick">${t('footer.quick')}</h4>
          <ul>
            <li><a href="rooms.html" data-i18n="nav.rooms">${t('nav.rooms')}</a></li>
            <li><a href="facilities.html" data-i18n="nav.facilities">${t('nav.facilities')}</a></li>
            <li><a href="gallery.html" data-i18n="nav.gallery">${t('nav.gallery')}</a></li>
            <li><a href="about.html" data-i18n="nav.about">${t('nav.about')}</a></li>
          </ul>
        </div>

        <div class="footer-links-col">
          <h4 data-i18n="footer.support">${t('footer.support')}</h4>
          <ul>
            <li><a href="faq.html" data-i18n="nav.faq">${t('nav.faq')}</a></li>
            <li><a href="contact.html" data-i18n="nav.contact">${t('nav.contact')}</a></li>
            <li><a href="booking.html" data-i18n="nav.booking">${t('nav.booking')}</a></li>
            <li><a href="account.html" data-i18n="nav.account">${t('nav.account')}</a></li>
          </ul>
        </div>

        <div class="footer-social-col">
          <h4 data-i18n="footer.follow">${t('footer.follow')}</h4>
          <div class="footer-socials">
            <a href="#" class="social-link" aria-label="Facebook">${icons.facebook}</a>
            <a href="#" class="social-link" aria-label="Instagram">${icons.instagram}</a>
            <a href="#" class="social-link" aria-label="LINE">${icons.line}</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p data-i18n="footer.copyright">${t('footer.copyright')}</p>
        <div class="footer-legal">
          <a href="terms.html" data-i18n="footer.terms">${t('footer.terms')}</a>
          <a href="privacy.html" data-i18n="footer.privacy">${t('footer.privacy')}</a>
        </div>
      </div>
    </div>
  `;

  return footer;
}

/**
 * 初始化導航行為
 */
function initNavBehavior() {
  const nav = document.getElementById('main-nav');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const langToggle = document.getElementById('lang-toggle');

  // 滾動時導航列背景效果
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    // 向下滾動時縮小navbar
    if (scrollY > lastScroll && scrollY > 200) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    lastScroll = scrollY;
  });

  // 手機選單
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? icons.close : icons.menu;
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // 語言切換
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      toggleLang();
    });
  }
}

/**
 * 滾動動畫 Observer
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

/**
 * 初始化共用元件 — 所有頁面都要呼叫
 */
export function initApp() {
  // 注入導航列
  const navTarget = document.getElementById('navbar-mount');
  if (navTarget) {
    navTarget.replaceWith(createNavbar());
  }

  // 注入頁尾
  const footerTarget = document.getElementById('footer-mount');
  if (footerTarget) {
    footerTarget.replaceWith(createFooter());
  }

  // 偵測是否有 Hero 區塊（控制 navbar 文字顏色）
  if (document.querySelector('.hero, .page-hero')) {
    document.body.classList.add('has-hero');
  }

  // 初始化行為
  initNavBehavior();

  // DOM 載入完成後啟動滾動動畫
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
}

export { icons, initScrollAnimations };
