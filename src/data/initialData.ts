import { Product, Category, Order, User, AdminAccount, Coupon, FAQ, SupportMessage, ShippingSettings, SiteSettings } from '../types';

export const initialCategories: Category[] = [
  {
    id: 'cat-clothings',
    slug: 'clothings',
    name_en: 'Clothings',
    name_bn: 'পোশাক ও ক্লথিং',
    description_en: 'Premium traditional and contemporary apparel, panjabis, t-shirts, and daily wear.',
    description_bn: 'প্রিমিয়াম পাঞ্জাবি, পোলো টি-শার্ট, ফরমাল ও ক্যাজুয়াল পোশাকের সমাহার।',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    is_active: true,
    icon_name: 'Shirt'
  },
  {
    id: 'cat-gadgets',
    slug: 'gadgets-and-gears',
    name_en: 'Gadgets and Gears',
    name_bn: 'গ্যাজেটস ও গিয়ার্স',
    description_en: 'Smart watches, ANC earbuds, high-capacity power banks, and smart device accessories.',
    description_bn: 'স্মার্ট ওয়াচ, ট্রু ওয়্যারলেস এয়ারবাডস, ফাস্ট চার্জিং গ্যাজেটস ও অরিজিনাল গিয়ার্স।',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    is_active: true,
    icon_name: 'Cpu'
  },
  {
    id: 'cat-lifestyle',
    slug: 'lifestyle',
    name_en: 'Lifestyle',
    name_bn: 'লাইফস্টাইল',
    description_en: 'Curated fashion, luxury bags, footwear, and trending personal accessories.',
    description_bn: 'ফ্যাশন ওয়্যার, লাক্সারি ব্যাগ, জুতো ও ট্রেন্ডি পার্সোনাল লাইফস্টাইল পণ্য।',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&auto=format&fit=crop&q=80',
    is_active: true,
    icon_name: 'Sparkles'
  },
  {
    id: 'cat-womens-fashion',
    parent_id: 'cat-lifestyle',
    slug: 'womens-and-girls-fashion',
    name_en: "Women's and Girl's Fashion",
    name_bn: 'নারী ও কিশোরীদের ফ্যাশন',
    description_en: 'Designer sarees, three-piece suits, kurtis, party dresses, and elegant accessories.',
    description_bn: 'ডিজাইনার শাড়ি, থ্রি-পিস, কুর্তি, পার্টি ড্রেস এবং মেয়েদের ফ্যাশনেবল পোশাক।',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    is_active: true,
    icon_name: 'Heart'
  },
  {
    id: 'cat-mens-fashion',
    parent_id: 'cat-lifestyle',
    slug: 'mens-and-boys-fashion',
    name_en: "Men's and Boy's Fashion",
    name_bn: 'পুরুষ ও ছেলেদের ফ্যাশন',
    description_en: 'Men\'s blazers, chinos, leather wallets, formal shirts, and boys trendy wear.',
    description_bn: 'ছেলেদের ব্লেজার, চিনো প্যান্টস, জেনুইন লেদার ওয়ালেট ও আধুনিক ফ্যাশন ওয়্যার।',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80',
    is_active: true,
    icon_name: 'User'
  },
  {
    id: 'cat-kitchen',
    slug: 'kitchen-items',
    name_en: 'Kitchen Items',
    name_bn: 'কিচেন ও রান্নাঘর',
    description_en: 'Electric blenders, air fryers, non-stick cookware sets, and smart kitchen tools.',
    description_bn: 'ফুড প্রসেসর, ব্লেন্ডার, এয়ার ফ্রায়ার, নন-স্টিক কুকওয়্যার ও স্মার্ট কিচেন এক্সেসরিজ।',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
    is_active: true,
    icon_name: 'Utensils'
  },
  {
    id: 'cat-health-beauty',
    slug: 'health-and-beauty',
    name_en: 'Health and Beauty',
    name_bn: 'হেলথ ও বিউটি',
    description_en: 'Skincare serums, organic hair care oils, facial cleansing tools, and cosmetic sets.',
    description_bn: 'অরগানিক স্কিনকেয়ার সিরাম, হেয়ার অয়েল, ফেসিয়াল ম্যাসাজার ও অরিজিনাল বিউটি পণ্য।',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
    is_active: true,
    icon_name: 'Sparkles'
  },
  {
    id: 'cat-mother-baby',
    slug: 'mother-and-baby',
    name_en: 'Mother and Baby',
    name_bn: 'মা ও শিশু',
    description_en: 'Ergonomic baby carriers, feeding bottles, sterilizers, and gentle infant skincare.',
    description_bn: 'বেবি ক্যারিয়ার, ফিডিং বোতল, বেবি স্কিনকেয়ার এবং মা ও শিশুর প্রয়োজনীয় যত্ন।',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80',
    is_active: true,
    icon_name: 'Baby'
  }
];

