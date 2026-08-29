import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, Phone, MapPin, ShoppingBag } from 'lucide-react';

export const AdminCustomers: React.FC = () => {
  const { users, orders, formatMoney } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = users.filter(c => {
    const q = searchTerm.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.phone.includes(q) || (c.district && c.district.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
            Customer Directory
          </h1>
          <p className="text-xs text-zinc-500">
            Registered accounts & guest buyers across 64 districts in Bangladesh
          </p>
        </div>

        <div className="relative sm:w-72">
          <input
            type="text"
            placeholder="Search by name, phone, district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone Number</th>
                <th className="py-3 px-4">District & Area</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">Role</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {filtered.map((c) => {
                const userOrders = orders.filter(o => o.phone.replace(/[^0-9]/g, '') === c.phone.replace(/[^0-9]/g, ''));
                const spend = userOrders.reduce((sum, o) => sum + o.total_amount, 0);

                return (
                  <tr key={c.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3 px-4 font-bold text-zinc-900 dark:text-white">
                      {c.name}
                    </td>
                    <td className="py-3 px-4 font-mono">{c.phone}</td>
                    <td className="py-3 px-4">
                      {c.district || 'Dhaka'} ({c.area_type || 'dhaka'})
                    </td>
                    <td className="py-3 px-4 font-bold font-mono">
                      {userOrders.length} orders
                    </td>
                    <td className="py-3 px-4 font-black text-indigo-600 dark:text-indigo-400">
                      {formatMoney(spend)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        c.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-zinc-100 text-zinc-700'
                      }`}>
                        {c.role}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
