import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Home,
  ShoppingBag,
  Package,
  User,
  ShieldCheck,
  FileText,
  Phone,
  Info,
  Lock,
  Sun,
  Moon,
  ChevronRight,
  ChevronDown,
  Layers,
  PhoneCall
} from 'lucide-react';

export const MobileDrawer: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    categories,
    navigate,
    lang,
    setLang,
    theme,
    toggleTheme,
    t,
    currentUser,
    logoutUser
  } = useApp();

  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({
    'cat-lifestyle': true
  });

  const toggleExpand = (catId: string) => {
    setExpandedParents(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  if (!isMobileMenuOpen) return null;

  const mainCategories = categories.filter(c => !c.parent_id);

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col z-50">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
              M
            </div>
            <div>
              <span className="font-extrabold text-lg text-zinc-900 dark:text-white">
                Mehnaj<span className="text-indigo-600 dark:text-indigo-400">Mart</span>
              </span>
              <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wider px-1 py-0.2 rounded bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30">
                BD
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card if logged in */}
        <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800">
          {currentUser ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-sm text-zinc-900 dark:text-white">{currentUser.name}</p>
                <p className="text-xs text-zinc-500 font-mono">{currentUser.phone}</p>
              </div>
              <button
                onClick={() => {
                  logoutUser();
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs text-rose-500 hover:underline font-medium"
              >
                {t('logout')}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-600 dark:text-zinc-400">Welcome to MehnajMart</span>
              <button
                onClick={() => {
                  navigate({ view: 'auth', mode: 'login' });
                  setIsMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400"
              >
                {t('login')} / {t('signup')}
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Nav Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Main Navigation */}
          <div className="space-y-1">
            <button
              onClick={() => {
                navigate({ view: 'home' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <Home className="w-4 h-4 text-indigo-600" />
              <span>{t('home')}</span>
            </button>

            <button
              onClick={() => {
                navigate({ view: 'shop' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span>{t('shop')}</span>
            </button>

            <button
              onClick={() => {
                navigate({ view: 'order_track' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-amber-500"
            >
              <Package className="w-4 h-4 text-amber-500" />
              <span>{t('track_order')}</span>
            </button>
          </div>

          {/* Categories with Subcategories */}
          <div>
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center justify-between">
              <span>{t('categories')}</span>
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
            </p>
            <div className="space-y-1">
              {mainCategories.map((cat) => {
                const subCats = categories.filter(c => c.parent_id === cat.id);
                const isExpanded = !!expandedParents[cat.id];

                return (
                  <div key={cat.id} className="rounded-xl overflow-hidden bg-zinc-50/70 dark:bg-zinc-800/40">
                    <div className="flex items-center justify-between px-3 py-2">
                      <button
                        onClick={() => {
                          navigate({ view: 'shop', categorySlug: cat.slug });
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-left text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:text-indigo-600 flex-1"
                      >
                        {lang === 'bn' ? cat.name_bn : cat.name_en}
                      </button>

                      {subCats.length > 0 && (
                        <button
                          onClick={() => toggleExpand(cat.id)}
                          className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                          aria-label="Expand category"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Subcategory list */}
                    {subCats.length > 0 && isExpanded && (
                      <div className="pl-5 pr-3 pb-2 space-y-1 border-t border-zinc-200/50 dark:border-zinc-700/50 pt-1.5 bg-zinc-100/50 dark:bg-zinc-900/50">
                        {subCats.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              navigate({ view: 'shop', categorySlug: cat.slug, subcategorySlug: sub.slug });
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-zinc-800 transition flex items-center justify-between"
                          >
                            <span>• {lang === 'bn' ? sub.name_bn : sub.name_en}</span>
                            <ChevronRight className="w-3 h-3 text-zinc-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hotline Quick Call */}
          <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <a
              href="tel:01577686999"
              className="flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{lang === 'bn' ? 'কল করুন: ০১৫৭৭৬৮৬৯৯৯' : 'Hotline: 01577686999'}</span>
            </a>
          </div>

          {/* Customer & Info */}
          <div>
            <p className="px-3 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              {lang === 'bn' ? 'তথ্য ও সহায়তা' : 'Help & Information'}
            </p>
            <div className="space-y-1 text-sm">
              <button
                onClick={() => {
                  navigate({ view: 'about' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                <Info className="w-4 h-4 text-zinc-400" />
                <span>{t('about_us')}</span>
              </button>

              <button
                onClick={() => {
                  navigate({ view: 'contact' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>{t('contact_us')}</span>
              </button>

              <button
                onClick={() => {
                  navigate({ view: 'policy', policyType: 'shipping' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                <FileText className="w-4 h-4 text-zinc-400" />
                <span>{t('shipping_policy')}</span>
              </button>

              <button
                onClick={() => {
                  navigate({ view: 'policy', policyType: 'refund' });
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-3 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition"
              >
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span>{t('refund_policy')}</span>
              </button>
            </div>
          </div>

          {/* Admin shortcut */}
          <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => {
                navigate({ view: 'admin', section: 'dashboard' });
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-3 px-3 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-lg transition"
            >
              <Lock className="w-4 h-4" />
              <span>{t('admin_portal')}</span>
            </button>
          </div>
        </div>

        {/* Footer controls (Theme & Lang) */}
        <div className="p-3.5 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-900/80">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                lang === 'en' ? 'bg-indigo-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('bn')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                lang === 'bn' ? 'bg-indigo-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              বাংলা
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
