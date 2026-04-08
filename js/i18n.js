/**
 * 示範訂房 — 雙語系統 (i18n)
 * 支援繁體中文（預設）/ English 切換
 */

const translations = {
  'zh-TW': {
    // 導航
    'nav.home': '首頁',
    'nav.rooms': '房型介紹',
    'nav.facilities': '設施服務',
    'nav.gallery': '精選相簿',
    'nav.about': '關於我們',
    'nav.faq': '常見問題',
    'nav.contact': '聯絡我們',
    'nav.booking': '立即預訂',
    'nav.account': '會員中心',
    'nav.lang': 'EN',

    // 首頁
    'hero.tagline': '靜謐山海間的奢華旅居',
    'hero.subtitle': '座落於台灣最美的海岸線，體驗無與倫比的頂級住宿',
    'hero.cta': '探索房型',
    'hero.checkin': '入住日期',
    'hero.checkout': '退房日期',
    'hero.guests': '旅客人數',
    'hero.search': '搜尋空房',
    'hero.adults': '位大人',
    'hero.children': '位兒童',

    'section.featured': '精選房型',
    'section.featured.subtitle': '每一間房都是一場與自然的對話',
    'section.story': '品牌故事',
    'section.story.text': '示範訂房座落於台灣北海岸與九份山城之間，將在地文化與現代奢華完美融合。我們相信，真正的旅行不只是到達目的地，更是一場身心靈的深度體驗。',
    'section.story.text2': '從晨曦中甦醒的山嵐，到夕陽餘暉灑落的海面，每一刻都是大自然為您準備的禮物。我們的團隊以最誠摯的款待，讓您的每一次入住都成為珍貴的回憶。',
    'section.facilities': '設施亮點',
    'section.facilities.subtitle': '為您精心打造的完美體驗',
    'section.reviews': '住客評價',
    'section.reviews.subtitle': '來自真實旅客的感受',
    'section.cta': '準備好您的旅程了嗎？',
    'section.cta.text': '讓我們為您安排一場難忘的住宿體驗',
    'section.cta.btn': '立即預訂',

    // 房型
    'rooms.title': '房型介紹',
    'rooms.subtitle': '探索十二種精心設計的住宿空間',
    'rooms.filter.all': '全部房型',
    'rooms.filter.standard': '標準客房',
    'rooms.filter.deluxe': '豪華客房',
    'rooms.filter.suite': '套房',
    'rooms.filter.villa': '獨棟別墅',
    'rooms.from': '每晚',
    'rooms.pernight': '/ 晚',
    'rooms.area': '坪',
    'rooms.guests': '人',
    'rooms.view': '查看詳情',
    'rooms.book': '立即預訂',

    // 房型詳情
    'room.specs': '房型規格',
    'room.area': '面積',
    'room.floor': '樓層',
    'room.bed': '床型',
    'room.maxguests': '最多入住',
    'room.bathroom': '衛浴',
    'room.view': '景觀',
    'room.amenities': '房內設施',
    'room.notice': '入住須知',
    'room.related': '您可能也喜歡',
    'room.select.date': '選擇入住日期',

    // 預訂
    'booking.title': '預訂流程',
    'booking.step1': '選擇日期',
    'booking.step2': '旅客資訊',
    'booking.step3': '確認訂單',
    'booking.dates': '住宿日期',
    'booking.nights': '晚',
    'booking.guest.info': '旅客資訊',
    'booking.guest.name': '姓名',
    'booking.guest.phone': '聯絡電話',
    'booking.guest.email': '電子信箱',
    'booking.guest.request': '特殊需求',
    'booking.summary': '訂單摘要',
    'booking.next': '下一步',
    'booking.prev': '上一步',
    'booking.confirm': '前往結帳',
    'booking.total': '合計',

    // 結帳
    'checkout.title': '結帳',
    'checkout.payment': '付款方式',
    'checkout.payment.credit': '信用卡',
    'checkout.payment.linepay': 'LINE Pay',
    'checkout.payment.jkopay': '街口支付',
    'checkout.payment.atm': '銀行轉帳 / ATM',
    'checkout.card.number': '卡號',
    'checkout.card.expiry': '有效期限',
    'checkout.card.cvv': '安全碼',
    'checkout.card.name': '持卡人姓名',
    'checkout.invoice': '發票資訊',
    'checkout.invoice.carrier': '電子發票（手機條碼載具）',
    'checkout.invoice.company': '公司三聯式發票',
    'checkout.invoice.donate': '捐贈發票',
    'checkout.invoice.carrier.code': '手機條碼',
    'checkout.invoice.company.id': '統一編號',
    'checkout.invoice.company.name': '公司抬頭',
    'checkout.coupon': '折扣碼',
    'checkout.coupon.apply': '套用',
    'checkout.agree': '我同意',
    'checkout.terms': '取消政策',
    'checkout.privacy': '隱私權政策',
    'checkout.submit': '確認預訂並付款',
    'checkout.secure': '您的付款資訊已加密保護',
    'checkout.linepay.desc': '點擊「確認預訂並付款」後，將跳轉至 LINE Pay 進行付款。',
    'checkout.jkopay.desc': '點擊「確認預訂並付款」後，將跳轉至街口支付 App 進行付款。',
    'checkout.atm.desc': '確認預訂後，系統將提供虛擬帳號，請於 24 小時內完成轉帳。',
    'checkout.agree.alert': '請勾選同意條款',

    // 確認
    'confirm.title': '預訂成功！',
    'confirm.subtitle': '感謝您的預訂，我們期待您的到來',
    'confirm.order.id': '訂單編號',
    'confirm.details': '住宿資訊',
    'confirm.guide': '入住指南',
    'confirm.checkin.time': '入住時間：下午 3:00 後',
    'confirm.checkout.time': '退房時間：上午 11:00 前',
    'confirm.print': '列印',
    'confirm.back': '回到首頁',

    // 關於
    'about.title': '關於示範訂房',
    'about.subtitle': '在山海之間，找到屬於您的寧靜時光',
    'about.story.title': '我們的故事',
    'about.story.p1': '示範訂房的故事始於一個簡單的信念：每一位旅客都值得擁有一段超越期待的住宿體驗。',
    'about.story.p2': '2020年，我們的創辦團隊在台灣北海岸與九份山城之間，發現了這塊被時光遺忘的寶地。這裡有著台灣最戲劇性的海岸線，山巒層疊如水墨畫般延伸至天際，而海浪日夜不歇地在崖壁上譜寫著自然的詩篇。',
    'about.story.p3': '我們決定在這裡打造一處能讓人真正放下一切的空間——不只是一間旅宿，更是一場身心靈的歸零之旅。每一間客房都經過精心設計，將在地文化元素與現代奢華完美融合，讓旅客在舒適中感受台灣的山海之美。',
    'about.value.title': '我們的理念',
    'about.value1.title': '在地文化',
    'about.value1.desc': '每一處設計細節都融入台灣的在地元素，讓旅客在舒適中感受文化的溫度。',
    'about.value2.title': '永續共好',
    'about.value2.desc': '我們致力於環境永續經營，使用在地食材、減少碳足跡，與自然和諧共存。',
    'about.value3.title': '以客為尊',
    'about.value3.desc': '專屬管家服務，傾聽每一位旅客的需求，打造量身訂做的住宿體驗。',

    // 設施
    'facilities.title': '設施與服務',
    'facilities.subtitle': '我們用心打造每一處空間',
    'facility.pool': '無邊際泳池',
    'facility.spa': 'SPA 水療中心',
    'facility.restaurant': '頂樓景觀餐廳',
    'facility.gym': '健身中心',
    'facility.lounge': '大廳酒吧',
    'facility.parking': '免費停車場',
    'facility.wifi': '高速無線網路',
    'facility.concierge': '專屬管家服務',

    // 相簿
    'gallery.title': '精選相簿',
    'gallery.subtitle': '每一個角度都是一幅畫',
    'gallery.filter.all': '全部',
    'gallery.filter.rooms': '客房',
    'gallery.filter.public': '公共區域',
    'gallery.filter.dining': '餐飲',
    'gallery.filter.scenery': '周邊景觀',

    // FAQ
    'faq.title': '常見問題',
    'faq.subtitle': '您想知道的，我們都準備好了',
    'faq.cat.booking': '預訂相關',
    'faq.cat.checkin': '入住退房',
    'faq.cat.payment': '付款方式',
    'faq.cat.cancel': '取消退款',
    'faq.cat.facilities': '設施服務',
    'faq.q1': '最早可以提前多久預訂？',
    'faq.a1': '您最早可以提前 180 天（約 6 個月）進行預訂。建議旅遊旺季（暑假、連假、跨年）提前 2-3 個月預訂，以確保您心儀的房型仍有空房。',
    'faq.q2': '可以不透過網路直接電話預訂嗎？',
    'faq.a2': '當然可以！您可撥打 02-2498-8888 直接聯繫我們的訂房服務團隊，服務時間為每日 08:00 - 22:00。',
    'faq.q3': '入住與退房時間是幾點？',
    'faq.a3': '入住時間為下午 3:00 後，退房時間為上午 11:00 前。如需提早入住或延遲退房，請提前與我們聯繫安排，視當日房況提供，可能酌收費用。',
    'faq.q4': '是否提供免費停車場？',
    'faq.a4': '是的，我們提供免費地下停車場，共 40 個車位，先到先停。如車位已滿，我們將協助引導至鄰近停車場（步行約 3 分鐘）。',
    'faq.q5': '接受哪些付款方式？',
    'faq.a5': '我們接受：信用卡（Visa / Mastercard / JCB）、LINE Pay、街口支付、銀行轉帳 / ATM。所有線上付款均透過 SSL 加密保護您的資料安全。',
    'faq.q6': '早餐是否包含在房價中？',
    'faq.a6': '套房及以上房型包含雙人早餐；標準房型與豪華房型可加購早餐，每位 NT$ 680。兒童（6-12歲）半價，6歲以下免費。',
    'faq.q7': '如何取消或變更預訂？',
    'faq.a7': '您可透過會員中心或來電取消。取消政策：入住日 7 天前免費取消；3-7 天前收取第一晚房費 50%；3 天內取消收取第一晚全額房費。特殊節日預訂可能適用不同政策。',
    'faq.q8': '可以攜帶寵物入住嗎？',
    'faq.a8': '目前僅限小型犬（10公斤以下）入住指定寵物友善房型，需提前預約並支付清潔費 NT$ 1,500。我們會為毛小孩準備專屬的迎賓禮包。',
    'faq.q9': '泳池與 SPA 的開放時間？',
    'faq.a9': '無邊際泳池開放時間為每日 06:00 - 22:00；SPA 水療中心為 10:00 - 22:00（需預約）。住客可享用 SPA 療程 9 折優惠。',

    // 聯絡
    'contact.title': '聯絡我們',
    'contact.subtitle': '有任何問題？歡迎隨時與我們聯繫',
    'contact.form.title': '寫信給我們',
    'contact.form.name': '您的姓名',
    'contact.form.email': '電子信箱',
    'contact.form.subject': '主旨',
    'contact.form.message': '您的訊息',
    'contact.form.submit': '送出訊息',
    'contact.address': '地址',
    'contact.phone': '電話',
    'contact.email': '信箱',
    'contact.transport': '交通方式',
    'contact.transport.detail': '🚗 自駕：國道3號 → 萬里交流道 → 台2線往金山方向約 15 分鐘\n🚌 客運：台北車站搭乘國光客運1815至金山站，轉乘免費接駁車\n🚃 火車：搭至基隆站，轉乘基隆客運至金山（約 40 分鐘）',
    'contact.form.success': '感謝您的來信！我們將盡快回覆您。',

    // 設施詳細
    'facility.pool.desc': '懸崖邊際的無邊際泳池，與太平洋海天一線。恆溫水質，全年開放，日落時分更是最佳觀賞點。',
    'facility.pool.time': '開放時間: 06:00 - 22:00',
    'facility.spa.desc': '結合台灣在地溫泉精華的頂級水療體驗，提供芳療、熱石按摩、臉部護理等專業服務。',
    'facility.spa.time': '開放時間: 10:00 - 22:00（需預約）',
    'facility.restaurant.desc': '由星級主廚掌廚，嚴選台灣在地食材，結合法式料理技法，為您呈現山海間的美食盛宴。',
    'facility.restaurant.time': '早餐 07:00-10:00 / 午餐 11:30-14:00 / 晚餐 17:30-21:00',
    'facility.gym.desc': '24小時開放的現代化健身空間，配備 Technogym 頂級器材、瑜伽室與個人教練服務。',
    'facility.gym.time': '24小時開放',

    // 會員
    'account.title': '會員中心',
    'account.orders': '我的訂單',
    'account.profile': '個人資料',
    'account.preferences': '偏好設定',
    'account.logout': '登出',
    'account.login': '登入',
    'account.register': '註冊',

    // 頁尾
    'footer.brand': '示範訂房',
    'footer.desc': '座落於台灣最美的海岸線，體驗無與倫比的頂級住宿',
    'footer.quick': '快速連結',
    'footer.support': '旅客服務',
    'footer.follow': '關注我們',
    'footer.copyright': '© 2026 示範訂房. All rights reserved.',
    'footer.terms': '服務條款',
    'footer.privacy': '隱私權政策',

    // 通用
    'common.loading': '載入中...',
    'common.more': '了解更多',
    'common.back': '返回',
    'common.close': '關閉',
    'common.save': '儲存',
    'common.cancel': '取消',
    'common.confirm': '確認',
    'common.required': '必填',
    'common.nights': '晚',
    'common.guests': '位旅客',
    'common.currency': 'NT$',

    // 404頁
    'error.title': '找不到頁面',
    'error.desc': '抱歉，您要尋找的頁面不存在或已被移除。',

    // 地址
    'contact.address.value': '208 新北市金山區中山路 168 號',

    // 訂單狀態
    'order.status.confirmed': '已確認',
    'order.status.completed': '已完成',
    'order.status.cancelled': '已取消',

    // 表單驗證
    'validation.required': '請填寫必填欄位',
    'validation.email': '請輸入有效的電子信箱',
    'validation.phone': '請輸入有效的聯絡電話',
    'validation.date': '退房日期必須晚於入住日期',

    // 登入
    'login.title': '登入會員',
    'login.email': '電子信箱',
    'login.password': '密碼',
    'login.submit': '登入',
    'login.register.prompt': '還沒有帳號？',
    'login.register.link': '立即註冊',
    'register.title': '註冊帳號',
    'register.name': '姓名',
    'register.email': '電子信箱',
    'register.password': '密碼',
    'register.submit': '註冊',
    'register.login.prompt': '已有帳號？',
    'register.login.link': '立即登入',

    // 設施首頁描述
    'facility.pool.short': '懸崖邊際的無邊際泳池，俯瞰太平洋',
    'facility.spa.short': '結合台灣在地溫泉的頂級水療體驗',
    'facility.restaurant.short': '嚴選在地食材的頂樓景觀餐廳',
    'facility.gym.short': '24小時開放的現代化健身空間',
    'facility.lounge.short': '精緻的大廳酒吧，尊享下午茶時光',
    'facility.parking.short': '寬敢的免費地下停車場',
    'facility.wifi.short': '全館覆蓋高速無線網路',
    'facility.concierge.short': '一對一專屬管家，滿足您的一切需求',
  },

  'en': {
    // 導航
    'nav.home': 'Home',
    'nav.rooms': 'Rooms',
    'nav.facilities': 'Facilities',
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.booking': 'Book Now',
    'nav.account': 'Account',
    'nav.lang': '中文',

    // 首頁
    'hero.tagline': 'Luxury Living Between Mountains & Sea',
    'hero.subtitle': 'Nestled along Taiwan\'s most beautiful coastline, experience unparalleled premium accommodation',
    'hero.cta': 'Explore Rooms',
    'hero.checkin': 'Check-in',
    'hero.checkout': 'Check-out',
    'hero.guests': 'Guests',
    'hero.search': 'Search Availability',
    'hero.adults': 'Adults',
    'hero.children': 'Children',

    'section.featured': 'Featured Rooms',
    'section.featured.subtitle': 'Each room is a conversation with nature',
    'section.story': 'Our Story',
    'section.story.text': 'Demo Booking is nestled between the northern coast of Taiwan and the mountain town of Jiufen, perfectly blending local culture with modern luxury. We believe that true travel is not just about reaching a destination, but a profound experience for body, mind, and soul.',
    'section.story.text2': 'From the morning mist awakening over the mountains to the sunset glow dancing on the sea, every moment is a gift from nature. Our team welcomes you with the most heartfelt hospitality, making every stay a cherished memory.',
    'section.facilities': 'Facilities',
    'section.facilities.subtitle': 'Thoughtfully crafted for your perfect experience',
    'section.reviews': 'Guest Reviews',
    'section.reviews.subtitle': 'Experiences from real travelers',
    'section.cta': 'Ready for Your Journey?',
    'section.cta.text': 'Let us arrange an unforgettable stay for you',
    'section.cta.btn': 'Book Now',

    // 房型
    'rooms.title': 'Our Rooms',
    'rooms.subtitle': 'Explore twelve thoughtfully designed spaces',
    'rooms.filter.all': 'All Rooms',
    'rooms.filter.standard': 'Standard',
    'rooms.filter.deluxe': 'Deluxe',
    'rooms.filter.suite': 'Suites',
    'rooms.filter.villa': 'Villas',
    'rooms.from': 'From',
    'rooms.pernight': '/ night',
    'rooms.area': 'ping',
    'rooms.guests': 'guests',
    'rooms.view': 'View Details',
    'rooms.book': 'Book Now',

    // 房型詳情
    'room.specs': 'Room Specifications',
    'room.area': 'Area',
    'room.floor': 'Floor',
    'room.bed': 'Bed Type',
    'room.maxguests': 'Max Guests',
    'room.bathroom': 'Bathroom',
    'room.view': 'View',
    'room.amenities': 'Room Amenities',
    'room.notice': 'Notice',
    'room.related': 'You May Also Like',
    'room.select.date': 'Select Dates',

    // 預訂
    'booking.title': 'Booking',
    'booking.step1': 'Select Dates',
    'booking.step2': 'Guest Info',
    'booking.step3': 'Confirm',
    'booking.dates': 'Stay Dates',
    'booking.nights': 'nights',
    'booking.guest.info': 'Guest Information',
    'booking.guest.name': 'Full Name',
    'booking.guest.phone': 'Phone',
    'booking.guest.email': 'Email',
    'booking.guest.request': 'Special Requests',
    'booking.summary': 'Order Summary',
    'booking.next': 'Next',
    'booking.prev': 'Back',
    'booking.confirm': 'Proceed to Checkout',
    'booking.total': 'Total',

    // 結帳
    'checkout.title': 'Checkout',
    'checkout.payment': 'Payment Method',
    'checkout.payment.credit': 'Credit Card',
    'checkout.payment.linepay': 'LINE Pay',
    'checkout.payment.jkopay': 'JKO Pay',
    'checkout.payment.atm': 'Bank Transfer / ATM',
    'checkout.card.number': 'Card Number',
    'checkout.card.expiry': 'Expiry Date',
    'checkout.card.cvv': 'CVV',
    'checkout.card.name': 'Cardholder Name',
    'checkout.invoice': 'Invoice',
    'checkout.invoice.carrier': 'E-Invoice (Mobile Barcode)',
    'checkout.invoice.company': 'Company Invoice',
    'checkout.invoice.donate': 'Donate Invoice',
    'checkout.invoice.carrier.code': 'Barcode',
    'checkout.invoice.company.id': 'Tax ID',
    'checkout.invoice.company.name': 'Company Name',
    'checkout.coupon': 'Coupon Code',
    'checkout.coupon.apply': 'Apply',
    'checkout.agree': 'I agree to the',
    'checkout.terms': 'Cancellation Policy',
    'checkout.privacy': 'Privacy Policy',
    'checkout.submit': 'Confirm & Pay',
    'checkout.secure': 'Your payment information is encrypted and secure',
    'checkout.linepay.desc': 'After clicking "Confirm & Pay", you will be redirected to LINE Pay to complete payment.',
    'checkout.jkopay.desc': 'After clicking "Confirm & Pay", you will be redirected to the JKO Pay app to complete payment.',
    'checkout.atm.desc': 'After confirmation, the system will provide a virtual account number. Please complete the transfer within 24 hours.',
    'checkout.agree.alert': 'Please agree to the terms',

    // 確認
    'confirm.title': 'Booking Confirmed!',
    'confirm.subtitle': 'Thank you for your reservation. We look forward to welcoming you',
    'confirm.order.id': 'Order ID',
    'confirm.details': 'Stay Details',
    'confirm.guide': 'Check-in Guide',
    'confirm.checkin.time': 'Check-in: After 3:00 PM',
    'confirm.checkout.time': 'Check-out: Before 11:00 AM',
    'confirm.print': 'Print',
    'confirm.back': 'Back to Home',

    // 關於
    'about.title': 'About Demo Booking',
    'about.subtitle': 'Find your tranquil moment between mountains and sea',
    'about.story.title': 'Our Story',
    'about.story.p1': 'The story of Demo Booking began with a simple belief: every traveler deserves an experience that exceeds expectations.',
    'about.story.p2': 'In 2020, our founding team discovered this forgotten gem between Taiwan\'s northern coast and the mountain town of Jiufen. Here, Taiwan\'s most dramatic coastline unfolds, with layered mountains stretching to the horizon like an ink painting, and waves endlessly composing nature\'s poetry upon the cliffs.',
    'about.story.p3': 'We decided to create a space where one can truly let go — not just an accommodation, but a journey to reset body, mind, and soul. Each room is carefully designed, perfectly blending local cultural elements with modern luxury, allowing guests to experience the beauty of Taiwan\'s mountains and sea in comfort.',
    'about.value.title': 'Our Philosophy',
    'about.value1.title': 'Local Culture',
    'about.value1.desc': 'Every design detail incorporates local Taiwanese elements, allowing guests to feel the warmth of culture in comfort.',
    'about.value2.title': 'Sustainability',
    'about.value2.desc': 'We are committed to sustainable operations, using local ingredients, reducing carbon footprint, and living in harmony with nature.',
    'about.value3.title': 'Guest First',
    'about.value3.desc': 'Dedicated concierge service, listening to every guest\'s needs, creating tailor-made accommodation experiences.',

    // 設施
    'facilities.title': 'Facilities & Services',
    'facilities.subtitle': 'Every space crafted with care',
    'facility.pool': 'Infinity Pool',
    'facility.spa': 'SPA & Wellness',
    'facility.restaurant': 'Rooftop Restaurant',
    'facility.gym': 'Fitness Center',
    'facility.lounge': 'Lobby Lounge',
    'facility.parking': 'Free Parking',
    'facility.wifi': 'High-Speed WiFi',
    'facility.concierge': 'Personal Concierge',

    // 相簿
    'gallery.title': 'Gallery',
    'gallery.subtitle': 'Every angle tells a story',
    'gallery.filter.all': 'All',
    'gallery.filter.rooms': 'Rooms',
    'gallery.filter.public': 'Public Areas',
    'gallery.filter.dining': 'Dining',
    'gallery.filter.scenery': 'Scenery',

    // FAQ
    'faq.title': 'FAQ',
    'faq.subtitle': 'Everything you need to know',
    'faq.cat.booking': 'Booking',
    'faq.cat.checkin': 'Check-in/out',
    'faq.cat.payment': 'Payment',
    'faq.cat.cancel': 'Cancellation',
    'faq.cat.facilities': 'Facilities',
    'faq.q1': 'How far in advance can I book?',
    'faq.a1': 'You can book up to 180 days (approximately 6 months) in advance. We recommend booking 2-3 months ahead during peak seasons (summer, holidays, New Year) to ensure availability.',
    'faq.q2': 'Can I book by phone?',
    'faq.a2': 'Absolutely! You can call 02-2498-8888 to reach our reservation team. Service hours are daily from 08:00 to 22:00.',
    'faq.q3': 'What are the check-in and check-out times?',
    'faq.a3': 'Check-in is from 3:00 PM onwards, and check-out is before 11:00 AM. Early check-in or late check-out can be arranged upon request, subject to availability and possible charges.',
    'faq.q4': 'Is parking available?',
    'faq.a4': 'Yes, we offer a complimentary underground parking garage with 40 spaces on a first-come, first-served basis. If full, we will guide you to a nearby lot (approx. 3-minute walk).',
    'faq.q5': 'What payment methods do you accept?',
    'faq.a5': 'We accept: Credit cards (Visa / Mastercard / JCB), LINE Pay, JKO Pay, and Bank Transfer / ATM. All online payments are secured with SSL encryption.',
    'faq.q6': 'Is breakfast included?',
    'faq.a6': 'Suites and above include breakfast for two. Standard and Deluxe rooms can add breakfast for NT$ 680 per person. Children 6-12 pay half price; under 6 are free.',
    'faq.q7': 'How do I cancel or modify my booking?',
    'faq.a7': 'You can cancel via your account or by phone. Policy: Free cancellation 7+ days before check-in; 50% of first night\'s rate for 3-7 days; full first night\'s rate for less than 3 days. Special holiday bookings may have different policies.',
    'faq.q8': 'Are pets allowed?',
    'faq.a8': 'Currently, only small dogs (under 10kg) are allowed in designated pet-friendly rooms. Advance reservation and a NT$ 1,500 cleaning fee are required. We prepare a welcome gift pack for furry friends.',
    'faq.q9': 'Pool and SPA hours?',
    'faq.a9': 'The infinity pool is open daily 06:00-22:00. The SPA & Wellness Center operates 10:00-22:00 (reservation required). Hotel guests enjoy 10% off SPA treatments.',

    // 聯絡
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Any questions? We\'re here to help',
    'contact.form.title': 'Write to Us',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.transport': 'Getting Here',
    'contact.transport.detail': '🚗 Drive: National Highway 3 → Wanli IC → Provincial Highway 2 towards Jinshan, approx. 15 min\n🚌 Bus: Take Kuo-Kuang Bus 1815 from Taipei Main Station to Jinshan, then free shuttle\n🚃 Train: Take train to Keelung, then Keelung Bus to Jinshan (approx. 40 min)',
    'contact.form.success': 'Thank you for your message! We will get back to you shortly.',

    // 設施詳細
    'facility.pool.desc': 'Cliff-edge infinity pool merging with the Pacific horizon. Temperature-controlled, open year-round, and the perfect sunset viewing spot.',
    'facility.pool.time': 'Hours: 06:00 - 22:00',
    'facility.spa.desc': 'Premium spa experience infused with Taiwan\'s natural hot spring essence, offering aromatherapy, hot stone massage, and facial treatments.',
    'facility.spa.time': 'Hours: 10:00 - 22:00 (Reservation required)',
    'facility.restaurant.desc': 'Helmed by a Michelin-starred chef, featuring locally sourced ingredients with French culinary techniques for a mountain-sea gastronomy feast.',
    'facility.restaurant.time': 'Breakfast 07:00-10:00 / Lunch 11:30-14:00 / Dinner 17:30-21:00',
    'facility.gym.desc': '24-hour modern fitness space equipped with Technogym premium equipment, yoga studio, and personal training services.',
    'facility.gym.time': 'Open 24 Hours',

    // 會員
    'account.title': 'My Account',
    'account.orders': 'My Orders',
    'account.profile': 'Profile',
    'account.preferences': 'Preferences',
    'account.logout': 'Logout',
    'account.login': 'Login',
    'account.register': 'Register',

    // 頁尾
    'footer.brand': 'Demo Booking',
    'footer.desc': 'Nestled along Taiwan\'s most beautiful coastline, experience unparalleled premium accommodation',
    'footer.quick': 'Quick Links',
    'footer.support': 'Guest Services',
    'footer.follow': 'Follow Us',
    'footer.copyright': '© 2026 Demo Booking. All rights reserved.',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',

    // 通用
    'common.loading': 'Loading...',
    'common.more': 'Learn More',
    'common.back': 'Back',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.required': 'Required',
    'common.nights': 'nights',
    'common.guests': 'guests',
    'common.currency': 'NT$',

    // 404
    'error.title': 'Page Not Found',
    'error.desc': 'Sorry, the page you are looking for does not exist or has been removed.',

    // 地址
    'contact.address.value': 'No. 168, Zhongshan Rd, Jinshan Dist, New Taipei City 208',

    // 訂單狀態
    'order.status.confirmed': 'Confirmed',
    'order.status.completed': 'Completed',
    'order.status.cancelled': 'Cancelled',

    // 表單驗證
    'validation.required': 'Please fill in required fields',
    'validation.email': 'Please enter a valid email',
    'validation.phone': 'Please enter a valid phone number',
    'validation.date': 'Check-out must be after check-in',

    // 登入
    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.submit': 'Login',
    'login.register.prompt': 'Don\'t have an account?',
    'login.register.link': 'Register',
    'register.title': 'Create Account',
    'register.name': 'Full Name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.submit': 'Register',
    'register.login.prompt': 'Already have an account?',
    'register.login.link': 'Login',

    // 設施首頁描述
    'facility.pool.short': 'Cliff-edge infinity pool overlooking the Pacific',
    'facility.spa.short': 'Premium spa with local hot spring treatments',
    'facility.restaurant.short': 'Rooftop dining with locally sourced ingredients',
    'facility.gym.short': '24-hour modern fitness center',
    'facility.lounge.short': 'Elegant lobby lounge for afternoon tea',
    'facility.parking.short': 'Spacious complimentary underground parking',
    'facility.wifi.short': 'Property-wide high-speed WiFi',
    'facility.concierge.short': 'Personal concierge for all your needs',
  }
};

