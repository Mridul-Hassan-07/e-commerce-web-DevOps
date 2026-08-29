import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InvoiceModal } from '../components/InvoiceModal';
import {
  Package,
  ArrowLeft,
  Printer,
  Truck,
  ExternalLink,
  ShoppingBag,
  Clock,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const MyOrdersView: React.FC = () => {
  const { orders, currentUser, navigate, lang, t, formatMoney } = useApp();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<any>(null);

  if (!currentUser) {
    navigate({ view: 'auth', mode: 'login' });
    return null;
  }

  const myOrders = orders.filter(
    o => o.phone.replace(/[^0-9]/g, '') === currentUser.phone.replace(/[^0-9]/g, '')
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate({ view: 'profile' })}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
            {t('my_orders')} ({myOrders.length})
          </h1>
        </div>

        <button
          onClick={() => navigate({ view: 'shop' })}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
        >
          {t('start_shopping')}
        </button>
      </div>

      {myOrders.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white">No Orders Found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            You have not placed any Cash on Delivery orders yet with this phone number.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition"
            >
              {/* Order Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-sm text-indigo-600 dark:text-indigo-400">
                    {order.order_number}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                    order.order_status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : order.order_status === 'shipped'
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {order.order_status}
                  </span>

                  <button
                    onClick={() => setSelectedInvoiceOrder(order)}
                    className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-200 text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                    title="Print Invoice"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Invoice</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 text-xs">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-zinc-700 dark:text-zinc-300">
                    <span className="truncate max-w-sm">
                      {it.quantity}x {lang === 'bn' ? it.title_bn : it.title_en} ({lang === 'bn' ? it.variant_name_bn : it.variant_name_en})
                    </span>
                    <span className="font-semibold">{formatMoney(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Details & Actions */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-zinc-400">Total COD Amount: </span>
                    <span className="font-black text-sm text-zinc-900 dark:text-white">
                      {formatMoney(order.total_amount)}
                    </span>
                  </div>

                  {order.courier_consignment_id && (
                    <div className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400">
                      <Truck className="w-3.5 h-3.5" />
                      <span className="font-mono text-[11px] font-semibold">{order.courier_consignment_id}</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate({
                    view: 'order_track',
                    initialOrderNumber: order.order_number
                  })}
                  className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <span>{t('track_order')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
