import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DISTRICTS } from '../utils/i18n';
import { AreaType } from '../types';
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  Share2,
  Play,
  Heart,
  HelpCircle,
  Clock,
  PhoneCall,
  Lock,
  Zap,
  MapPin,
  User as UserIcon
} from 'lucide-react';

interface ProductDetailViewProps {
  slug: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ slug }) => {
  const {
    products,
    categories,
    navigate,
    lang,
    t,
    formatMoney,
    addToCart,
    createOrder,
    shippingSettings,
    currentUser,
    logDataLayerEvent
  } = useApp();

  const product = products.find(p => p.slug === slug);

  const [selectedVariant, setSelectedVariant] = useState(
    product ? (product.variants.find(v => v.is_default) || product.variants[0]) : null
  );
  const [selectedImage, setSelectedImage] = useState(
    product ? product.primary_image : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'video'>('features');
  const [copied, setCopied] = useState(false);

  // Quick Direct COD Order form state
  const [quickName, setQuickName] = useState(currentUser?.name || '');
  const [quickPhone, setQuickPhone] = useState(currentUser?.phone || '');
  const [quickDistrict, setQuickDistrict] = useState(currentUser?.district || 'Dhaka');
  const [quickAddress, setQuickAddress] = useState(currentUser?.address || '');
  const [quickFormError, setQuickFormError] = useState('');
  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);

  // Update selection if slug changes
  useEffect(() => {
    if (product) {
      const defVariant = product.variants.find(v => v.is_default) || product.variants[0];
      setSelectedVariant(defVariant);
      setSelectedImage(product.primary_image);
      setQuantity(1);

      // Fire GTM dataLayer view_item event (A12 requirement)
      logDataLayerEvent('view_item', {
        ecommerce: {
          currency: 'BDT',
          value: defVariant.price,
          items: [
            {
              item_id: defVariant.sku,
              item_name: product.title_en,
              item_category: product.category_id,
              price: defVariant.price,
              quantity: 1,
              item_variant: defVariant.name_en
            }
          ]
        }
      });
    }
  }, [slug, product]);

  if (!product || !selectedVariant) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Product Not Found</h2>
        <p className="text-sm text-zinc-500">The product you are looking for does not exist or has been removed.</p>
        <button
          onClick={() => navigate({ view: 'shop' })}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          {t('start_shopping')}
        </button>
      </div>
    );
  }

  const hasDiscount = selectedVariant.original_price && selectedVariant.original_price > selectedVariant.price;
  const discountPercent = hasDiscount
    ? Math.round(((selectedVariant.original_price! - selectedVariant.price) / selectedVariant.original_price!) * 100)
    : 0;

  const isLowStock = selectedVariant.stock > 0 && selectedVariant.stock <= product.low_stock_threshold;
  const isOutOfStock = selectedVariant.stock <= 0;

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category_id === product.category_id && p.is_active)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title_en,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Quick COD order handler
  const handleQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setQuickFormError('');

    if (!quickName.trim()) {
      setQuickFormError(lang === 'bn' ? 'অনুগ্রহ করে আপনার নাম লিখুন' : 'Please enter your name');
      return;
    }

    const cleanPhone = quickPhone.trim().replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11 || (!cleanPhone.startsWith('01') && !cleanPhone.startsWith('8801'))) {
      setQuickFormError(lang === 'bn' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমনঃ 017XXXXXXXX)' : 'Please enter a valid 11-digit phone number');
      return;
    }

    if (!quickAddress.trim()) {
      setQuickFormError(lang === 'bn' ? 'ডেলিভারির পূর্ণ ঠিকানা লিখুন (রোড/বাড়ি/এলাকা)' : 'Please enter your full delivery address');
      return;
    }

    setIsQuickSubmitting(true);

    try {
      addToCart(product, selectedVariant, quantity, false);
      const isDhaka = quickDistrict.toLowerCase() === 'dhaka';
      const created = createOrder({
        name: quickName.trim(),
        phone: cleanPhone,
        district: quickDistrict,
        upazila: '',
        address: quickAddress.trim(),
        area_type: isDhaka ? 'dhaka' : 'outside_dhaka'
      });

      navigate({ view: 'order_success', orderNumber: created.order_number });
    } catch (err) {
      console.error(err);
      setQuickFormError('Failed to place order. Please try again.');
    } finally {
      setIsQuickSubmitting(false);
    }
  };

  const isDhakaArea = quickDistrict.toLowerCase() === 'dhaka';
  const quickShippingFee = isDhakaArea ? shippingSettings.dhaka_fee : shippingSettings.outside_dhaka_fee;
  const quickTotal = (selectedVariant?.price || 0) * quantity + quickShippingFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-zinc-500 dark:text-zinc-400">
        <button onClick={() => navigate({ view: 'home' })} className="hover:text-indigo-600">
          {t('home')}
        </button>
        <span>/</span>
        <button onClick={() => navigate({ view: 'shop' })} className="hover:text-indigo-600">
          {t('shop')}
        </button>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-xs">
          {lang === 'bn' ? product.title_bn : product.title_en}
        </span>
      </nav>

      {/* Main Product Section (2-Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <img
              src={selectedImage}
              alt={product.title_en}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Badges */}
            {hasDiscount && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold shadow-md">
                -{discountPercent}% OFF
              </span>
            )}

            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-200 backdrop-blur shadow-md hover:scale-105 transition"
              title="Share Product"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && (
              <span className="absolute top-16 right-4 px-2 py-1 bg-zinc-900 text-white text-[10px] rounded shadow">
                Link Copied!
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                  selectedImage === img
                    ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Video placement: below_images */}
          {product.video_enabled && product.video_url && product.video_placement === 'below_images' && (
            <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900 dark:text-white">
                <Play className="w-4 h-4 text-indigo-600" />
                <span>{product.video_title || t('watch_video')}</span>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  src={product.video_url}
                  title="Product Video"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        {/* Right: Product Info & Purchase (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {product.brand}
              </span>
              <div className="flex items-center space-x-1.5 text-xs text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-zinc-900 dark:text-white">{product.rating}</span>
                <span className="text-zinc-400">({product.reviews_count} {t('customer_reviews')})</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white leading-snug">
              {lang === 'bn' ? product.title_bn : product.title_en}
            </h1>

            <p className="text-xs text-zinc-500 font-mono">
              {t('sku')}: <span className="text-zinc-800 dark:text-zinc-200 font-semibold">{selectedVariant.sku}</span>
            </p>
          </div>

          {/* Pricing Block */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-between">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  {formatMoney(selectedVariant.price)}
                </span>
                {hasDiscount && (
                  <span className="text-base text-zinc-400 line-through">
                    {formatMoney(selectedVariant.original_price!)}
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                ✓ Cash on Delivery available at doorstep
              </p>
            </div>

            {/* Stock Status Badge */}
            <div>
              {isOutOfStock ? (
                <span className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
                  {t('out_of_stock')}
                </span>
              ) : isLowStock ? (
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold inline-flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{t('low_stock_warning')}</span>
                  </span>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{selectedVariant.stock} left in stock</p>
                </div>
              ) : (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold inline-flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t('in_stock')}</span>
                </span>
              )}
            </div>
          </div>

          {/* Variants Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('variant')}: <span className="text-zinc-900 dark:text-white font-semibold">
                {lang === 'bn' ? selectedVariant.name_bn : selectedVariant.name_en}
              </span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                        : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                    }`}
                  >
                    <span className="font-semibold text-xs text-zinc-900 dark:text-white">
                      {lang === 'bn' ? variant.name_bn : variant.name_en}
                    </span>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">
                        {formatMoney(variant.price)}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {variant.stock > 0 ? `${variant.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Action Buttons */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-4">
              <label className="text-xs font-bold uppercase text-zinc-400">
                {t('quantity')}
              </label>

              <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-zinc-900 dark:text-white font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                  disabled={quantity >= selectedVariant.stock || isOutOfStock}
                  className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                id="product-add-to-cart-btn"
                disabled={isOutOfStock}
                onClick={() => addToCart(product, selectedVariant, quantity, false)}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition disabled:opacity-40 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t('add_to_cart')}</span>
              </button>

              <button
                id="product-buy-now-btn"
                disabled={isOutOfStock}
                onClick={() => addToCart(product, selectedVariant, quantity, true)}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition disabled:opacity-40 flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <span>{t('buy_now')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Delivery & Warranty Checklist */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
            <div className="flex items-center space-x-2.5">
              <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                <strong>Steadfast Express:</strong> 24-48h (Inside Dhaka ৳70), 48-72h (Outside Dhaka ৳150)
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>7 Days Replacement Warranty</strong> for any factory fault.
              </span>
            </div>
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <strong>Zero Advance Payment:</strong> Pay 100% Cash on Delivery when you receive package.
              </span>
            </div>
          </div>

          {/* Instant 1-Click Cash on Delivery Order Box (No login or signup required) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-50/70 via-white to-emerald-50/50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 border-2 border-indigo-500/30 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center space-x-1.5">
                    <span>{lang === 'bn' ? 'সরাসরি ক্যাশ অন ডেলিভারি অর্ডার' : 'Direct 1-Click COD Order'}</span>
                  </h3>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ {lang === 'bn' ? 'লগইন বা সাইনআপ ছাড়া সহজেই অর্ডার করুন' : 'No sign-up or login required'}
                  </p>
                </div>
              </div>

              <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold">
                <ShieldCheck className="w-3 h-3" />
                <span>Guest COD Active</span>
              </span>
            </div>

            <form onSubmit={handleQuickOrder} className="space-y-3.5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'আপনার নাম' : 'Your Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? 'যেমনঃ মো: রহিম উদ্দিন' : 'e.g. John Doe'}
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Phone'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* District & Full Address */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1 sm:col-span-1">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'জেলা' : 'District'} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={quickDistrict}
                    onChange={(e) => setQuickDistrict(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  >
                    {BANGLADESH_DISTRICTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    {lang === 'bn' ? 'পূর্ণ ঠিকানা (বাসা/রোড/এলাকা)' : 'Full Delivery Address'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'bn' ? 'বাসা নং, রোড, থানা/উপজেলা' : 'House no, Road, Area'}
                    value={quickAddress}
                    onChange={(e) => setQuickAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Live Order Pricing Summary in COD Box */}
              <div className="p-3 rounded-2xl bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 text-xs space-y-1.5">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>{lang === 'bn' ? 'পণ্য মূল্য' : 'Item Price'} ({quantity}x):</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">{formatMoney(selectedVariant.price * quantity)}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>{lang === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Charge'} ({isDhakaArea ? 'ঢাকার ভিতরে' : 'ঢাকার বাইরে'}):</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">+{formatMoney(quickShippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-zinc-900 dark:text-white pt-1.5 border-t border-zinc-100 dark:border-zinc-700">
                  <span>{lang === 'bn' ? 'সর্বমোট প্রদেয় টাকা (ক্যাশ অন ডেলিভারি)' : 'Payable on Delivery'}:</span>
                  <span className="text-base text-indigo-600 dark:text-indigo-400 font-black">{formatMoney(quickTotal)}</span>
                </div>
              </div>

              {quickFormError && (
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-600 dark:text-rose-300 font-medium">
                  {quickFormError}
                </div>
              )}

              {/* Direct Submit Button */}
              <button
                id="product-direct-cod-submit-btn"
                type="submit"
                disabled={isOutOfStock || isQuickSubmitting}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {isQuickSubmitting
                    ? (lang === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Placing Order...')
                    : (lang === 'bn' ? 'অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)' : 'Confirm Cash on Delivery Order')}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Tabs: Features, Description, Video */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 space-y-6">
        <div className="flex space-x-3 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 text-sm font-bold transition border-b-2 ${
              activeTab === 'features'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
            }`}
          >
            {t('features')}
          </button>

          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-sm font-bold transition border-b-2 ${
              activeTab === 'description'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
            }`}
          >
            {t('description')}
          </button>

          {product.video_enabled && product.video_url && (
            <button
              onClick={() => setActiveTab('video')}
              className={`pb-3 text-sm font-bold transition border-b-2 flex items-center space-x-1.5 ${
                activeTab === 'video'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{t('watch_video')}</span>
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="min-h-[160px]">
          {activeTab === 'features' && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(lang === 'bn' ? product.features_bn : product.features_en).map((feat, i) => (
                <li
                  key={i}
                  className="flex items-start space-x-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/50"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'description' && (
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 space-y-4">
              <p>{lang === 'bn' ? product.description_bn : product.description_en}</p>
            </div>
          )}

          {activeTab === 'video' && product.video_enabled && product.video_url && (
            <div className="max-w-3xl mx-auto aspect-video rounded-2xl overflow-hidden bg-black shadow-xl">
              <iframe
                src={product.video_url}
                title="Product Video"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-10 space-y-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            {t('related_products')}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relProd) => {
              const defV = relProd.variants[0];
              return (
                <div
                  key={relProd.id}
                  onClick={() => navigate({ view: 'product', slug: relProd.slug })}
                  className="group bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden p-3 space-y-2 cursor-pointer hover:shadow-md hover:border-indigo-400 transition"
                >
                  <div className="aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    <img
                      src={relProd.primary_image}
                      alt={relProd.title_en}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white line-clamp-1">
                    {lang === 'bn' ? relProd.title_bn : relProd.title_en}
                  </h4>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{formatMoney(defV.price)}</span>
                    <span className="text-[10px] text-zinc-400">{relProd.brand}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
