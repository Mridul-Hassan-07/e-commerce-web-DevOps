import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Zap,
  ShoppingBag,
  Star,
  CheckCircle2,
  ChevronRight,
  Package,
  Headphones,
  Watch,
  Flame,
  Plus,
  Clock,
  Sparkles
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    products,
    categories,
    navigate,
    lang,
    t,
    formatMoney,
    addToCart,
    faqs
  } = useApp();

  const featuredProducts = products.filter(p => p.is_featured && p.is_active);
  const newArrivals = products.filter(p => p.is_active).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-zinc-900 to-black text-white pt-8 pb-16 sm:py-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl sm:rounded-3xl max-w-7xl mx-auto shadow-2xl">
        {/* Glow ambient circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'bn' ? 'ক্যাশ অন ডেলিভারিতে সারাদেশে ডেলিভারি' : 'Nationwide Cash on Delivery via Steadfast Express'}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            {t('hero_title')}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              id="hero-explore-products-btn"
              onClick={() => navigate({ view: 'shop' })}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t('explore_products')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-track-order-btn"
              onClick={() => navigate({ view: 'order_track' })}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 backdrop-blur transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>{t('track_your_parcel')}</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-zinc-300 border-t border-white/10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>COD Guaranteed</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>7 Days Return</span>
            </div>
            <div className="flex items-center justify-center space-x-1.5">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>24-48h Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              {t('featured_categories')}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {lang === 'bn' ? 'পছন্দের ক্যাটাগরি থেকে ব্রাউজ করুন' : 'Explore by top product categories'}
            </p>
          </div>
          <button
            onClick={() => navigate({ view: 'shop' })}
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
          >
            <span>{t('view_all')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.filter(c => !c.parent_id).map((cat) => {
            const subCats = categories.filter(c => c.parent_id === cat.id);
            return (
              <div
                key={cat.id}
                onClick={() => navigate({ view: 'shop', categorySlug: cat.slug })}
                className="group relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 p-3 sm:p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:border-indigo-400 transition"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden mb-2.5 bg-white dark:bg-zinc-900 p-2 shadow-xs group-hover:scale-105 transition-transform">
                  <img
                    src={cat.image}
                    alt={cat.name_en}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                  {lang === 'bn' ? cat.name_bn : cat.name_en}
                </h3>
                {subCats.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap justify-center gap-1">
                    {subCats.map(sub => (
                      <span
                        key={sub.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate({ view: 'shop', categorySlug: cat.slug, subcategorySlug: sub.slug });
                        }}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white transition font-medium"
                      >
                        {lang === 'bn' ? sub.name_bn : sub.name_en}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                {t('featured_products')}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {lang === 'bn' ? 'সর্বাধিক বিক্রিত ও জনপ্রিয় গ্যাজেট' : 'Top trending gadgets with Cash on Delivery'}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate({ view: 'shop' })}
            className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
          >
            <span>{t('view_all')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Grid: Desktop 3-4 col, Mobile vertical cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => {
            const defaultVariant = product.variants.find(v => v.is_default) || product.variants[0];
            const hasDiscount = defaultVariant.original_price && defaultVariant.original_price > defaultVariant.price;
            const discountPercent = hasDiscount
              ? Math.round(((defaultVariant.original_price! - defaultVariant.price) / defaultVariant.original_price!) * 100)
              : 0;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-500/40 transition-all"
              >
                {/* Image & Badges */}
                <div
                  onClick={() => navigate({ view: 'product', slug: product.slug })}
                  className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
                >
                  <img
                    src={product.primary_image}
                    alt={product.title_en}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount Badge */}
                  {hasDiscount && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-bold shadow-xs">
                      -{discountPercent}%
                    </span>
                  )}

                  {/* COD badge */}
                  <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-zinc-900/80 backdrop-blur text-white text-[10px] font-medium">
                    COD Available
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">{product.brand}</span>
                      <div className="flex items-center space-x-1 text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">{product.rating}</span>
                        <span className="text-zinc-400">({product.reviews_count})</span>
                      </div>
                    </div>

                    <h3
                      onClick={() => navigate({ view: 'product', slug: product.slug })}
                      className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer line-clamp-2 leading-snug"
                    >
                      {lang === 'bn' ? product.title_bn : product.title_en}
                    </h3>
                  </div>

                  {/* Price & Actions */}
                  <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <div className="flex items-baseline space-x-2 mb-3">
                      <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                        {formatMoney(defaultVariant.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-zinc-400 line-through">
                          {formatMoney(defaultVariant.original_price!)}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product, defaultVariant, 1, false)}
                        className="w-full py-2 px-2.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{t('add_to_cart')}</span>
                      </button>

                      <button
                        onClick={() => addToCart(product, defaultVariant, 1, true)}
                        className="w-full py-2 px-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center justify-center space-x-1 shadow-xs cursor-pointer"
                      >
                        <span>{lang === 'bn' ? 'অর্ডার করুন' : 'Buy Now'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Promotional Banner (Steadfast Courier Delivery Perk) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-700 text-white p-6 sm:p-10 relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider">
              {lang === 'bn' ? 'দ্রুততম ডেলিভারি সার্ভিস' : 'Steadfast Courier Partner'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              {lang === 'bn' ? 'ঢাকার ভেতরে ২৪ ঘণ্টা এবং বাইরে ৪৮ ঘণ্টায় নিশ্চিত হোম ডেলিভারি' : 'Express Doorstep Delivery Across All 64 Districts'}
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
              {lang === 'bn' ? 'পণ্য বুঝে পেয়ে রাইডারের কাছে নগদ টাকা পরিশোধ করুন। প্রতিটি অর্ডারে রয়েছে ফ্রি ট্র্যাকিং ও দ্রুত কনসাইনমেন্ট সুবিধা।' : 'Pay only after receiving your parcel. Live tracking with Steadfast consignment ID provided with every order.'}
            </p>
          </div>

          <div className="z-10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate({ view: 'shop' })}
              className="px-6 py-3 bg-white text-indigo-700 hover:bg-zinc-100 font-bold text-sm rounded-xl transition shadow-md cursor-pointer"
            >
              {t('start_shopping')}
            </button>
            <button
              onClick={() => navigate({ view: 'order_track' })}
              className="px-6 py-3 bg-indigo-900/50 hover:bg-indigo-900/80 text-white font-semibold text-sm rounded-xl border border-white/20 transition cursor-pointer"
            >
              {t('track_order')}
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            {lang === 'bn' ? 'গ্রাহকদের সন্তুষ্টি ও অভিজ্ঞতা' : 'Trusted by Thousands in Bangladesh'}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Real customer reviews for genuine products & fast Cash on Delivery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
              "Received my Kieslect Ks Pro within 24 hours in Dhanmondi. Checked the packaging thoroughly before paying cash. 100% original product!"
            </p>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-zinc-900 dark:text-white">Tanvir Hasan</p>
                <p className="text-[10px] text-zinc-400">Dhaka, Bangladesh</p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                Verified COD Buyer
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
              "Ordered Soundcore A40 from Chittagong. The Steadfast tracking was accurate and delivery was very smooth. Best customer support helpline."
            </p>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-zinc-900 dark:text-white">Sadia Rahman</p>
                <p className="text-[10px] text-zinc-400">Chittagong, Bangladesh</p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                Verified COD Buyer
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
            <div className="flex text-amber-400 space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
              "The Baseus 65W GaN charger charges my MacBook and Galaxy phone together at full speed. Super solid build and official warranty."
            </p>
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-zinc-900 dark:text-white">Mahmudul Karim</p>
                <p className="text-[10px] text-zinc-400">Sylhet, Bangladesh</p>
              </div>
              <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                Verified COD Buyer
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
            {t('faq_title')}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {lang === 'bn' ? 'ক্যাশ অন ডেলিভারি ও সার্ভিস সংক্রান্ত প্রয়োজনীয় প্রশ্ন' : 'Common questions about orders, payments & Steadfast delivery'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 transition-all"
            >
              <summary className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 cursor-pointer flex items-center justify-between list-none">
                <span>{lang === 'bn' ? faq.question_bn : faq.question_en}</span>
                <ChevronRight className="w-4 h-4 text-zinc-400 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {lang === 'bn' ? faq.answer_bn : faq.answer_en}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};
