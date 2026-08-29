import React from 'react';
import { Order } from '../types';
import { useApp } from '../context/AppContext';
import { Printer, X, Download, CheckCircle2, Truck, ShieldCheck, MapPin, Phone, Mail } from 'lucide-react';

interface InvoiceModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, isOpen, onClose }) => {
  const { siteSettings, formatMoney, lang } = useApp();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="invoice-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all my-6">
        {/* Header Actions (hidden on print) */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {lang === 'bn' ? 'অফিসিয়াল ইনভয়েস' : 'Official Sales Invoice'}
            </span>
            <span className="px-2 py-0.5 text-xs font-mono font-medium rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {order.order_number}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="print-invoice-btn"
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{lang === 'bn' ? 'প্রিন্ট / সেভ করুন' : 'Print / Save PDF'}</span>
            </button>
            <button
              id="close-invoice-modal-btn"
              onClick={onClose}
              className="p-1.5 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div id="printable-invoice-content" className="p-6 sm:p-8 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-900">
          {/* Company Branding & Meta */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {siteSettings.site_name}
                  </h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {lang === 'bn' ? siteSettings.tagline_bn : siteSettings.tagline_en}
                  </p>
                </div>
              </div>
              <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 space-y-0.5">
                {(siteSettings.office_address_bn || siteSettings.office_address_en) && (
                  <p className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? siteSettings.office_address_bn : siteSettings.office_address_en}</span>
                  </p>
                )}
                <p className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{siteSettings.hotline}</span>
                  <span className="mx-1">•</span>
                  <Mail className="w-3.5 h-3.5" />
                  <span>{siteSettings.support_email}</span>
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold rounded-md uppercase tracking-wider mb-2">
                {order.payment_method.toUpperCase()} - {order.payment_status.toUpperCase()}
              </span>
              <p className="text-sm font-semibold">
                {lang === 'bn' ? 'ইনভয়েস নং: ' : 'Invoice #: '}
                <span className="font-mono">{order.order_number}</span>
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {lang === 'bn' ? 'তারিখ: ' : 'Date: '}
                {new Date(order.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {order.courier_consignment_id && (
                <div className="mt-2 inline-flex items-center space-x-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded text-xs font-mono">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Steadfast ID: {order.courier_consignment_id}</span>
                </div>
              )}
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 text-xs sm:text-sm border-b border-zinc-200 dark:border-zinc-800">
            <div className="space-y-1">
              <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs">
                {lang === 'bn' ? 'গ্রাহকের তথ্য ও ঠিকানা' : 'Customer & Shipping Address'}
              </h3>
              <p className="font-medium text-zinc-900 dark:text-zinc-100 text-base">{order.name}</p>
              <p className="font-mono text-zinc-700 dark:text-zinc-300">{order.phone}</p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {order.address}, {order.upazila ? `${order.upazila}, ` : ''}{order.district}
              </p>
              <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                {order.area_type === 'dhaka'
                  ? (lang === 'bn' ? 'ঢাকা সিটির ভেতরে (৳৭০)' : 'Inside Dhaka City (৳70)')
                  : (lang === 'bn' ? 'ঢাকার বাইরে / সারাদেশে (৳১৫০)' : 'Outside Dhaka (৳150)')}
              </p>
            </div>

            <div className="space-y-1 sm:text-right">
              <h3 className="font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-xs">
                {lang === 'bn' ? 'ডেলিভারি মেথড ও নোট' : 'Delivery Method & Instructions'}
              </h3>
              <p className="font-medium text-zinc-900 dark:text-zinc-100 flex items-center sm:justify-end space-x-1.5">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>Steadfast Express Cash on Delivery</span>
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs">
                {order.notes ? `Note: "${order.notes}"` : (lang === 'bn' ? 'কোনো বিশেষ নোট নেই' : 'Standard home delivery')}
              </p>
              <div className="mt-2 inline-flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 text-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>7 Days Official Replacement Guarantee</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium">
                  <th className="pb-3">{lang === 'bn' ? 'বিবরণ ও পণ্য' : 'Item Description'}</th>
                  <th className="pb-3 text-center">{lang === 'bn' ? 'এসকেইউ' : 'SKU'}</th>
                  <th className="pb-3 text-right">{lang === 'bn' ? 'একক মূল্য' : 'Unit Price'}</th>
                  <th className="pb-3 text-center">{lang === 'bn' ? 'পরিমাণ' : 'Qty'}</th>
                  <th className="pb-3 text-right">{lang === 'bn' ? 'মোট' : 'Total'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="text-zinc-800 dark:text-zinc-200">
                    <td className="py-3">
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {lang === 'bn' ? item.title_bn : item.title_en}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {lang === 'bn' ? item.variant_name_bn : item.variant_name_en}
                      </p>
                    </td>
                    <td className="py-3 text-center font-mono text-xs text-zinc-500">
                      {item.sku}
                    </td>
                    <td className="py-3 text-right font-medium">
                      {formatMoney(item.price)}
                    </td>
                    <td className="py-3 text-center">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-right font-semibold">
                      {formatMoney(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="w-full sm:w-1/2 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-xs">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                {lang === 'bn' ? 'পেমেন্ট শর্তাবলী (COD):' : 'COD Payment Notice:'}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {lang === 'bn'
                  ? 'ডেলিভারি রাইডারের কাছে পণ্য গ্রহণের সময় নগদ টাকা পরিশোধ করুন। কোনো সমস্যা হলে আমাদের হটলাইনে কল দিন।'
                  : 'Please pay exact cash to the courier delivery rider upon package arrival. Keep this receipt for any warranty claim.'}
              </p>
            </div>

            <div className="w-full sm:w-5/12 space-y-2 text-sm">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{lang === 'bn' ? 'সাবটোটাল:' : 'Subtotal:'}</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatMoney(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>{lang === 'bn' ? 'ডেলিভারি চার্জ:' : 'Shipping Fee:'}</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">+{formatMoney(order.shipping_fee)}</span>
              </div>
              {order.discount_amount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>{lang === 'bn' ? 'ডিসকাউন্ট' : 'Discount'} {order.coupon_code ? `(${order.coupon_code})` : ''}:</span>
                  <span className="font-medium">-{formatMoney(order.discount_amount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>{lang === 'bn' ? 'সর্বমোট (ক্যাশ অন ডেলিভারি):' : 'Net Total (COD):'}</span>
                <span className="text-indigo-600 dark:text-indigo-400">{formatMoney(order.total_amount)}</span>
              </div>
            </div>
          </div>

          {/* Barcode & Footer info */}
          <div className="mt-8 pt-6 border-t border-dashed border-zinc-300 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 text-center sm:text-left">
            <div>
              <div className="font-mono text-base tracking-widest text-zinc-600 dark:text-zinc-300 font-bold">
                |||| | |||||| || ||||||| ||| | |||
              </div>
              <p className="mt-1 font-mono text-[10px]">{order.order_number} • STEADFAST-COD</p>
            </div>
            <p>
              {lang === 'bn' ? 'আমাদের সাথে কেনাকাটা করার জন্য ধন্যবাদ!' : 'Thank you for shopping with ApexMart Bangladesh!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
