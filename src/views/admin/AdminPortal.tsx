import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminLoginView } from './AdminLoginView';
import { AdminDashboard } from './AdminDashboard';
import { AdminOrders } from './AdminOrders';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminCustomers } from './AdminCustomers';
import { AdminReports } from './AdminReports';
import { AdminShippingSettings } from './AdminShippingSettings';
import { AdminAdmins } from './AdminAdmins';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Layers,
  Users,
  BarChart3,
  Truck,
  ArrowLeft,
  ShieldCheck,
  UserCheck,
  Menu,
  X,
  LogOut,
  User as UserIcon
} from 'lucide-react';

interface AdminPortalProps {
  initialSection?: string;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ initialSection = 'dashboard' }) => {
  const { navigate, lang, t, orders, admins, currentAdmin, isAdminAuthenticated, logoutAdmin } = useApp();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Security gate: If admin is not authenticated or session missing, show the dedicated AdminLoginView
  if (!isAdminAuthenticated || !currentAdmin) {
    return <AdminLoginView />;
  }

  const pendingOrdersCount = orders.filter(o => o.order_status === 'pending').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders (COD)', icon: Package, badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined },
    { id: 'products', label: 'Products & Video', icon: ShoppingBag },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'admins', label: 'Admins & Team', icon: UserCheck, badge: admins.length },
    { id: 'reports', label: 'Reports & Revenue', icon: BarChart3 },
    { id: 'shipping', label: 'Shipping & Courier', icon: Truck },
  ];

  return (
    <div className="min-h-[85vh] bg-zinc-100 dark:bg-zinc-950 flex flex-col md:flex-row -mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-10">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 shrink-0 p-4 space-y-6">
        {/* Admin Header & Active Profile */}
        <div className="space-y-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-zinc-900 dark:text-white">Admin Portal</p>
                <p className="text-[10px] text-zinc-400">MehnajMart Operations</p>
              </div>
            </div>
          </div>

          {/* Current Admin Account Card */}
          <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-hidden">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                <UserIcon className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{currentAdmin.name}</p>
                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 capitalize font-medium">{currentAdmin.role.replace('_', ' ')}</p>
              </div>
            </div>

            <button
              onClick={logoutAdmin}
              title="Lock & Logout Admin"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white text-indigo-700' : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Back to Storefront & Logout */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
          <button
            onClick={() => navigate({ view: 'home' })}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Storefront</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center space-x-2 px-3 py-2 text-xs font-bold text-rose-500 hover:text-rose-600 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out & Lock</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header for Admin */}
      <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-4 flex items-center justify-between">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="flex items-center space-x-2 text-xs font-bold text-zinc-900 dark:text-white"
        >
          <Menu className="w-5 h-5 text-indigo-600" />
          <span>Menu: {navItems.find(n => n.id === activeSection)?.label}</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={logoutAdmin}
            className="text-xs text-rose-500 font-bold flex items-center space-x-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
          <button
            onClick={() => navigate({ view: 'home' })}
            className="text-xs text-indigo-600 font-bold"
          >
            Storefront
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Modal */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileSidebarOpen(false)} />
          <div className="relative w-64 max-w-full bg-white dark:bg-zinc-900 h-full p-4 flex flex-col justify-between shadow-2xl z-50">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <span className="font-extrabold text-sm text-zinc-900 dark:text-white">Admin Navigation</span>
                <button onClick={() => setIsMobileSidebarOpen(false)} className="p-1 text-zinc-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Admin profile */}
              <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-xs">
                <p className="font-bold text-zinc-900 dark:text-white">{currentAdmin.name}</p>
                <p className="text-[10px] text-indigo-600 capitalize">{currentAdmin.role.replace('_', ' ')}</p>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold ${
                        isActive ? 'bg-indigo-600 text-white' : 'text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-zinc-200">
              <button
                onClick={() => {
                  logoutAdmin();
                  setIsMobileSidebarOpen(false);
                }}
                className="w-full flex items-center space-x-2 text-xs font-bold text-rose-500"
              >
                <LogOut className="w-4 h-4" />
                <span>Lock & Sign Out</span>
              </button>

              <button
                onClick={() => {
                  navigate({ view: 'home' });
                  setIsMobileSidebarOpen(false);
                }}
                className="flex items-center space-x-2 text-xs font-bold text-zinc-500"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Admin Section Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {activeSection === 'dashboard' && <AdminDashboard onNavigateSection={(sec) => setActiveSection(sec)} />}
        {activeSection === 'orders' && <AdminOrders />}
        {activeSection === 'products' && <AdminProducts />}
        {activeSection === 'categories' && <AdminCategories />}
        {activeSection === 'customers' && <AdminCustomers />}
        {activeSection === 'admins' && <AdminAdmins />}
        {activeSection === 'reports' && <AdminReports />}
        {activeSection === 'shipping' && <AdminShippingSettings />}
      </main>
    </div>
  );
};
