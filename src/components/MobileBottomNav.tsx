import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, ShoppingBag, ShoppingCart, User, Package } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { route, navigate, cartCount, t, currentUser } = useApp();

  const isHomeActive = route.view === 'home';
  const isShopActive = route.view === 'shop' || route.view === 'product';
  const isCartActive = route.view === 'cart' || route.view === 'checkout';
  const isProfileActive = route.view === 'profile' || route.view === 'my_orders' || route.view === 'auth';

  return (
    <nav
      id="mobile-bottom-navigation-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-t border-zinc-200 dark:border-zinc-800 safe-area-bottom pb-safe transition-colors shadow-lg"
    >
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto">
        {/* Tab 1: Home */}
        <button
          id="bottom-nav-home-tab"
          onClick={() => navigate({ view: 'home' })}
          className={`flex flex-col items-center justify-center space-y-1 transition cursor-pointer select-none ${
            isHomeActive
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <Home className={`w-5 h-5 ${isHomeActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[11px]">{t('home')}</span>
        </button>

        {/* Tab 2: Products / Shop */}
        <button
          id="bottom-nav-shop-tab"
          onClick={() => navigate({ view: 'shop' })}
          className={`flex flex-col items-center justify-center space-y-1 transition cursor-pointer select-none ${
            isShopActive
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 ${isShopActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[11px]">{t('shop')}</span>
        </button>

        {/* Tab 3: Cart */}
        <button
          id="bottom-nav-cart-tab"
          onClick={() => navigate({ view: 'cart' })}
          className={`flex flex-col items-center justify-center space-y-1 relative transition cursor-pointer select-none ${
            isCartActive
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <div className="relative">
            <ShoppingCart className={`w-5 h-5 ${isCartActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px]">{t('cart')}</span>
        </button>

        {/* Tab 4: Profile / Auth */}
        <button
          id="bottom-nav-profile-tab"
          onClick={() => {
            if (currentUser) {
              navigate({ view: 'profile' });
            } else {
              navigate({ view: 'auth', mode: 'login' });
            }
          }}
          className={`flex flex-col items-center justify-center space-y-1 transition cursor-pointer select-none ${
            isProfileActive
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <User className={`w-5 h-5 ${isProfileActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[11px]">{currentUser ? t('profile') : t('login')}</span>
        </button>
      </div>
    </nav>
  );
};
