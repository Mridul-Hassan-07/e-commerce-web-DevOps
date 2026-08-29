import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { InvoiceModal } from '../components/InvoiceModal';
import {
  CheckCircle2,
  Package,
  Printer,
  Copy,
  Check,
  Truck,
  ArrowRight,
  ShoppingBag,
  MapPin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface OrderSuccessViewProps {
  orderNumber: string;
}

export const OrderSuccessView: React.FC<OrderSuccessViewProps> = ({ orderNumber }) => {
  const { orders, navigate, lang, t, formatMoney } = useApp();
  const [copied, setCopied] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  const order = orders.find(o => o.order_number === orderNumber);

  useEffect(() => {
    // Shoot celebratory confetti on order completion
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti not available', e);
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Order Not Found</h2>
        <p className="text-xs text-zinc-500">Could not locate details for order {orderNumber}.</p>
        <button
          onClick={() => navigate({ view: 'home' })}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
        >
          {t('home')}
        </button>
      </div>
    );
  }

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.order_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Thank you card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-5 shadow-lg">
        {/* Animated Check */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            {t('order_placed_title')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
            {t('order_placed_desc')}
          </p>
        </div>

        {/* Order Number Badge */}
        <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
          <span className="text-xs text-zinc-500 font-medium">{t('order_number')}:</span>
          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400 font-mono">
            {order.order_number}
          </span>
          <button
            onClick={handleCopyOrderNumber}
            className="p-1 rounded text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition cursor-pointer"
            title="Copy Order ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Action Buttons: Print Invoice & Track */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="order-success-print-invoice-btn"
            onClick={() => setIsInvoiceOpen(true)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t('download_invoice')}</span>
          </button>

          <button
            id="order-success-track-btn"
            onClick={() => navigate({ view: 'order_track', initialOrderNumber: order.order_number, initialPhone: order.phone })}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/20 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>{t('track_order')}</span>
          </button>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6">
        <h2 className="font-extrabold text-base text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
          {t('order_summary')}
        </h2>

        {/* Customer info & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1">
            <p className="font-bold text-zinc-900 dark:text-white">{order.name}</p>
            <p className="text-zinc-500 font-mono">{order.phone}</p>
            <p className="text-emerald-600 font-semibold">Payment: Cash on Delivery (Unpaid)</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>{order.district}, {order.upazila}</span>
            </p>
            <p className="text-zinc-500">{order.address}</p>
            <p className="text-[11px] text-zinc-400">Area: {order.area_type === 'dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}</p>
          </div>
        </div>

        {/* Ordered items */}
        <div className="space-y-3 pt-2">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-zinc-100 dark:border-zinc-800/80">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">
                  {lang === 'bn' ? item.title_bn : item.title_en}
                </p>
                <p className="text-zinc-400 text-[11px]">
                  Variant: {lang === 'bn' ? item.variant_name_bn : item.variant_name_en} | Qty: {item.quantity} × {formatMoney(item.price)}
                </p>
              </div>
              <span className="font-bold text-zinc-900 dark:text-white">
                {formatMoney(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Total Calculations */}
        <div className="space-y-2 text-xs sm:text-sm pt-2">
          <div className="flex justify-between text-zinc-500">
            <span>Subtotal</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{formatMoney(order.subtotal)}</span>
          </div>

          <div className="flex justify-between text-zinc-500">
            <span>Shipping Fee</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">+{formatMoney(order.shipping_fee)}</span>
          </div>

          {order.discount_amount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Coupon Discount</span>
              <span>-{formatMoney(order.discount_amount)}</span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-3 border-t border-zinc-200 dark:border-zinc-800 text-base font-black">
            <span className="text-zinc-900 dark:text-white">Total Payable (COD)</span>
            <span className="text-xl text-indigo-600 dark:text-indigo-400">{formatMoney(order.total_amount)}</span>
          </div>
        </div>
      </div>

      {/* Invoice Modal for Printing */}
      <InvoiceModal
        order={order}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </div>
  );
};
