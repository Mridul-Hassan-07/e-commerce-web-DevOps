import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, DollarSign, Package, CheckCircle2, Truck, AlertCircle } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { orders, products, formatMoney } = useApp();

  const completedOrders = orders.filter(o => o.order_status === 'delivered');
  const totalCollectedRevenue = completedOrders.reduce((sum, o) => sum + o.total_amount, 0);
  const inFlightRevenue = orders
    .filter(o => o.order_status === 'shipped')
    .reduce((sum, o) => sum + o.total_amount, 0);

  const cancelledCount = orders.filter(o => o.order_status === 'cancelled').length;
  const cancellationRate = orders.length > 0 ? Math.round((cancelledCount / orders.length) * 100) : 0;

  // Product sales breakdown
  const salesMap: { [productTitle: string]: { units: number; revenue: number } } = {};
  orders.forEach(o => {
    if (o.order_status !== 'cancelled') {
      o.items.forEach(it => {
        const title = it.title_en || 'Product';
        if (!salesMap[title]) {
          salesMap[title] = { units: 0, revenue: 0 };
        }
        salesMap[title].units += it.quantity;
        salesMap[title].revenue += it.price * it.quantity;
      });
    }
  });

  const topSellingProducts = Object.entries(salesMap)
    .sort((a, b) => b[1].revenue - a[1].revenue);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
          Financial & COD Reports
        </h1>
        <p className="text-xs text-zinc-500">
          Reconciliation of Cash on Delivery proceeds, courier delivery rates & product performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs">
          <span className="text-xs font-bold uppercase text-zinc-400">Cash Collected (Delivered)</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {formatMoney(totalCollectedRevenue)}
          </p>
          <p className="text-[11px] text-zinc-400">{completedOrders.length} orders settled</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs">
          <span className="text-xs font-bold uppercase text-zinc-400">In Transit with Steadfast</span>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {formatMoney(inFlightRevenue)}
          </p>
          <p className="text-[11px] text-zinc-400">Awaiting doorstep delivery</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 shadow-xs">
          <span className="text-xs font-bold uppercase text-zinc-400">COD Return / Cancel Rate</span>
          <p className={`text-2xl font-black ${cancellationRate > 15 ? 'text-rose-500' : 'text-zinc-900 dark:text-white'}`}>
            {cancellationRate}%
          </p>
          <p className="text-[11px] text-zinc-400">{cancelledCount} total cancellations</p>
        </div>
      </div>

      {/* Top Selling Products Breakdown */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
        <h3 className="font-extrabold text-sm text-zinc-900 dark:text-white">
          Product Sales Volume Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Units Sold</th>
                <th className="py-3 px-4">Total Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {topSellingProducts.map(([title, stat], idx) => (
                <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white">
                    {title}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold">
                    {stat.units} pcs
                  </td>
                  <td className="py-3 px-4 font-black text-indigo-600 dark:text-indigo-400">
                    {formatMoney(stat.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
