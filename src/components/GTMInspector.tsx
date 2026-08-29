import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, X, Trash2, Eye, ShoppingCart, CreditCard, CheckCircle2, ChevronRight } from 'lucide-react';

export const GTMInspector: React.FC = () => {
  const {
    dataLayerLogs,
    clearDataLayerLogs,
    isGtmInspectorOpen,
    setIsGtmInspectorOpen,
    lang
  } = useApp();

  const getEventBadge = (event: string) => {
    switch (event) {
      case 'view_item':
        return <span className="flex items-center space-x-1 px-2 py-0.5 text-xs font-semibold rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"><Eye className="w-3 h-3" /><span>view_item</span></span>;
      case 'add_to_cart':
        return <span className="flex items-center space-x-1 px-2 py-0.5 text-xs font-semibold rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300"><ShoppingCart className="w-3 h-3" /><span>add_to_cart</span></span>;
      case 'begin_checkout':
        return <span className="flex items-center space-x-1 px-2 py-0.5 text-xs font-semibold rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300"><CreditCard className="w-3 h-3" /><span>begin_checkout</span></span>;
      case 'purchase':
        return <span className="flex items-center space-x-1 px-2 py-0.5 text-xs font-semibold rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"><CheckCircle2 className="w-3 h-3" /><span>purchase</span></span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">{event}</span>;
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        id="gtm-floating-badge-btn"
        onClick={() => setIsGtmInspectorOpen(!isGtmInspectorOpen)}
        className="fixed bottom-20 sm:bottom-6 right-4 z-40 flex items-center space-x-2 px-3 py-2 bg-zinc-900/90 dark:bg-zinc-800/90 text-white rounded-full shadow-xl border border-zinc-700 hover:bg-zinc-800 backdrop-blur transition-all text-xs font-medium cursor-pointer"
        title="Open GTM & dataLayer Analytics Inspector"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <Activity className="w-4 h-4 text-emerald-400" />
        <span className="hidden sm:inline">GTM dataLayer</span>
        <span className="px-1.5 py-0.2 rounded-full bg-zinc-700 text-[11px] font-mono">
          {dataLayerLogs.length}
        </span>
      </button>

      {/* Slide-out Drawer */}
      {isGtmInspectorOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-zinc-900 shadow-2xl border-l border-zinc-200 dark:border-zinc-800 flex flex-col transition-transform">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-white">
                  GTM / GA4 dataLayer
                </h3>
                <p className="text-[11px] text-zinc-500">
                  {dataLayerLogs.length} events recorded live
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={clearDataLayerLogs}
                title="Clear Logs"
                className="p-1.5 text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsGtmInspectorOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Info Banner */}
          <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-800 dark:text-indigo-300 text-xs border-b border-indigo-100 dark:border-indigo-900">
            Logs eCommerce events: <code>view_item</code>, <code>add_to_cart</code>, <code>begin_checkout</code>, and single-fire <code>purchase</code>.
          </div>

          {/* Event Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {dataLayerLogs.length === 0 ? (
              <div className="text-center py-12 text-zinc-400 text-xs">
                No events pushed yet. Browse products or add items to cart to trigger tracking.
              </div>
            ) : (
              dataLayerLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    {getEventBadge(log.event)}
                    <span className="font-mono text-[10px] text-zinc-400">
                      {log.timestamp}
                    </span>
                  </div>

                  <div className="bg-zinc-900 text-zinc-200 rounded-lg p-2.5 overflow-x-auto font-mono text-[11px] leading-relaxed max-h-48">
                    <pre>{JSON.stringify(log.payload, null, 2)}</pre>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};
