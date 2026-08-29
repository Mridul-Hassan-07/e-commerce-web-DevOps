import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { BANGLADESH_DISTRICTS } from '../utils/i18n';
import { AreaType } from '../types';
import {
  Truck,
  ShieldCheck,
  Tag,
  CheckCircle2,
  AlertCircle,
  Lock,
  ArrowLeft,
  ShoppingBag,
  Info
} from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    createOrder,
    navigate,
    lang,
    t,
    formatMoney,
    shippingSettings,
    coupons,
    currentUser,
    logDataLayerEvent
  } = useApp();

  // Form Fields
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [district, setDistrict] = useState(currentUser?.district || 'Dhaka');
  const [upazila, setUpazila] = useState(currentUser?.upazila || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [areaType, setAreaType] = useState<AreaType>(
    currentUser?.area_type || (district === 'Dhaka' ? 'dhaka' : 'outside_dhaka')
  );
  const [notes, setNotes] = useState('');
  
  // Coupon
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync area type when district changes
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dist = e.target.value;
    setDistrict(dist);
    if (dist.toLowerCase() === 'dhaka') {
      setAreaType('dhaka');
    } else {
      setAreaType('outside_dhaka');
    }
  };

  // Fire begin_checkout GTM event on checkout load (Section A10 & A12)
  useEffect(() => {
    if (cart.length > 0) {
      logDataLayerEvent('begin_checkout', {
        ecommerce: {
          currency: 'BDT',
          value: cartSubtotal,
          items: cart.map(i => ({
            item_id: i.variant.sku,
            item_name: i.product.title_en,
            price: i.variant.price,
            quantity: i.quantity,
            item_variant: i.variant.name_en
          }))
        }
      });
    }
  }, []);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Your Cart is Empty</h2>
        <p className="text-xs text-zinc-500">Please add items to cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate({ view: 'shop' })}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          {t('start_shopping')}
        </button>
      </div>
    );
  }

  // Calculate Shipping fee and Discount
  const currentShippingFee = areaType === 'dhaka' 
    ? shippingSettings.dhaka_fee 
    : shippingSettings.outside_dhaka_fee;

  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const netTotal = Math.max(0, cartSubtotal + currentShippingFee - discountAmount);

  // Handle Coupon Apply
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

    const matched = coupons.find(
      c => c.code.toUpperCase() === couponCode.trim().toUpperCase() && c.is_active
    );

    if (!matched) {
      setCouponError(lang === 'bn' ? 'অকার্যকর কুপন কোড' : 'Invalid or expired coupon code.');
      return;
    }

    if (cartSubtotal < matched.min_spend) {
      setCouponError(
        lang === 'bn'
          ? `এই কুপন ব্যবহার করতে ন্যূনতম ${formatMoney(matched.min_spend)} টাকার অর্ডার করতে হবে`
          : `Minimum order amount for this coupon is ${formatMoney(matched.min_spend)}`
      );
      return;
    }

    let calculatedDiscount = 0;
    if (matched.discount_type === 'percent') {
      calculatedDiscount = Math.round((cartSubtotal * matched.discount_value) / 100);
      calculatedDiscount = Math.min(calculatedDiscount, 500); // cap
    } else {
      calculatedDiscount = matched.discount_value;
    }

    setAppliedCoupon({
      code: matched.code,
      discountAmount: calculatedDiscount
    });
  };

  const validate = (): boolean => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) {
      errs.name = t('name_error');
    }

    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11 || (!cleanPhone.startsWith('01') && !cleanPhone.startsWith('8801'))) {
      errs.phone = t('phone_error');
    }

    if (!address.trim()) {
      errs.address = t('address_error');
    }

    if (!district) {
      errs.district = t('district_error');
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const newOrder = createOrder({
        name: name.trim(),
        phone: phone.trim(),
        district,
        upazila: upazila.trim(),
        address: address.trim(),
        area_type: areaType,
        notes: notes.trim(),
        coupon_code: appliedCoupon?.code,
        discount_amount: discountAmount
      });

      // Redirect immediately to order success thank you page
      navigate({ view: 'order_success', orderNumber: newOrder.order_number });
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Breadcrumb & Title */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="space-y-1">
          <button
            onClick={() => navigate({ view: 'cart' })}
            className="flex items-center space-x-1 text-xs text-zinc-500 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'কার্টে ফিরে যান' : 'Back to Cart'}</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {t('checkout_title')}
          </h1>
        </div>

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4" />
          <span>{t('guest_checkout_notice')}</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Prominent Guest Checkout Notification Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start space-x-3 text-xs text-emerald-900 dark:text-emerald-200 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-extrabold text-sm">
                {lang === 'bn' ? '🟢 কোনো অ্যাকাউন্ট বা সাইন আপের প্রয়োজন নেই (গেস্ট চেকআউট সচল)' : '🟢 100% Guest Checkout — No Account or Login Required'}
              </p>
              <p className="text-emerald-700 dark:text-emerald-300 mt-0.5">
                {lang === 'bn'
                  ? 'নিচের ফর্মে শুধু আপনার নাম, মোবাইল নম্বর ও ঠিকানা দিন এবং নিশ্চিন্তে ক্যাশ অন ডেলিভারিতে অর্ডার সম্পন্ন করুন।'
                  : 'Simply enter your delivery contact details below and confirm your Cash on Delivery order.'}
              </p>
            </div>
          </div>

          {/* Step 1: Customer Information */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
            <h2 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">1</span>
              <span>{t('customer_info')}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {t('full_name')} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="checkout-name-input"
                  type="text"
                  placeholder={t('name_placeholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border ${
                    errors.name ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-700'
                  } focus:border-indigo-500 focus:outline-none`}
                />
                {errors.name && <p className="text-[11px] text-rose-500">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {t('phone_number')} <span className="text-rose-500">*</span>
                </label>
                <input
                  id="checkout-phone-input"
                  type="tel"
                  placeholder={t('phone_placeholder')}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono border ${
                    errors.phone ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-700'
                  } focus:border-indigo-500 focus:outline-none`}
                />
                {errors.phone && <p className="text-[11px] text-rose-500">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address & Area Selection */}
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
            <h2 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">2</span>
              <span>{t('shipping_address')}</span>
            </h2>

            {/* Area Type Selection Radio */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {t('area_type')} <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setAreaType('dhaka')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    areaType === 'dhaka'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                      : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="radio"
                      name="area_type"
                      checked={areaType === 'dhaka'}
                      onChange={() => setAreaType('dhaka')}
                      className="text-indigo-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">Inside Dhaka City</p>
                      <p className="text-[11px] text-zinc-500">24-48 Hours Express</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                    ৳{shippingSettings.dhaka_fee}
                  </span>
                </label>

                <label
                  onClick={() => setAreaType('outside_dhaka')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    areaType === 'outside_dhaka'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20'
                      : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="radio"
                      name="area_type"
                      checked={areaType === 'outside_dhaka'}
                      onChange={() => setAreaType('outside_dhaka')}
                      className="text-indigo-600"
                    />
                    <div>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">Outside Dhaka / Nationwide</p>
                      <p className="text-[11px] text-zinc-500">48-72 Hours Steadfast</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                    ৳{shippingSettings.outside_dhaka_fee}
                  </span>
                </label>
              </div>
            </div>

            {/* District & Upazila */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {t('district')} <span className="text-rose-500">*</span>
                </label>
                <select
                  id="checkout-district-select"
                  value={district}
                  onChange={handleDistrictChange}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                >
                  {BANGLADESH_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {t('upazila')}
                </label>
                <input
                  id="checkout-upazila-input"
                  type="text"
                  placeholder={t('upazila_placeholder')}
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Full Street Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {t('full_address')} <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="checkout-address-input"
                rows={2}
                placeholder={t('address_placeholder')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border ${
                  errors.address ? 'border-rose-500' : 'border-zinc-200 dark:border-zinc-700'
                } focus:border-indigo-500 focus:outline-none resize-none`}
              />
              {errors.address && <p className="text-[11px] text-rose-500">{errors.address}</p>}
            </div>

            {/* Order Notes */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {t('order_notes')}
              </label>
              <input
                id="checkout-notes-input"
                type="text"
                placeholder={t('notes_placeholder')}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary, Coupon & Submit (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-5 shadow-xs">
            <h2 className="font-extrabold text-base text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
              {t('order_summary')}
            </h2>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.variantId} className="flex items-center justify-between text-xs space-x-2">
                  <div className="flex items-center space-x-2.5 overflow-hidden">
                    <img
                      src={item.product.primary_image}
                      alt={item.product.title_en}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-lg object-cover bg-zinc-100 shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                        {lang === 'bn' ? item.product.title_bn : item.product.title_en}
                      </p>
                      <p className="text-zinc-400 text-[11px]">
                        Qty: {item.quantity} × {formatMoney(item.variant.price)}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-zinc-900 dark:text-white shrink-0">
                    {formatMoney(item.variant.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Box */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder={t('coupon_code')}
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 rounded-xl text-xs bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 uppercase font-mono focus:border-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  {t('apply_coupon')}
                </button>
              </div>

              {couponError && (
                <p className="text-[11px] text-rose-500 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{couponError}</span>
                </p>
              )}

              {appliedCoupon && (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedCoupon.code}</strong> {t('applied')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-[10px] text-rose-500 underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{t('subtotal')}</span>
                <span className="font-bold text-zinc-900 dark:text-white">{formatMoney(cartSubtotal)}</span>
              </div>

              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{t('shipping_estimate')} ({areaType === 'dhaka' ? 'Dhaka' : 'Outside Dhaka'})</span>
                <span className="font-bold text-zinc-900 dark:text-white">+{formatMoney(currentShippingFee)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>{t('discount')}</span>
                  <span>-{formatMoney(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-sm font-bold text-zinc-900 dark:text-white">{t('total_amount')}</span>
                <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                  {formatMoney(netTotal)}
                </span>
              </div>
            </div>

            {/* Payment Method Badge (COD Only) */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex items-start space-x-2.5 text-xs text-amber-900 dark:text-amber-200">
              <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{t('cod_badge_text')}</p>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-300/80 mt-0.5">
                  No advance payment needed. Hand over <strong>{formatMoney(netTotal)}</strong> to Steadfast delivery agent upon arrival.
                </p>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              id="submit-cod-order-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-sm sm:text-base shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? t('placing_order') : t('place_order_btn')}</span>
            </button>

            <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
              {t('terms_agree')}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
