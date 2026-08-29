import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Package,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Truck,
  Printer,
  ChevronRight,
  DollarSign
} from 'lucide-react';

export const AdminDashboard: React.FC<{ onNavigateSection: (sec: string) => void }> = ({ onNavigateSection }) => {
  const { orders, products, formatMoney, lang } = useApp();

  // Metrics
  const totalRevenue = orders
    .filter(o => o.order_status !== 'cancelled')
    .reduce((sum, o) => sum + o.total_amount, 0);

  const pendingOrders = orders.filter(o => o.order_status === 'pending');
  const shippedOrders = orders.filter(o => o.order_status === 'shipped');
  const deliveredOrders = orders.filter(o => o.order_status === 'delivered');

  // Low stock products
  const lowStockProducts = products.filter(p => {
    return p.variants.some(v => v.stock <= p.low_stock_threshold);
  });

  const recentOrders = [...orders].reverse().slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Summary Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
            Admin Commerce Dashboard
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Cash on Delivery operations, Steadfast Courier dispatching & inventory control
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigateSection('orders')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center space-x-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Process Orders ({pendingOrders.length} Pending)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total COD Sales */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Total COD Volume</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
              {formatMoney(totalRevenue)}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center space-x-0.5">
              <span>{orders.length} total customer orders</span>
            </p>
          </div>
        </div>

        {/* Pending Approval */}
        <div
          onClick={() => onNavigateSection('orders')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/40 space-y-3 shadow-xs cursor-pointer hover:border-amber-400 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Pending Review</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {pendingOrders.length}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Requires phone verification</p>
          </div>
        </div>

        {/* In Transit (Steadfast) */}
        <div
          onClick={() => onNavigateSection('orders')}
          className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs cursor-pointer hover:border-indigo-400 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">In Transit (Courier)</span>
            <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/50 text-violet-600">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">
              {shippedOrders.length}
            </h3>
            <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">Steadfast tracking active</p>
          </div>
        </div>

        {/* Delivered & Paid */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Delivered & Paid</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {deliveredOrders.length}
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">Cash collected at doorstep</p>
          </div>
        </div>
      </div>

      {/* Grid: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white">
              Recent Cash on Delivery Orders
            </h3>
            <button
              onClick={() => onNavigateSection('orders')}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center space-x-1"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800">
                <tr>
                  <th className="py-2.5 px-2">Order #</th>
                  <th className="py-2.5 px-2">Customer</th>
                  <th className="py-2.5 px-2">District</th>
                  <th className="py-2.5 px-2">Amount</th>
                  <th className="py-2.5 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3 px-2 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {order.order_number}
                    </td>
                    <td className="py-3 px-2">
                      <p className="font-semibold text-zinc-900 dark:text-white">{order.name}</p>
                      <p className="text-[11px] text-zinc-400 font-mono">{order.phone}</p>
                    </td>
                    <td className="py-3 px-2">{order.district}</td>
                    <td className="py-3 px-2 font-bold text-zinc-900 dark:text-white">
                      {formatMoney(order.total_amount)}
                    </td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        order.order_status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : order.order_status === 'shipped'
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {order.order_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts (1 col) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center space-x-1.5 text-rose-500">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white">
                Low Stock Alerts
              </h3>
            </div>
            <button
              onClick={() => onNavigateSection('products')}
              className="text-xs text-indigo-600 hover:underline font-bold"
            >
              Inventory
            </button>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="text-xs text-zinc-500 py-4 text-center">All product variants are well stocked.</p>
          ) : (
            <div className="space-y-3">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-xs text-zinc-900 dark:text-white line-clamp-1">
                      {p.title_en}
                    </h4>
                    <span className="px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-[10px] font-bold shrink-0 ml-1">
                      Alert
                    </span>
                  </div>

                  <div className="space-y-1">
                    {p.variants
                      .filter(v => v.stock <= p.low_stock_threshold)
                      .map(v => (
                        <div key={v.id} className="flex justify-between text-[11px] text-rose-700 dark:text-rose-300">
                          <span>{v.name_en} ({v.sku}):</span>
                          <span className="font-bold font-mono">{v.stock} left</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
