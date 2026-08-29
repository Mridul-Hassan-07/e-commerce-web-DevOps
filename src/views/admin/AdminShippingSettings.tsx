import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Truck, Save, CheckCircle2, ShieldCheck, Key, RefreshCw } from 'lucide-react';

export const AdminShippingSettings: React.FC = () => {
  const { shippingSettings, updateShippingSettings, formatMoney } = useApp();

  const [dhakaFee, setDhakaFee] = useState(shippingSettings.dhaka_fee);
  const [outsideDhakaFee, setOutsideDhakaFee] = useState(shippingSettings.outside_dhaka_fee);
  const [freeThreshold, setFreeThreshold] = useState(shippingSettings.free_shipping_threshold || 0);
  const [courierName, setCourierName] = useState('Steadfast Courier');
  const [apiKey, setApiKey] = useState('st_live_bd984029481023');
  const [secretKey, setSecretKey] = useState('••••••••••••••••');
  const [autoDispatch, setAutoDispatch] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingSettings({
      dhaka_fee: Number(dhakaFee),
      outside_dhaka_fee: Number(outsideDhakaFee),
      free_shipping_threshold: Number(freeThreshold)
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
          Shipping & Courier Configuration
        </h1>
        <p className="text-xs text-zinc-500">
          Manage Flat Delivery Rates across Bangladesh & Steadfast Courier API Integration
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Flat Rate Delivery Charges (Section B7) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-zinc-900 dark:text-white">
            <Truck className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-sm">Nationwide Delivery Rates (COD)</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">
                Inside Dhaka City Shipping Fee (৳) *
              </label>
              <input
                type="number"
                required
                value={dhakaFee}
                onChange={(e) => setDhakaFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono font-bold border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-zinc-400">Default rate: ৳70</p>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">
                Outside Dhaka / Nationwide Fee (৳) *
              </label>
              <input
                type="number"
                required
                value={outsideDhakaFee}
                onChange={(e) => setOutsideDhakaFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono font-bold border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-zinc-400">Default rate: ৳150</p>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <label className="font-bold text-zinc-700 dark:text-zinc-300">
              Free Delivery Order Threshold (৳)
            </label>
            <input
              type="number"
              value={freeThreshold}
              onChange={(e) => setFreeThreshold(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono font-bold border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[11px] text-zinc-400">
              Orders equal or exceeding this value receive 100% free delivery across Bangladesh.
            </p>
          </div>
        </div>

        {/* Steadfast Express API Credentials (Section A11 & B7) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 shadow-xs">
          <div className="flex items-center space-x-2 text-zinc-900 dark:text-white">
            <Key className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-sm">Steadfast Courier API Integration</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">Steadfast API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono text-[11px] border border-zinc-200 dark:border-zinc-700 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300">Steadfast Secret Key</label>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono text-[11px] border border-zinc-200 dark:border-zinc-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center space-x-2 cursor-pointer font-bold text-zinc-800 dark:text-zinc-200">
              <input
                type="checkbox"
                checked={autoDispatch}
                onChange={(e) => setAutoDispatch(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span>Auto-create Consignment ID upon order confirmation</span>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center space-x-2 shadow-md cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Shipping Settings</span>
          </button>

          {saved && (
            <span className="text-emerald-600 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Settings successfully updated!</span>
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