/** 目前語言 */
let currentLang = localStorage.getItem('lang') || 'zh-TW';

/**
 * 取得翻譯文字
 * @param {string} key - 翻譯鍵
 * @param {Object} params - 替換參數 { count: 3 } → {count}
 * @returns {string}
 */
export function t(key, params = {}) {
  let text = translations[currentLang]?.[key] || translations['zh-TW']?.[key] || key;
  Object.entries(params).forEach(([k, v]) => {
    text = text.replace(`{${k}}`, v);
  });
  return text;
}

/**
 * 取得目前語言
 */
export function getLang() {
  return currentLang;
}

/**
 * 切換語言
 */
export function toggleLang() {
  currentLang = currentLang === 'zh-TW' ? 'en' : 'zh-TW';
  localStorage.setItem('lang', currentLang);
  applyTranslations();
  document.documentElement.lang = currentLang === 'zh-TW' ? 'zh-Hant-TW' : 'en';
  // 觸發自訂事件，讓各頁面可以監聽
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: currentLang } }));
}

/**
 * 套用所有翻譯到 DOM
 */
export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = t(key);
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });

  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const pairs = el.getAttribute('data-i18n-attr').split(',');
    pairs.forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      el.setAttribute(attr, t(key));
    });
  });
}

/**
 * 初始化 i18n
 */
export function initI18n() {
  const saved = localStorage.getItem('lang');
  if (saved && translations[saved]) {
    currentLang = saved;
  }
  document.documentElement.lang = currentLang === 'zh-TW' ? 'zh-Hant-TW' : 'en';
  applyTranslations();
}
