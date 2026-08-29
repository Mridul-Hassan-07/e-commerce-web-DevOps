import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { InvoiceModal } from '../components/InvoiceModal';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Printer,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

interface OrderTrackingViewProps {
  initialOrderNumber?: string;
  initialPhone?: string;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  initialOrderNumber = '',
  initialPhone = ''
}) => {
  const { orders, lang, t, formatMoney } = useApp();

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState(initialPhone);
  const [searched, setSearched] = useState(false);
  const [matchedOrder, setMatchedOrder] = useState<any>(null);
  const [copiedTracking, setCopiedTracking] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Auto-search if props provided
  useEffect(() => {
    if (initialOrderNumber && initialPhone) {
      handleSearch();
    }
  }, [initialOrderNumber, initialPhone]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearched(true);

    const cleanOrderNo = orderNumber.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/[^0-9]/g, '');

    const found = orders.find(o => {
      const matchNo = o.order_number.toUpperCase() === cleanOrderNo;
      const orderPhone = o.phone.replace(/[^0-9]/g, '');
      const matchPhone = !cleanPhone || orderPhone.includes(cleanPhone) || cleanPhone.includes(orderPhone);
      return matchNo && matchPhone;
    });

    setMatchedOrder(found || null);
  };

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const currentStep = matchedOrder ? getStepIndex(matchedOrder.order_status) : 0;

  const copyConsignment = () => {
    if (matchedOrder?.courier_consignment_id) {
      navigator.clipboard.writeText(matchedOrder.courier_consignment_id);
      setCopiedTracking(true);
      setTimeout(() => setCopiedTracking(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-2">
          <Package className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
          {t('track_your_order')}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          {t('track_instructions')}
        </p>
      </div>

      {/* Search Box Form */}
      <form
        onSubmit={handleSearch}
        className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {t('order_number')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. APX-2026-8801"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white uppercase font-mono border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              {t('phone_number')} <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="e.g. 01711223344"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono border border-zinc-200 dark:border-zinc-700 focus:border-indigo-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/20 flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>{t('track_button')}</span>
        </button>
      </form>

      {/* Quick Demo Hint */}
      {!searched && (
        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 space-y-1">
          <p className="font-bold text-zinc-700 dark:text-zinc-300">Demo Order Quick-Fill:</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => {
                setOrderNumber('APX-2026-8801');
                setPhone('01712345678');
              }}
              className="px-2.5 py-1 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-300 dark:border-zinc-700 font-mono text-[11px] text-indigo-600 hover:border-indigo-500 cursor-pointer"
            >
              APX-2026-8801 (Shipped)
            </button>
            <button
              onClick={() => {
                setOrderNumber('APX-2026-8802');
                setPhone('01819876543');
              }}
              className="px-2.5 py-1 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-300 dark:border-zinc-700 font-mono text-[11px] text-indigo-600 hover:border-indigo-500 cursor-pointer"
            >
              APX-2026-8802 (Pending)
            </button>
          </div>
        </div>
      )}

      {/* Result Area */}
      {searched && (
        <>
          {!matchedOrder ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-500 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-zinc-900 dark:text-white">
                {t('no_order_found_title')}
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                {t('no_order_found_desc')}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Order Status Timeline Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div>
                    <span className="text-xs text-zinc-400 font-mono">Order Number</span>
                    <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white font-mono">
                      {matchedOrder.order_number}
                    </h2>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 uppercase tracking-wider border border-indigo-200 dark:border-indigo-800">
                      Status: {matchedOrder.order_status}
                    </span>
                    <button
                      onClick={() => setIsInvoiceOpen(true)}
                      className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-200 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                      title="View Invoice"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Stepper Timeline */}
                {matchedOrder.order_status === 'cancelled' ? (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs">
                    This order is currently marked as <strong>CANCELLED</strong>.
                  </div>
                ) : (
                  <div className="relative">
                    {/* Progress Track Line */}
                    <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-zinc-200 dark:bg-zinc-800 -z-0">
                      <div
                        className="h-full bg-indigo-600 transition-all duration-500"
                        style={{ width: `${(currentStep / 3) * 100}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-2 relative z-10">
                      {/* Step 1: Placed */}
                      <div className="flex sm:flex-col items-center space-x-3 sm:space-x-0 sm:text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                          currentStep >= 0
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="sm:mt-2">
                          <p className="font-bold text-xs text-zinc-900 dark:text-white">{t('step_placed')}</p>
                          <p className="text-[10px] text-zinc-400">{new Date(matchedOrder.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Step 2: Confirmed */}
                      <div className="flex sm:flex-col items-center space-x-3 sm:space-x-0 sm:text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                          currentStep >= 1
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className="sm:mt-2">
                          <p className="font-bold text-xs text-zinc-900 dark:text-white">{t('step_confirmed')}</p>
                          <p className="text-[10px] text-zinc-400">Verified by support</p>
                        </div>
                      </div>

                      {/* Step 3: Shipped (Steadfast) */}
                      <div className="flex sm:flex-col items-center space-x-3 sm:space-x-0 sm:text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                          currentStep >= 2
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          <Truck className="w-5 h-5" />
                        </div>
                        <div className="sm:mt-2">
                          <p className="font-bold text-xs text-zinc-900 dark:text-white">{t('step_shipped')}</p>
                          <p className="text-[10px] text-zinc-400">Steadfast Express</p>
                        </div>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="flex sm:flex-col items-center space-x-3 sm:space-x-0 sm:text-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                          currentStep >= 3
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'
                        }`}>
                          <Check className="w-5 h-5" />
                        </div>
                        <div className="sm:mt-2">
                          <p className="font-bold text-xs text-zinc-900 dark:text-white">{t('step_delivered')}</p>
                          <p className="text-[10px] text-zinc-400">Cash Collected</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Steadfast Courier Tracking Box (Section A11) */}
                {matchedOrder.courier_consignment_id && (
                  <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 rounded-xl bg-indigo-600 text-white">
                          <Truck className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-zinc-900 dark:text-white">
                            Steadfast Courier
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            {t('consignment_id')}: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{matchedOrder.courier_consignment_id}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={copyConsignment}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 flex items-center space-x-1 cursor-pointer"
                        >
                          {copiedTracking ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{t('copy_consignment')}</span>
                        </button>

                        <a
                          href={`https://steadfast.com.bd/tracking?consignment_id=${matchedOrder.courier_consignment_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 flex items-center space-x-1 cursor-pointer"
                        >
                          <span>{t('track_courier')}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div className="text-[11px] text-zinc-600 dark:text-zinc-300 border-t border-indigo-100 dark:border-indigo-900/60 pt-2 flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{t('delivery_note')}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items & Breakdown */}
              <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                  {lang === 'bn' ? 'অর্ডারের পণ্যসমূহ' : 'Items in this Order'}
                </h3>
                <div className="space-y-3 divide-y divide-zinc-100 dark:divide-zinc-800">
                  {matchedOrder.items.map((it: any, idx: number) => (
                    <div key={idx} className="pt-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                          {lang === 'bn' ? it.title_bn : it.title_en}
                        </p>
                        <p className="text-zinc-400">
                          Variant: {lang === 'bn' ? it.variant_name_bn : it.variant_name_en} | Qty: {it.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-white">
                        {formatMoney(it.price * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-sm font-bold">
                  <span>Total Amount (COD):</span>
                  <span className="text-base text-indigo-600 dark:text-indigo-400 font-black">
                    {formatMoney(matchedOrder.total_amount)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Invoice Modal */}
      {matchedOrder && (
        <InvoiceModal
          order={matchedOrder}
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
        />
      )}
    </div>
  );
};
