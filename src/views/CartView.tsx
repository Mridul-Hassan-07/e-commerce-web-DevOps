import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  Truck,
  ShieldCheck,
  PackageX,
  ChevronLeft
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    formatMoney,
    navigate,
    lang,
    t,
    shippingSettings
  } = useApp();

  const freeShippingThreshold = shippingSettings.free_shipping_threshold || 0;
  const hasFreeShipping = freeShippingThreshold > 0;
  const progressToFreeShipping = hasFreeShipping ? Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100)) : 0;
  const amountNeeded = hasFreeShipping ? Math.max(0, freeShippingThreshold - cartSubtotal) : 0;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
            {t('empty_cart_title')}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto">
            {t('empty_cart_desc')}
          </p>
        </div>
        <button
          onClick={() => navigate({ view: 'shop' })}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/20 transition cursor-pointer"
        >
          {t('start_shopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate({ view: 'shop' })}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            {t('shopping_cart')} ({cart.length})
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-500 hover:underline font-medium flex items-center space-x-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? 'কার্ট খালি করুন' : 'Clear All'}</span>
        </button>
      </div>

      {/* Free Shipping Progress Alert or Cash on Delivery Reassurance */}
      {hasFreeShipping ? (
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-900 dark:text-indigo-200">
            <span className="flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>
                {amountNeeded === 0
                  ? (lang === 'bn' ? 'অভিনন্দন! আপনি ফ্রি ডেলিভারির যোগ্য।' : 'You have unlocked Free Nationwide Delivery!')
                  : (lang === 'bn'
                    ? `ফ্রি ডেলিভারি পেতে আর মাত্র ${formatMoney(amountNeeded)} টাকার পণ্য যোগ করুন`
                    : `Add ${formatMoney(amountNeeded)} more for Free Nationwide Delivery`)}
              </span>
            </span>
            <span>{progressToFreeShipping}%</span>
          </div>
          <div className="w-full bg-indigo-200 dark:bg-indigo-900 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/60 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
          <span className="flex items-center space-x-2 font-semibold">
            <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {lang === 'bn'
                ? `সমগ্র বাংলাদেশে ক্যাশ অন ডেলিভারি (ঢাকার মধ্যে ৳${shippingSettings.dhaka_fee}, ঢাকার বাইরে ৳${shippingSettings.outside_dhaka_fee})`
                : `Nationwide Cash on Delivery available (Inside Dhaka ৳${shippingSettings.dhaka_fee}, Outside Dhaka ৳${shippingSettings.outside_dhaka_fee})`}
            </span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
            Steadfast Express
          </span>
        </div>
      )}

      {/* Grid: Cart Items & Order Summary Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.variantId}
              className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              {/* Product Info & Thumbnail */}
              <div className="flex items-center space-x-4">
                <div
                  onClick={() => navigate({ view: 'product', slug: item.product.slug })}
                  className="w-20 h-20 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 cursor-pointer"
                >
                  <img
                    src={item.product.primary_image}
                    alt={item.product.title_en}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h3
                    onClick={() => navigate({ view: 'product', slug: item.product.slug })}
                    className="font-bold text-sm text-zinc-900 dark:text-white hover:text-indigo-600 cursor-pointer line-clamp-1"
                  >
                    {lang === 'bn' ? item.product.title_bn : item.product.title_en}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    {lang === 'bn' ? item.variant.name_bn : item.variant.name_en}
                  </p>
                  <p className="text-xs font-mono text-zinc-400">
                    SKU: {item.variant.sku}
                  </p>
                  <p className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                    {formatMoney(item.variant.price)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
                {/* Stepper */}
                <div className="flex items-center rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-1">
                  <button
                    onClick={() => updateCartQuantity(item.variantId, item.quantity - 1)}
                    className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-white cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.variantId, item.quantity + 1)}
                    disabled={item.quantity >= item.variant.stock}
                    className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-white disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-sm font-black text-zinc-900 dark:text-white">
                    {formatMoney(item.variant.price * item.quantity)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.variantId)}
                  className="p-2 text-zinc-400 hover:text-rose-500 transition cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-sm">
            <h2 className="font-extrabold text-base text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
              {t('order_summary')}
            </h2>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{t('subtotal')}</span>
                <span className="font-bold text-zinc-900 dark:text-white">{formatMoney(cartSubtotal)}</span>
              </div>

              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{t('shipping_estimate')}</span>
                <span className="text-indigo-600 font-semibold">
                  {lang === 'bn' ? 'চেকআউটে নির্ধারিত হবে (৳৭০/৳১৫০)' : 'Calculated at checkout'}
                </span>
              </div>

              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{t('payment_method')}</span>
                <span className="font-medium text-emerald-600">Cash on Delivery</span>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-sm font-bold text-zinc-900 dark:text-white">{t('total_amount')}</span>
                <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                  {formatMoney(cartSubtotal)}
                </span>
              </div>

              <button
                id="cart-proceed-checkout-btn"
                onClick={() => navigate({ view: 'checkout' })}
                className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <span>{t('proceed_to_checkout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-500 space-y-1.5">
            <p className="flex items-center space-x-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>100% Risk Free Cash on Delivery in Bangladesh</span>
            </p>
            <p>You only pay when Steadfast Courier delivers the parcel to your doorstep.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