export const initialProducts: Product[] = [
  // 1. CLOTHINGS
  {
    id: 'prod-cloth-1',
    slug: 'royal-cotton-embroidered-panjabi',
    title_en: 'Royal Heritage Embroidered Premium Cotton Panjabi',
    title_bn: 'রয়্যাল হেরিটেজ এমব্রয়ডারি প্রিমিয়াম কটন পাঞ্জাবি',
    description_en: 'Crafted from 100% fine combed Egyptian cotton with intricate collar and placket geometric embroidery. Designed with tailored fit, durable mother-of-pearl buttons, and side pockets. Perfect for festive celebrations, weddings, and formal occasions.',
    description_bn: '১০০% ফাইন কম্বড কটন ফেব্রিক ও দৃষ্টিনন্দন এমব্রয়ডারি কাজ করা প্রিমিয়াম পাঞ্জাবি। আরামদায়ক ফিটিং ও টেকসই ফেব্রিক যা উৎসব, ঈদ ও যেকোনো অনুষ্ঠানের জন্য মানানসই।',
    features_en: [
      '100% Pure Combed Cotton Fabric (Breathable & Soft)',
      'Subtle High-density Collar & Chest Embroidery',
      'Dual Deep Side Pockets with Reinforced Stitching',
      'Fade-resistant Reactive Dyeing with Premium Finish',
      'Easy Hand or Machine Washable'
    ],
    features_bn: [
      '১০০% খাঁটি কম্বড কটন ফেব্রিক (আরামদায়ক ও মসৃণ)',
      'কলার ও প্লেকেটে প্রিমিয়াম হাই-ডেনসিটি এমব্রয়ডারি কাজ',
      'মজবুত সেলাইযুক্ত দুটি ডিপ সাইড পকেট',
      'রং পাকা ও দীর্ঘস্থায়ী রিঅ্যাক্টিভ ডাইং ফিনিশিং',
      'সহজে ওয়াশযোগ্য ও টেকসই'
    ],
    category_id: 'cat-clothings',
    keywords: ['panjabi', 'punjabi', 'clothing', 'men fashion', 'eid', 'cotton', 'kurta', 'পোশাক', 'পাঞ্জাবি'],
    brand: 'Mehnaj Couture',
    primary_image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-p1-40', sku: 'MC-PANJ-NVY-40', name_en: 'Navy Blue - Size 40 (M)', name_bn: 'নেভি ব্লু - সাইজ ৪০ (মিডিয়াম)', price: 1850, original_price: 2450, stock: 25, is_default: true },
      { id: 'v-p1-42', sku: 'MC-PANJ-NVY-42', name_en: 'Navy Blue - Size 42 (L)', name_bn: 'নেভি ব্লু - সাইজ ৪২ (লার্জ)', price: 1850, original_price: 2450, stock: 18 },
      { id: 'v-p1-44', sku: 'MC-PANJ-NVY-44', name_en: 'Navy Blue - Size 44 (XL)', name_bn: 'নেভি ব্লু - সাইজ ৪৪ (এক্সএল)', price: 1850, original_price: 2450, stock: 12 },
      { id: 'v-p1-wht-42', sku: 'MC-PANJ-WHT-42', name_en: 'Pearl White - Size 42 (L)', name_bn: 'পার্ল হোয়াইট - সাইজ ৪২ (লার্জ)', price: 1950, original_price: 2550, stock: 14 }
    ],
    is_featured: true,
    is_active: true,
    low_stock_threshold: 5,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    video_title: 'Mehnaj Couture Premium Panjabi Collection Fitting',
    video_placement: 'gallery',
    video_enabled: true,
    rating: 4.9,
    reviews_count: 88,
    sales_count: 320,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'prod-cloth-2',
    slug: 'heavyweight-classic-polo-tshirt',
    title_en: 'Premium 220 GSM Pique Cotton Polo T-Shirt',
    title_bn: 'প্রিমিয়াম ২২০ জিএসএম পিক কটন পোলো টি-শার্ট',
    description_en: 'Engineered from 220 GSM heavyweight combed pique cotton with ribbed collar and anti-curling cuffs. Breathable fabric that retains color and shape after repeated washes. Ideal for smart casual office wear or weekend leisure.',
    description_bn: '২২০ জিএসএম প্রিমিয়াম পিক কটন কাপড়ের তৈরি মার্জিত পোলো টি-শার্ট। ধোয়ার পরও রং ও শেইপ অপরিবর্তিত থাকে। আরামদায়ক ও নিখুঁত ফিনিশিং।',
    features_en: [
      '220 GSM Heavyweight Combed Cotton Pique',
      'Anti-roll Reinforced Ribbed Collar & Cuffs',
      'Double-stitched Hem for Longevity',
      'Comfortable Regular & Athletic Fit'
    ],
    features_bn: [
      '২২০ জিএসএম কম্বড কটন পিক ফেব্রিক',
      'অ্যান্টি-রোল প্রিমিয়াম রিবড কলার',
      'টেকসই ডাবল স্টিচড হেম ফিনিশিং',
      'স্মার্ট রেগুলার ও অ্যাথলেটিক ফিট'
    ],
    category_id: 'cat-clothings',
    keywords: ['polo', 'tshirt', 't-shirt', 'shirt', 'clothing', 'পোলো', 'টি শার্ট'],
    brand: 'Mehnaj Basics',
    primary_image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-pol-m-blk', sku: 'MB-POL-BLK-M', name_en: 'Matte Black (M)', name_bn: 'ম্যাট ব্ল্যাক (মিডিয়াম)', price: 790, original_price: 1100, stock: 30, is_default: true },
      { id: 'v-pol-l-blk', sku: 'MB-POL-BLK-L', name_en: 'Matte Black (L)', name_bn: 'ম্যাট ব্ল্যাক (লার্জ)', price: 790, original_price: 1100, stock: 24 },
      { id: 'v-pol-l-olv', sku: 'MB-POL-OLV-L', name_en: 'Olive Green (L)', name_bn: 'অলিভ গ্রিন (লার্জ)', price: 790, original_price: 1100, stock: 15 }
    ],
    is_featured: false,
    is_active: true,
    low_stock_threshold: 6,
    rating: 4.7,
    reviews_count: 54,
    sales_count: 210,
    created_at: '2026-08-05T12:00:00Z'
  },

  // 2. GADGETS AND GEARS
  {
    id: 'prod-gad-1',
    slug: 'kieslect-ks-pro-calling-smartwatch',
    title_en: 'Kieslect Ks Pro 2.01" AMOLED Calling Smart Watch',
    title_bn: 'কিসলেক্ট কেএস প্রো ২.০১" অ্যামোলেড কলিং স্মার্ট ওয়াচ',
    description_en: 'The Kieslect Ks Pro features an ultra-large 2.01" FHD AMOLED display with 410x520 high resolution. Equipped with stable Bluetooth 5.2 calling, abnormal heart rate warning, 100 sports modes, and IP68 waterproof rating. Built for power users and active lifestyle enthusiasts in Bangladesh.',
    description_bn: 'কিসলেক্ট কেএস প্রো-তে রয়েছে ২.০১ ইঞ্চির এফএইচডি অ্যামোলেড ডিসপ্লে ও ৪১০x৫২০ হাই রেজোলিউশন। স্টেবল ব্লুটুথ ৫.২ কলিং, হার্ট রেট ওয়ার্নিং, ১০০টি স্পোর্টস মোড এবং আইপি৬৮ ওয়াটারপ্রুফ রেটিং সম্বলিত প্রিমিয়াম স্মার্টওয়াচ।',
    features_en: [
      '2.01" Super Retina AMOLED Display with Always-on Display (AOD)',
      'Clear & Stable Bluetooth 5.2 Phone Calling with HD Speaker',
      'Abnormal Heart Rate Alert, SpO2 & Sleep Tracking',
      '100+ Workout Modes with Smart Recognition',
      'Up to 10 Days Typical Battery Life (300mAh)',
      'IP68 Water Resistance with Metallic Frame'
    ],
    features_bn: [
      '২.০১" সুপার রেটিনা অ্যামোলেড ডিসপ্লে এবং অলওয়েজ অন ডিসপ্লে (AOD)',
      'এইচডি স্পিকার সহ ক্লিয়ার ব্লুটুথ ৫.২ ফোন কলিং সুবিধা',
      'হার্ট রেট অ্যালার্ট, রক্তে অক্সিজেন (SpO2) ও স্লিপ মনিটরিং',
      '১০০+ স্পোর্টস মোড এবং ফিটনেস ট্র্যাকিং',
      'এক চার্জে ১০ দিন পর্যন্ত সাধারণ ব্যাটারি ব্যাকআপ (৩০০ এমএএইচ)',
      'আইপি৬৮ ওয়াটার রেজিস্ট্যান্স এবং প্রিমিয়াম মেটালিক বডি'
    ],
    category_id: 'cat-gadgets',
    keywords: ['watch', 'smartwatch', 'calling watch', 'amoled', 'gadget', 'kieslect', 'স্মার্ট ওয়াচ', 'ঘড়ি'],
    brand: 'Kieslect',
    primary_image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-ks-blk', sku: 'KS-PRO-BLK', name_en: 'Space Black (Silicone + Magnetic Strap)', name_bn: 'স্পেস ব্ল্যাক (সিলিকন + ম্যাগনেটিক বেল্ট)', price: 4490, original_price: 5990, stock: 18, is_default: true },
      { id: 'v-ks-slv', sku: 'KS-PRO-SLV', name_en: 'Silver Edition (Orange Strap Included)', name_bn: 'সিলভার এডিশন (অরেঞ্জ বেল্ট সহ)', price: 4690, original_price: 6190, stock: 8 }
    ],
    is_featured: true,
    is_active: true,
    low_stock_threshold: 5,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    video_title: 'Kieslect Ks Pro Unboxing & Hands-on Review',
    video_placement: 'gallery',
    video_enabled: true,
    rating: 4.8,
    reviews_count: 142,
    sales_count: 480,
    created_at: '2026-07-15T10:00:00Z'
  },
  {
    id: 'prod-gad-2',
    slug: 'soundcore-space-a40-anc-earbuds',
    title_en: 'Soundcore Space A40 Adaptive ANC Wireless Earbuds',
    title_bn: 'সাউন্ডকোর স্পেস এ৪০ অ্যাডাপ্টিভ এএনসি ট্রু ওয়্যারলেস বাডস',
    description_en: 'Engineered with Upgraded Noise Cancelling that blocks up to 98% of ambient sound. Features Hi-Res Wireless Audio certified with LDAC codec, comfortable lightweight fit, and an astonishing 50-hour total playtime with wireless charging case.',
    description_bn: 'আপগ্রেডেড নয়েজ ক্যানসেলিং প্রযুক্তি যা ৯৮% পর্যন্ত পারিপার্শ্বিক শব্দ দূর করে। এলডিএসি কোডেক সহ হাই-রেস অডিও সাপোর্ট এবং কেস সহ মোট ৫০ ঘণ্টার প্লে-টাইম সুবিধা।',
    features_en: [
      'Reduces Noise By Up to 98% with Adaptive Hybrid ANC',
      '50 Hours Ultra-long Playtime (10h Single Charge + 40h Case)',
      'Hi-Res Wireless Sound & LDAC Codec Support',
      'Multipoint Connection (Switch effortlessly between PC & Phone)',
      'Fast Wireless Charging & IPX4 Water Resistance'
    ],
    features_bn: [
      'অ্যাডাপ্টিভ হাইব্রিড এএনসি সহ ৯৮% পর্যন্ত নয়েজ রিডাকশন',
      '৫০ ঘণ্টার দীর্ঘ ব্যাটারি ব্যাকআপ (১০ ঘণ্টা একক + ৪০ ঘণ্টা কেস)',
      'হাই-রেস ওয়্যারলেস সাউন্ড এবং এলডিএসি কোডেক সাপোর্ট',
      'একসাথে দুটি ডিভাইসে মাল্টিপয়েন্ট কানেকশন',
      'ওয়্যারলেস চার্জিং ও আইপিএক্স৪ ওয়াটার রেজিস্ট্যান্স'
    ],
    category_id: 'cat-gadgets',
    keywords: ['earbuds', 'tws', 'headphones', 'soundcore', 'anc', 'wireless', 'ইয়ারবাড', 'হেডফোন'],
    brand: 'Anker Soundcore',
    primary_image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-a40-blk', sku: 'SC-A40-BLK', name_en: 'Midnight Black', name_bn: 'মিডনাইট ব্ল্যাক', price: 6890, original_price: 8490, stock: 12, is_default: true },
      { id: 'v-a40-wht', sku: 'SC-A40-WHT', name_en: 'Cloud White', name_bn: 'ক্লাউড হোয়াইট', price: 6890, original_price: 8490, stock: 7 }
    ],
    is_featured: true,
    is_active: true,
    low_stock_threshold: 4,
    rating: 4.9,
    reviews_count: 98,
    sales_count: 310,
    created_at: '2026-07-20T11:00:00Z'
  },
  {
    id: 'prod-gad-3',
    slug: 'baseus-blade-100w-fast-powerbank',
    title_en: 'Baseus Blade 100W 20000mAh Ultra-Thin Fast Power Bank',
    title_bn: 'বেসাস ব্লেড ১০০ ওয়াট ২০০০০ এমএএইচ স্লিম ফাস্ট পাওয়ার ব্যাংক',
    description_en: 'Ultra-thin 18mm power bank capable of 100W USB-C Power Delivery. Charges laptops, MacBooks, iPads, and smartphones at maximum speed with smart digital LED power management screen.',
    description_bn: 'মাত্র ১৮ মিলিমিটার স্লিম ১০০ ওয়াট ফাস্ট পাওয়ার ব্যাংক। ল্যাপটপ, ম্যাকবুক, ট্যাব এবং সব ধরনের স্মার্টফোন দ্রুত চার্জ করতে সক্ষম ডিজিটাল ডিসপ্লে সহ।',
    features_en: [
      '100W High Power Output (Supports Laptop Fast Charging)',
      '20,000mAh High Density Lithium-Polymer Battery',
      'Digital Status Display for Voltage, Current, and Charge Time',
      'Dual Type-C + Dual USB-A Output Ports'
    ],
    features_bn: [
      '১০০ ওয়াট হাই পাওয়ার আউটপুট (ল্যাপটপ চার্জিং উপযোগী)',
      '২০,০০০ এমএএইচ হাই ডেনসিটি ব্যাটারি ব্যাকআপ',
      'ভোল্টেজ ও চার্জিং সময়ের ডিজিটাল মনিটরিং ডিসপ্লে',
      'দুটি টাইপ-সি ও দুটি ইউএসবি-এ পোর্ট'
    ],
    category_id: 'cat-gadgets',
    keywords: ['powerbank', 'charger', 'baseus', '100w', 'battery', 'পাওয়ার ব্যাংক'],
    brand: 'Baseus',
    primary_image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-bld-blk', sku: 'BS-BLD-100W', name_en: 'Matte Stealth Black', name_bn: 'ম্যাট স্টিলথ ব্ল্যাক', price: 4950, original_price: 6500, stock: 20, is_default: true }
    ],
    is_featured: false,
    is_active: true,
    low_stock_threshold: 5,
    rating: 4.8,
    reviews_count: 65,
    sales_count: 190,
    created_at: '2026-07-28T09:00:00Z'
  },

  // 3. LIFESTYLE (WOMEN'S & GIRL'S FASHION)
  {
    id: 'prod-wm-1',
    slug: 'pure-georgette-designer-party-saree',
    title_en: 'Designer Pure Georgette Zari Embroidered Party Saree',
    title_bn: 'ডিজাইনার পিওর জর্জেট জারি এমব্রয়ডারি পার্টি শাড়ি',
    description_en: 'Exquisite lightweight georgette saree featuring intricate silver-gold zari embroidery work along the border and pallu. Accompanied by an unstitched heavy embroidered silk designer blouse piece.',
    description_bn: 'প্রিমিয়াম জর্জেট ফেব্রিক ও মনোমুগ্ধকর জারি এমব্রয়ডারি করা পার্টি শাড়ি। সাথে রয়েছে আনস্টিচড ম্যাচিং ভারী ডিজাইনার ব্লাউজ পিস।',
    features_en: [
      'Premium Flowy Georgette Fabric with Zari Embellishment',
      '6.5 Meters Length including Unstitched Blouse Piece',
      'Comfortable Lightweight Drape for Weddings & Parties',
      'Rich Color Fastness with Dry Clean Recommendation'
    ],
    features_bn: [
      'উন্নতমানের জর্জেট কাপড়ে নিখুঁত জারি কাজ',
      'ব্লাউজ পিস সহ মোট ৬.৫ মিটার পরিমাপ',
      'উৎসব ও বিয়ের অনুষ্ঠানের জন্য আরামদায়ক ও গর্জিয়াস',
      'স্থায়ী রং ও মসৃণ টেক্সচার'
    ],
    category_id: 'cat-lifestyle',
    subcategory_id: 'cat-womens-fashion',
    keywords: ['saree', 'shari', 'women fashion', 'georgette', 'party wear', 'শাড়ি', 'জর্জেট'],
    brand: 'Mehnaj Lifestyle',
    primary_image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-sar-mro', sku: 'ML-SAR-MRO', name_en: 'Royal Maroon with Gold Zari', name_bn: 'রয়্যাল মেরুন ও গোল্ড জারি', price: 3450, original_price: 4800, stock: 15, is_default: true },
      { id: 'v-sar-grn', sku: 'ML-SAR-EMR', name_en: 'Emerald Green with Silver Zari', name_bn: 'এমেরাল্ড গ্রিন ও সিলভার জারি', price: 3450, original_price: 4800, stock: 10 }
    ],
    is_featured: true,
    is_active: true,
    low_stock_threshold: 4,
    rating: 4.9,
    reviews_count: 76,
    sales_count: 240,
    created_at: '2026-08-10T14:00:00Z'
  },
  {
    id: 'prod-wm-2',
    slug: 'luxury-leatherette-handbag-set',
    title_en: 'Luxury Structured Leatherette Shoulder Bag with Wallet Combo',
    title_bn: 'লাক্সারি লেদারেট শোল্ডার হ্যান্ডব্যাগ ও ওয়ালেট কম্বো',
    description_en: 'A stylish 2-piece set containing a high-grade textured leatherette shoulder tote bag with golden hardware accents and a matching accordion coin wallet.',
    description_bn: 'প্রিমিয়াম টেক্সচার্ড ওয়াটার-রেজিস্ট্যান্ট লেদারেট হ্যান্ডব্যাগ এবং সাথে ম্যাচিং পার্স/ওয়ালেট কম্বো। অফিস ও ডেইলি ব্যবহারের জন্য আদর্শ।',
    features_en: [
      'Scratch & Water-resistant Synthetic Leather',
      'Spacious Multi-compartment Interior with Zipper Pockets',
      'Detachable Adjustable Crossbody Shoulder Strap',
      'Includes Matching Compact Wallet with Card Slots'
    ],
    features_bn: [
      'স্ক্র্যাচ ও পানি নিরোধক সিন্থেটিক লেদার বডি',
      'জিপার ও একাধিক চেম্বারযুক্ত সুপরিসর ভেতরের অংশ',
      'এডজাস্টেবল লং ক্রস-বডি স্ট্র্যাপ',
      'ম্যাচিং কম্প্যাক্ট কার্ড হোল্ডার ওয়ালেট অন্তর্ভুক্ত'
    ],
    category_id: 'cat-lifestyle',
    subcategory_id: 'cat-womens-fashion',
    keywords: ['handbag', 'bag', 'purse', 'ladies bag', 'women', 'হ্যান্ডব্যাগ', 'ব্যাগ'],
    brand: 'Mehnaj Luxe',
    primary_image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-bag-tan', sku: 'ML-BAG-TAN', name_en: 'Classic Tan Brown', name_bn: 'ক্লাসিক ট্যান ব্রাউন', price: 2150, original_price: 2950, stock: 22, is_default: true },
      { id: 'v-bag-blk', sku: 'ML-BAG-BLK', name_en: 'Obsidian Black', name_bn: 'অবসিডিয়ান ব্ল্যাক', price: 2150, original_price: 2950, stock: 16 }
    ],
    is_featured: false,
    is_active: true,
    low_stock_threshold: 5,
    rating: 4.8,
    reviews_count: 42,
    sales_count: 160,
    created_at: '2026-08-12T10:00:00Z'
  },

  // 3. LIFESTYLE (MEN'S & BOY'S FASHION)
  {
    id: 'prod-mn-1',
    slug: 'genuine-cowhide-leather-wallet-belt-giftbox',
    title_en: 'Genuine Top-Grain Cowhide Leather Wallet & Reversible Belt Combo',
    title_bn: 'জেনুইন কাউহাইড লেদার ওয়ালেট ও রিভার্সিবল বেল্ট গিফটবক্স',
    description_en: 'Handcrafted from 100% genuine top-grain cowhide leather. Includes a RFID-blocking bifold wallet with 8 card slots and a 35mm automatic alloy buckle reversible belt (Black/Brown). Packed in a luxury gift box.',
    description_bn: '১০০% আসল চামড়ার তৈরি আরএফআইডি প্রটেক্টেড ওয়ালেট এবং প্রিমিয়াম অটোমেটিক বাকলযুক্ত রিভার্সিবল বেল্ট। প্রিমিয়াম গিফট বক্সে প্যাকিং করা।',
    features_en: [
      '100% Full Grain Leather Construction',
      'RFID Blocking Shield to Protect Credit Cards',
      'Reversible 2-in-1 Belt (Black & Dark Brown)',
      'Rust-proof Zinc Alloy Rotary Buckle'
    ],
    features_bn: [
      '১০০% জেনুইন অরিজিনাল লেদার',
      'কার্ডের নিরাপত্তা নিশ্চিত করতে আরএফআইডি ব্লকিং লেয়ার',
      '২-ইন-১ রিভার্সিবল বেল্ট (কালো ও চকলেট ব্রাউন)',
      'মরিচারোধক জিংক অ্যালয় রোটারি বাকল'
    ],
    category_id: 'cat-lifestyle',
    subcategory_id: 'cat-mens-fashion',
    keywords: ['wallet', 'belt', 'leather', 'men fashion', 'gift', 'মানিব্যাগ', 'বেল্ট', 'চামড়া'],
    brand: 'Mehnaj Leathercraft',
    primary_image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-wlt-gft', sku: 'ML-WLT-GFT1', name_en: 'Standard Gift Box (Belt Size 32-44)', name_bn: 'স্ট্যান্ডার্ড লাক্সারি গিফট বক্স', price: 1650, original_price: 2400, stock: 35, is_default: true }
    ],
    is_featured: true,
    is_active: true,
    low_stock_threshold: 8,
    rating: 4.9,
    reviews_count: 110,
    sales_count: 390,
    created_at: '2026-08-08T15:00:00Z'
  },
  {
    id: 'prod-mn-2',
    slug: 'mark-ryden-anti-theft-waterproof-laptop-backpack',
    title_en: 'Mark Ryden Expandable 17.3" Anti-Theft Water-Resistant Backpack',
    title_bn: 'মার্ক রাইডেন ১৭.৩" অ্যান্টি-থেফট ওয়াটারপ্রুফ ল্যাপটপ ব্যাকপ্যাক',
    description_en: 'Engineered for tech professionals and students. Features high-density Oxford water-repellent coating, TSA approved lock, integrated external USB fast-charging port, and breathable honeycomb back panel.',
    description_bn: '১৭.৩ ইঞ্চি পর্যন্ত ল্যাপটপ বহনে সক্ষম ওয়াটার-রেজিস্ট্যান্ট অ্যান্টি-থেফট ব্যাকপ্যাক। টিএসএ পাসওয়ার্ড লক ও ইউএসবি চার্জিং পোর্ট সহ দীর্ঘস্থায়ী ব্যবহার উপযোগী।',
    features_en: [
      'Expands from 26L to 38L capacity in seconds',
      'Waterproof YKK zippers & 900D Oxford Fabric',
      'TSA combination lock with hidden rear anti-theft pocket',
      'External USB 3.0 Charging Port'
    ],
    features_bn: [
      '২৬ লিটার থেকে ৩৮ লিটার পর্যন্ত এক্সপ্যান্ডেবল সুবিধা',
      'ওয়াটারপ্রুফ ওয়াইকেকে জিপার ও ৯০০ডি অক্সফোর্ড ফেব্রিক',
      'টিএসএ পাসওয়ার্ড লক এবং হিডেন সিকিউরিটি পকেট',
      'এক্সটার্নাল ইউএসবি চার্জিং পোর্ট সংযুক্ত'
    ],
    category_id: 'cat-lifestyle',
    subcategory_id: 'cat-mens-fashion',
    keywords: ['backpack', 'laptop bag', 'mark ryden', 'bag', 'waterproof', 'ব্যাগ', 'ব্যাকপ্যাক'],
    brand: 'Mark Ryden',
    primary_image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-mr-blk', sku: 'MR-BPK-BLK', name_en: 'Space Carbon Black', name_bn: 'স্পেস কার্বন ব্ল্যাক', price: 3850, original_price: 4950, stock: 14, is_default: true }
    ],
    is_featured: false,
    is_active: true,
    low_stock_threshold: 4,
    rating: 4.8,
    reviews_count: 82,
    sales_count: 245,
    created_at: '2026-07-30T10:00:00Z'
  },

  // 4. KITCHEN ITEMS
  {
    id: 'prod-kitch-1',
    slug: 'silver-crest-multi-speed-blender-grinder',
    title_en: 'Silver Crest 4500W Heavy Duty Multi-Speed Food Blender & Grinder',
    title_bn: 'সিলভার ক্রেস্ট ৪৫০০ ওয়াট হেভি ডিউটি মাল্টি-স্পিড ব্লেন্ডার ও গ্রাইন্ডার',
    description_en: 'Heavy-duty German commercial-grade motor with 6 Japanese stainless steel blades. Effortlessly crushes ice, spices, turmeric, meat, and prepares smoothies in seconds with a 2L BPA-free unbreakable jar.',
    description_bn: '৪৫০০ ওয়াট ক্ষমতাসম্পন্ন হেভি ডিউটি কমার্শিয়াল ব্লেন্ডার। বরফ, হলুদ, মসলা ও মাংস ব্লেন্ড করা যায় নিমিষেই। ২ লিটার আনব্রেকেবল জার সমৃদ্ধ।',
    features_en: [
      '4500W Pure Copper Commercial High-Torque Motor',
      '6-blade 304 Stainless Steel Hardened Cyclone Cutters',
      '2.0L Unbreakable Food-grade Polycarbonate Jar',
      'Stepless Variable Speed Knob with Instant Pulse Mode'
    ],
    features_bn: [
      '৪৫০০ ওয়াট পিওর কপার হাই-টর্ক শক্তিশালী মোটর',
      '৬টি ৩০৪ স্টেইনলেস স্টিল সাইক্লোন ব্লেড',
      '২.০ লিটার ফুড-গ্রেড আনব্রেকেবল জার',
      'ভ্যারিয়েবল স্পিড ও পালস কন্ট্রোল সুবিধা'
    ],
    category_id: 'cat-kitchen',
    keywords: ['blender', 'grinder', 'kitchen', 'food processor', 'spice', 'ব্লেন্ডার', 'কিচেন', 'মসলা'],
    brand: 'Silver Crest',
    primary_image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-sc-red', sku: 'SC-BLD-RED', name_en: 'Crimson Red (2L Jar)', name_bn: 'ক্রিমসন রেড (২ লিটার জার)', price: 2890, original_price: 3990, stock: 25, is_default: true },
      { id: 'v-sc-blk', sku: 'SC-BLD-BLK', name_en: 'Piano Black (2L Jar)', name_bn: 'পিয়ানো ব্ল্যাক (২ লিটার জার)', price: 2890, original_price: 3990, stock: 15 }
    ],
    is_featured: true,
    is_active: true,
    low_stock_threshold: 6,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    video_title: 'Silver Crest 4500W Heavy Duty Blender Live Demonstration',
    video_placement: 'gallery',
    video_enabled: true,
    rating: 4.9,
    reviews_count: 165,
    sales_count: 520,
    created_at: '2026-08-03T11:00:00Z'
  },
  {
    id: 'prod-kitch-2',
    slug: 'granite-nonstick-cookware-7pc-set',
    title_en: 'German Granite Non-Stick Induction Cookware Set (7 Pieces)',
    title_bn: 'জার্মান গ্রানাইট নন-স্টিক ইন্ডাকশন কুকওয়্যার সেট (৭ পিস)',
    description_en: 'Healthy oil-free cooking with 5-layer eco-friendly granite non-stick coating. Free from PFOA, Lead, and Cadmium. Compatible with gas stoves, induction hobs, and electric cooktops with stay-cool bakelite handles.',
    description_bn: 'কম তেলে স্বাস্থ্যকর রান্নার জন্য ৫ লেয়ার গ্রানাইট নন-স্টিক কোটিংযুক্ত ৭ পিসের প্রিমিয়াম হাড়ি ও প্যান সেট। গ্যাস ও ইন্ডাকশন উভয় চুলায় ব্যবহারযোগ্য।',
    features_en: [
      '5-Layer Scratch Resistant Swiss Granite Coating',
      'Includes Casserole Pots with Glass Lids, Frying Pan & Saucepan',
      '100% PFOA Free & Eco-friendly Food Contact Certified',
      'Ergonomic Heat-Resistant Wood-finish Handles'
    ],
    features_bn: [
      '৫ লেয়ার টেকসই স্ক্র্যাচ-প্রুফ গ্রানাইট কোটিং',
      'ঢাকনা সহ কড়াই, ফ্রাইপ্যান ও সসপ্যান সমন্বিত',
      'পিএফওএ মুক্ত ১০০% নিরাপদ কোটিং',
      'তাপনিরোধক আরামদায়ক উড-ফিনিশ হ্যান্ডেল'
    ],
    category_id: 'cat-kitchen',
    keywords: ['cookware', 'pan', 'pot', 'nonstick', 'granite', 'kitchen', 'হাড়ি', 'কড়াই'],
    brand: 'Dessini Imperial',
    primary_image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-cw-grn', sku: 'DS-CW-7PC-GRY', name_en: 'Granite Charcoal Grey (7 Pieces)', name_bn: 'গ্রানাইট চারকোল গ্রে (৭ পিস সেট)', price: 4650, original_price: 6200, stock: 12, is_default: true }
    ],
    is_featured: false,
    is_active: true,
    low_stock_threshold: 4,
    rating: 4.8,
    reviews_count: 59,
    sales_count: 170,
    created_at: '2026-08-07T08:00:00Z'
  },

  // 5. HEALTH AND BEAUTY
  {
    id: 'prod-hb-1',
    slug: 'korean-snail-mucin-niacinamide-glow-serum',
    title_en: 'COSRX Advanced Snail 96 Mucin Power Essence & Niacinamide Serum',
    title_bn: 'কসআরএক্স অ্যাডভান্সড স্নেল ৯৬ মিউসিন গ্লোয়িং এসেন্স সিরাম',
    description_en: 'Formulated with 96.3% Snail Secretion Filtrate to hydrate, repair dull damaged skin, reduce acne blemishes, and enhance natural skin elasticity and glass radiance.',
    description_bn: 'ত্বকের গভীরে আর্দ্রতা যোগাতে ও দাগ দূর করতে ৯৬.৩% স্নেল মিউসিন সমৃদ্ধ আসল কোরিয়ান এসেন্স সিরাম। স্কিন গ্লো বাড়াতে জাদুকরী ভূমিকা রাখে।',
    features_en: [
      '96.3% Snail Secretion Filtrate for Deep Moisture Barrier Repair',
      'Brightens Skin Tone & Fades Dark Spots & Hyperpigmentation',
      'Fragrance-Free, Paraben-Free, Dermatologically Tested',
      'Imported 100% Genuine Korean Skincare'
    ],
    features_bn: [
      '৯৬.৩% স্নেল ফিলট্রেট যা ত্বকের ব্যারিয়ার রিপেয়ার করে',
      'ব্রণের দাগ দূর করে ও ত্বকের উজ্জ্বলতা বৃদ্ধি করে',
      'প্যারাবেন ও ক্ষতিকর রাসায়নিক মুক্ত',
      '১০০% আসল কোরিয়ান স্কিনকেয়ার প্রোডাক্ট'
    ],
    category_id: 'cat-health-beauty',
    keywords: ['serum', 'skincare', 'cosrx', 'snail mucin', 'beauty', 'glow', 'সিরাম', 'স্কিনকেয়ার', 'রূপচর্চা'],
    brand: 'COSRX Korea',
    primary_image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-cx-100ml', sku: 'CX-SNL-100ML', name_en: '100ml Bottle (Official Imported)', name_bn: '১০০ মিলি বোতল (অরিজিনাল ইনট্যাক্ট)', price: 1750, original_price: 2300, stock: 28, is_default: true }
    ],
    is_featured: true,
    is_active: true,
    low_stock_threshold: 6,
    rating: 4.9,
    reviews_count: 145,
    sales_count: 460,
    created_at: '2026-08-04T13:00:00Z'
  },
  {
    id: 'prod-hb-2',
    slug: 'rechargeable-facial-cleansing-brush-massager',
    title_en: 'Waterproof Sonic Facial Cleansing & Anti-Aging Face Massager',
    title_bn: 'ওয়াটারপ্রুফ সনিক ফেসিয়াল ক্লিনিং ব্রাশ ও স্কিন ম্যাসাজার',
    description_en: 'Ultra-hygienic soft silicone facial brush with 8000 sonic pulsations per minute. Deeply cleanses clogged pores, removes makeup residue, and stimulates facial collagen synthesis.',
    description_bn: 'মিনিটে ৮০০০ সনিক ভাইব্রেশনের মাধ্যমে ত্বকের লোমকূপ থেকে ময়লা ও মেকআপ দূর করে এবং ত্বকের রক্ত সঞ্চালন বাড়িয়ে তারুণ্য ধরে রাখে।',
    features_en: [
      'Ultra-soft Medical Grade Antibacterial Silicone Bristles',
      '5 Adjustable Sonic Vibration Speeds',
      'IPX7 100% Waterproof for In-Shower Use',
      'USB Rechargeable with up to 90 Days Use per Charge'
    ],
    features_bn: [
      'মেডিকেল গ্রেড ব্যাক্টেরিয়া প্রতিরোধী সিলিকন ব্রিসলস',
      '৫টি স্পিড ভাইব্রেশন কন্ট্রোল',
      'আইপিএক্স৭ ওয়াটারপ্রুফ বডি',
      'এক চার্জে ৯০ দিন পর্যন্ত ব্যবহারের সুবিধা'
    ],
    category_id: 'cat-health-beauty',
    keywords: ['facial', 'cleanser', 'massager', 'skin', 'beauty tool', 'ফেসিয়াল', 'ম্যাসাজার'],
    brand: 'Mehnaj Care',
    primary_image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-fc-pnk', sku: 'MC-FC-PNK', name_en: 'Baby Pink Silicone', name_bn: 'বেবি পিঙ্ক সিলিকন', price: 990, original_price: 1550, stock: 30, is_default: true },
      { id: 'v-fc-lbl', sku: 'MC-FC-LBL', name_en: 'Sky Blue Silicone', name_bn: 'স্কাই ব্লু সিলিকন', price: 990, original_price: 1550, stock: 18 }
    ],
    is_featured: false,
    is_active: true,
    low_stock_threshold: 5,
    rating: 4.7,
    reviews_count: 38,
    sales_count: 140,
    created_at: '2026-08-11T12:00:00Z'
  },

  // 6. MOTHER AND BABY
  {
    id: 'prod-mb-1',
    slug: 'ergonomic-all-in-one-baby-carrier-hipseat',
    title_en: 'Ergonomic 6-in-1 Baby Carrier with Non-Slip Hip Seat',
    title_bn: 'এরগনোমিক ৬-ইন-১ বেবি ক্যারিয়ার ও নন-স্লিপ হিপসিট',
    description_en: 'Designed for baby comfort (0-36 months, 3.5 to 20kg). Features breathable 3D air mesh, EPP shock-absorbing cushioned hip seat, lumbar back support, and detachable front windproof panel.',
    description_bn: 'নবজাতক থেকে ৩ বছর বয়সী শিশুর জন্য আরামদায়ক ৬-ইন-১ বেবি ক্যারিয়ার। মেরুদণ্ডের চাপ কমাতে কুশনযুক্ত হিপসিট ও থ্রিডি এয়ার মেশ ভেন্টিলেশন সম্বলিত।',
    features_en: [
      '6 Multi-functional Carrying Positions (Front Inward, Outward, Back, Hip)',
      'EPP Lightweight Shock Absorption Hip Seat (Relieves Back Strain)',
      'Breathable 3D Honeycomb Mesh Fabric for Bangladesh Climate',
      'Safety Buckles Tested for up to 25kg Weight Capacity'
    ],
    features_bn: [
      '৬টি ভিন্ন স্টাইলে শিশুকে আরামদায়কভাবে বহনের সুবিধা',
      'ইপিপি শক অ্যাবসর্বার হিপ সিট যা কোমরের ব্যথা কমায়',
      'গরমেও আরামদায়ক ৩ডি হানিকম্ব ভেন্টিলেশন ফেব্রিক',
      '২৫ কেজি পর্যন্ত লোড নিতে সক্ষম মজবুত সিকিউরিটি লক'
    ],
    category_id: 'cat-mother-baby',
    keywords: ['baby', 'carrier', 'hipseat', 'mother', 'infant', 'baby care', 'বেবি ক্যারিয়ার', 'শিশু'],
    brand: 'BabyComfort',
    primary_image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-bc-grn', sku: 'BC-CAR-NVY', name_en: 'Royal Navy Blue Mesh', name_bn: 'রয়্যাল নেভি ব্লু মেশ', price: 1950, original_price: 2750, stock: 20, is_default: true },
      { id: 'v-bc-pnk', sku: 'BC-CAR-GRY', name_en: 'Neutral Heather Grey', name_bn: 'নিউট্রাল হিদার গ্রে', price: 1950, original_price: 2750, stock: 15 }
    ],
    is_featured: true,
    is_active: true,
    low_stock_threshold: 5,
    rating: 4.9,
    reviews_count: 92,
    sales_count: 280,
    created_at: '2026-08-06T09:00:00Z'
  },
  {
    id: 'prod-mb-2',
    slug: 'electric-breast-pump-rechargeable-painless',
    title_en: 'Painless Electric Breast Pump with LED Touch Display & Memory',
    title_bn: 'পেইনলেস রিচার্জেবল ইলেকট্রিক ব্রেস্ট পাম্প (এলইডি টাচ ডিসপ্লে)',
    description_en: 'Ultra-quiet hospital-grade electric breast pump with massage and express stimulation modes. Features 9 suction levels, soft silicone petals, USB Type-C charging, and anti-backflow closed system.',
    description_bn: 'নতুন মায়েদের সুবিধার্থে আরামদায়ক ও ব্যথাহীন ইলেকট্রিক ব্রেস্ট পাম্প। ৯টি সাকশন লেভেল, এলইডি টাচ ডিসপ্লে এবং সহজে টাইপ-সি চার্জিং সুবিধা।',
    features_en: [
      '3 Modes (Massage, Expression, Bionic) with 9 Suction Levels',
      'Food Grade BPA-Free Silicone Flange (Gentle on Skin)',
      'Anti-backflow Closed Valve System Prevents Contamination',
      'Built-in 1200mAh Battery for Wireless Portability'
    ],
    features_bn: [
      'ম্যাসাজ ও পাম্পিং ৩টি মোড সহ ৯টি পাওয়ার লেভেল',
      '১০০% ফুড গ্রেড বিপিএ-মুক্ত নিরাপদ সিলিকন',
      'অ্যান্টি-ব্যাকফ্লো নকশা যা দুধের বিশুদ্ধতা বজায় রাখে',
      '১২০০ এমএএইচ রিচার্জেবল ব্যাটারি'
    ],
    category_id: 'cat-mother-baby',
    keywords: ['breast pump', 'baby', 'mother', 'feeding', 'electric pump', 'মা ও শিশু', 'ব্রেস্ট পাম্প'],
    brand: 'Momease',
    primary_image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    variants: [
      { id: 'v-bp-std', sku: 'ME-BP-TOUCH', name_en: 'Touch LED Model (with 180ml Bottle)', name_bn: 'টাচ এলইডি মডেল (১৮০ মিলি বোতল সহ)', price: 2350, original_price: 3200, stock: 16, is_default: true }
    ],
    is_featured: false,
    is_active: true,
    low_stock_threshold: 4,
    rating: 4.8,
    reviews_count: 67,
    sales_count: 215,
    created_at: '2026-08-09T16:00:00Z'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord-101',
    order_number: 'MHJ-2026-9001',
    user_id: 'usr-1',
    name: 'Mahmudul Hasan',
    phone: '01712345678',
    district: 'Dhaka',
    upazila: 'Mirpur',
    address: 'House 12, Road 4, Block D, Mirpur-12',
    area_type: 'dhaka',
    notes: 'Please call before delivery. Office hours preferred.',
    items: [
      {
        productId: 'prod-cloth-1',
        variantId: 'v-p1-42',
        title_en: 'Royal Heritage Embroidered Premium Cotton Panjabi',
        title_bn: 'রয়্যাল হেরিটেজ এমব্রয়ডারি প্রিমিয়াম কটন পাঞ্জাবি',
        variant_name_en: 'Navy Blue - Size 42 (L)',
        variant_name_bn: 'নেভি ব্লু - সাইজ ৪২ (লার্জ)',
        sku: 'MC-PANJ-NVY-42',
        price: 1850,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 1850,
    shipping_fee: 70,
    discount_amount: 100,
    coupon_code: 'WELCOME100',
    total_amount: 1820,
    order_status: 'shipped',
    payment_method: 'cod',
    payment_status: 'unpaid',
    courier: 'Steadfast',
    courier_consignment_id: 'ST-MHJ-884910',
    dispatch_date: '2026-08-26T14:30:00Z',
    purchase_tracked: true,
    admin_notes: 'Customer confirmed order on call. Handed over to Steadfast rider.',
    status_timeline: [
      {
        status: 'pending',
        timestamp: '2026-08-25T10:15:00Z',
        note: 'Order placed via Cash on Delivery'
      },
      {
        status: 'confirmed',
        timestamp: '2026-08-25T11:00:00Z',
        note: 'Support team confirmed delivery address via phone call'
      },
      {
        status: 'shipped',
        timestamp: '2026-08-26T14:30:00Z',
        note: 'Dispatched with Steadfast Courier (Consignment: ST-MHJ-884910)'
      }
    ],
    created_at: '2026-08-25T10:15:00Z'
  },
  {
    id: 'ord-102',
    order_number: 'MHJ-2026-9002',
    user_id: 'usr-2',
    name: 'Sadia Rahman',
    phone: '01819876543',
    district: 'Chittagong',
    upazila: 'Kotwali',
    address: 'Flat 3A, Green Tower, Jamalkhan Road',
    area_type: 'outside_dhaka',
    notes: 'Fragile kitchen blender item, handle with care.',
    items: [
      {
        productId: 'prod-kitch-1',
        variantId: 'v-sc-red',
        title_en: 'Silver Crest 4500W Heavy Duty Multi-Speed Food Blender & Grinder',
        title_bn: 'সিলভার ক্রেস্ট ৪৫০০ ওয়াট হেভি ডিউটি মাল্টি-স্পিড ব্লেন্ডার ও গ্রাইন্ডার',
        variant_name_en: 'Crimson Red (2L Jar)',
        variant_name_bn: 'ক্রিমসন রেড (২ লিটার জার)',
        sku: 'SC-BLD-RED',
        price: 2890,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&auto=format&fit=crop&q=80'
      }
    ],
    subtotal: 2890,
    shipping_fee: 150,
    discount_amount: 0,
    total_amount: 3040,
    order_status: 'pending',
    payment_method: 'cod',
    payment_status: 'unpaid',
    courier: 'Steadfast',
    purchase_tracked: true,
    status_timeline: [
      {
        status: 'pending',
        timestamp: '2026-08-27T06:45:00Z',
        note: 'Order placed by customer via Cash On Delivery'
      }
    ],
    created_at: '2026-08-27T06:45:00Z'
  }
];

export const initialCoupons: Coupon[] = [
  {
    id: 'c-1',
    code: 'WELCOME100',
    discount_type: 'fixed',
    discount_value: 100,
    min_spend: 1500,
    is_active: true,
    description_en: '৳100 flat discount for your order above ৳1,500',
    description_bn: '১,৫০০ টাকার অর্ডারে ১০০ টাকা সরাসরি ডিসকাউন্ট'
  },
  {
    id: 'c-2',
    code: 'MEHNAJ10',
    discount_type: 'percent',
    discount_value: 10,
    min_spend: 3000,
    is_active: true,
    description_en: '10% discount on orders above ৳3,000 (Max ৳500)',
    description_bn: '৩,০০০ টাকার কেনাকাটায় ১০% পর্যন্ত মূল্যছাড়'
  },
  {
    id: 'c-3',
    code: 'EID2026',
    discount_type: 'fixed',
    discount_value: 250,
    min_spend: 4000,
    is_active: true,
    description_en: '৳250 special festival savings on ৳4,000+',
    description_bn: '৪,০০০ টাকার বেশি কেনাকাটায় ২৫০ টাকা উৎসব বোনাস'
  }
];

export const initialShippingSettings: ShippingSettings = {
  dhaka_fee: 70,
  outside_dhaka_fee: 150,
  free_shipping_threshold: 0
};

export const initialSiteSettings: SiteSettings = {
  site_name: 'MehnajMart',
  tagline_en: 'Quality Shopping Across Bangladesh | Cash on Delivery',
  tagline_bn: 'গুণগত পণ্য ও নির্ভরযোগ্য ক্যাশ অন ডেলিভারি শপিং',
  hotline: '01577686999',
  whatsapp_number: '01577686999',
  support_email: 'mehnajmart@gmail.com',
  office_address_en: '',
  office_address_bn: '',
  steadfast_enabled: true,
  facebook_url: 'https://www.facebook.com/share/1X14b7NztN/',
  instagram_url: 'https://instagram.com/mehnajmart',
  youtube_url: 'https://youtube.com/@mehnajmart',
  revenue_metric_mode: 'delivered_only'
};

// Initial Single Super Admin Account
export const initialAdmins: AdminAccount[] = [
  {
    id: 'adm-super-1',
    name: 'Madurjo Super Admin',
    username: 'madurjo0099',
    email: 'madurjo2013@gmail.com',
    password: 'Madurjo#99Sec!2026',
    role: 'super_admin',
    is_active: true,
    created_at: '2026-08-01T00:00:00Z',
    last_login: '2026-08-27T07:00:00Z'
  }
];

export const initialUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Mahmudul Hasan',
    username: 'mahmudul',
    phone: '01712345678',
    email: 'mahmudul@example.com',
    password: 'Customer#2026',
    district: 'Dhaka',
    upazila: 'Mirpur',
    address: 'House 12, Road 4, Block D, Mirpur-12',
    area_type: 'dhaka',
    created_at: '2026-08-01T10:00:00Z',
    is_blocked: false,
    role: 'customer'
  },
  {
    id: 'usr-2',
    name: 'Sadia Rahman',
    username: 'sadia',
    phone: '01819876543',
    email: 'sadia@example.com',
    password: 'Customer#2026',
    district: 'Chittagong',
    upazila: 'Kotwali',
    address: 'Flat 3A, Green Tower, Jamalkhan Road',
    area_type: 'outside_dhaka',
    created_at: '2026-08-10T12:30:00Z',
    is_blocked: false,
    role: 'customer'
  }
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    question_en: 'How does Cash on Delivery (COD) work at MehnajMart?',
    question_bn: 'মেহনাজমর্টে ক্যাশ অন ডেলিভারি (COD) কীভাবে কাজ করে?',
    answer_en: 'You place your order without any advance payment. Our customer support will call your hotline/mobile to confirm your delivery address. When Steadfast Courier delivers the parcel to your doorstep, inspect the package and hand over cash to the delivery rider.',
    answer_bn: 'কোনো অগ্রিম পেমেন্ট ছাড়াই আপনি অর্ডার করতে পারবেন। আমাদের প্রতিনিধি ফোন করে ঠিকানা নিশ্চিত করবেন। স্টেডফাস্ট কুরিয়ারের ডেলিভারিম্যান পার্সেল নিয়ে পৌঁছালে আপনি পণ্য দেখে নির্ধারিত টাকা পরিশোধ করবেন।',
    category: 'Ordering & Payment'
  },
  {
    id: 'faq-2',
    question_en: 'What are the delivery times inside and outside Dhaka?',
    question_bn: 'ঢাকা ও ঢাকার বাইরে ডেলিভারি পেতে কত সময় লাগে?',
    answer_en: 'Inside Dhaka City: 24 to 48 hours (৳70). Outside Dhaka & nationwide across all 64 districts: 48 to 72 hours (৳150) via Steadfast Express.',
    answer_bn: 'ঢাকা সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টা (৳৭০) এবং ঢাকার বাইরে দেশের সকল ৬৪ জেলায় ৪৮ থেকে ৭২ ঘণ্টার (৳১৫০) মধ্যে স্টেডফাস্ট এক্সপ্রেসের মাধ্যমে পৌঁছে দেওয়া হয়।',
    category: 'Delivery'
  },
  {
    id: 'faq-3',
    question_en: 'What is the return and replacement policy?',
    question_bn: 'রিটার্ন ও রিপ্লেসমেন্ট নীতিমালা কী?',
    answer_en: 'We provide a 7-day official replacement warranty for any manufacturing defect or incorrect item. Simply call our hotline 01577686999 or WhatsApp with an unboxing video.',
    answer_bn: 'পণ্য পাওয়ার পর কোনো ত্রুটি বা ভুল পণ্য পেলে ৭ দিনের মধ্যে আমাদের হটলাইন 01577686999 অথবা হোয়াটসঅ্যাপে যোগাযোগ করলে দ্রুত রিপ্লেসমেন্ট প্রদান করা হয়।',
    category: 'Warranty & Returns'
  },
  {
    id: 'faq-4',
    question_en: 'How can I track my Steadfast Courier consignment?',
    question_bn: 'স্টেডফাস্ট কুরিয়ারের কনসাইনমেন্ট কীভাবে ট্র্যাক করব?',
    answer_en: 'Go to the "Track Order" page from our top navigation bar, enter your Order Number (e.g. MHJ-2026-9001) and phone number. You will instantly see the tracking timeline and Steadfast Consignment ID.',
    answer_bn: 'আমাদের ওয়েবসাইটের "Track Order" পেজে গিয়ে আপনার অর্ডার নম্বর এবং মোবাইল নম্বর লিখলেই তাৎক্ষণিকভাবে কুরিয়ার স্ট্যাটাস ও ট্র্যাকিং নম্বর দেখতে পাবেন।',
    category: 'Tracking'
  }
];

export const initialSupportMessages: SupportMessage[] = [
  {
    id: 'sup-1',
    name: 'Tanvir Ahmed',
    phone: '01799887766',
    email: 'tanvir@example.com',
    subject: 'Inquiry about Panjabi sizing chart',
    message: 'Hello, what is the chest measurement for Size 42 in the Royal Heritage Panjabi?',
    status: 'resolved',
    reply: 'Hello Tanvir, Size 42 features a 44-inch chest and 42-inch length. It offers a comfortable regular fit.',
    created_at: '2026-08-25T11:00:00Z'
  },
  {
    id: 'sup-2',
    name: 'Farzana Akter',
    phone: '01655443322',
    email: 'farzana@example.com',
    subject: 'Silver Crest Blender Delivery in Sylhet Sadar',
    message: 'Can you deliver the Silver Crest 4500W blender before Friday in Sylhet?',
    status: 'new',
    created_at: '2026-08-27T02:15:00Z'
  }
];
