import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  Truck,
  ChevronDown,
  Package,
  Layers,
  PhoneCall,
  Lock,
  ChevronRight,
  Sparkles,
  Tag,
  MessageCircle
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    navigate,
    lang,
    setLang,
    t,
    theme,
    toggleTheme,
    cartCount,
    cartSubtotal,
    formatMoney,
    categories,
    products,
    currentUser,
    logoutUser,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    siteSettings
  } = useApp();

  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Live search matching helper
  const liveSearchResults = React.useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 1) return [];
    const q = searchQuery.toLowerCase().trim();

    return products.filter(p => {
      if (!p.is_active) return false;
      const titleEn = p.title_en.toLowerCase();
      const titleBn = p.title_bn.toLowerCase();
      const brand = p.brand.toLowerCase();
      const descEn = p.description_en.toLowerCase();
      const descBn = p.description_bn.toLowerCase();
      const keywords = (p.keywords || []).some(k => k.toLowerCase().includes(q));
      const skus = p.variants.some(v => v.sku.toLowerCase().includes(q) || v.name_en.toLowerCase().includes(q) || v.name_bn.toLowerCase().includes(q));
      const cat = categories.find(c => c.id === p.category_id);
      const catMatch = cat && (cat.name_en.toLowerCase().includes(q) || cat.name_bn.toLowerCase().includes(q) || cat.slug.toLowerCase().includes(q));

      return (
        titleEn.includes(q) ||
        titleBn.includes(q) ||
        brand.includes(q) ||
        descEn.includes(q) ||
        descBn.includes(q) ||
        keywords ||
        skus ||
        catMatch
      );
    }).slice(0, 6);
  }, [products, categories, searchQuery]);

  // Click outside listener for search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ view: 'shop', search: searchQuery.trim() });
      setIsSearchOpenMobile(false);
      setIsSearchFocused(false);
    }
  };

  // Group categories into parent categories and subcategories
  const mainCategories = categories.filter(c => !c.parent_id);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      {/* Top Banner Bar (Desktop) */}
      <div className="hidden md:block bg-zinc-900 text-zinc-300 text-xs py-1.5 px-4 sm:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Hotline & COD perk */}
          <div className="flex items-center space-x-5">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-medium">
              <Truck className="w-3.5 h-3.5" />
              <span>{t('free_shipping_notice')}</span>
            </span>
            <a
              href="tel:01577686999"
              className="flex items-center space-x-1.5 text-zinc-300 hover:text-white transition font-medium"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'bn' ? 'হটলাইন: ০১৫৭৭৬৮৬৯৯৯' : 'Hotline: 01577686999'}</span>
            </a>
            <a
              href="https://wa.me/8801577686999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href={siteSettings.facebook_url || "https://www.facebook.com/share/1X14b7NztN/"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition font-medium"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </a>
          </div>

          {/* Right: Quick actions, Lang, Theme & Admin Shortcut */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate({ view: 'order_track' })}
              className="hover:text-white transition flex items-center space-x-1 cursor-pointer"
            >
              <Package className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('track_order')}</span>
            </button>

            <span className="text-zinc-600">|</span>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 bg-zinc-800 rounded-md p-0.5 border border-zinc-700">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  lang === 'en'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('bn')}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition cursor-pointer ${
                  lang === 'bn'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded text-zinc-400 hover:text-amber-400 transition cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <span className="text-zinc-600">|</span>

            {/* Admin Portal Shortcut */}
            <button
              onClick={() => navigate({ view: 'admin', section: 'dashboard' })}
              className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 font-medium transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t('admin_portal')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-6">
          {/* Mobile Menu Hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-trigger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo - MehnajMart */}
          <div
            onClick={() => navigate({ view: 'home' })}
            className="flex items-center space-x-2.5 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <span className="font-black text-xl tracking-tighter">M</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-zinc-900 dark:text-white">
                  Mehnaj<span className="text-indigo-600 dark:text-indigo-400">Mart</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/30">
                  BD
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                Cash On Delivery
              </p>
            </div>
          </div>

          {/* Desktop Categories Dropdown */}
          <div className="hidden lg:flex items-center relative">
            <button
              id="categories-dropdown-btn"
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer border border-zinc-200 dark:border-zinc-700/60"
            >
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{t('categories')}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCategoryDropdownOpen && (
              <div
                onMouseLeave={() => setIsCategoryDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span>{lang === 'bn' ? 'ক্যাটাগরি সমূহ' : 'All Categories'}</span>
                  <Tag className="w-3.5 h-3.5 text-indigo-500" />
                </div>

                <div className="py-1 max-h-[70vh] overflow-y-auto">
                  {mainCategories.map((cat) => {
                    const subCats = categories.filter(c => c.parent_id === cat.id);
                    return (
                      <div key={cat.id} className="border-b border-zinc-100 dark:border-zinc-800/60 last:border-0">
                        <button
                          onClick={() => {
                            navigate({ view: 'shop', categorySlug: cat.slug });
                            setIsCategoryDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center justify-between group"
                        >
                          <span className="flex items-center space-x-2">
                            <span>{lang === 'bn' ? cat.name_bn : cat.name_en}</span>
                          </span>
                          {subCats.length > 0 && (
                            <span className="text-[11px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-normal">
                              {subCats.length} {lang === 'bn' ? 'সাব' : 'subs'}
                            </span>
                          )}
                        </button>

                        {/* Subcategories (e.g. Under Lifestyle) */}
                        {subCats.length > 0 && (
                          <div className="pl-6 pr-3 pb-2 space-y-1 bg-zinc-50/70 dark:bg-zinc-950/50 py-1.5">
                            {subCats.map(sub => (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  navigate({ view: 'shop', categorySlug: cat.slug, subcategorySlug: sub.slug });
                                  setIsCategoryDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center justify-between"
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

                <div className="p-2 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => {
                      navigate({ view: 'shop' });
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold text-center bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-xs"
                  >
                    {t('view_all')} {t('shop')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Search Bar with Live Predictive Autocomplete */}
          <div ref={searchContainerRef} className="hidden md:flex flex-1 max-w-lg relative items-center">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                id="desktop-search-input"
                type="text"
                placeholder={lang === 'bn' ? 'পোশাক, স্মার্ট গ্যাজেট, লাইফস্টাইল বা কিচেন সামগ্রী খুঁজুন...' : 'Search clothing, gadgets, fashion, kitchen...'}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-24 py-2.5 rounded-full text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition shadow-inner"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-20 top-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                className="absolute right-1.5 top-1 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-full transition shadow-sm cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Live Predictive Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-2 z-50 animate-in fade-in duration-100">
                {liveSearchResults.length > 0 ? (
                  <div>
                    <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <span>{lang === 'bn' ? 'সরাসরি পণ্য ফলাফল' : 'Instant Matches'}</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                        {liveSearchResults.length} {lang === 'bn' ? 'টি আইটেম' : 'items'}
                      </span>
                    </div>

                    <div className="divide-y divide-zinc-100 dark:divide-zinc-800 max-h-80 overflow-y-auto">
                      {liveSearchResults.map((prod) => {
                        const defaultVar = prod.variants.find(v => v.is_default) || prod.variants[0];
                        const cat = categories.find(c => c.id === prod.category_id);
                        return (
                          <div
                            key={prod.id}
                            onClick={() => {
                              navigate({ view: 'product', slug: prod.slug });
                              setIsSearchFocused(false);
                            }}
                            className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 cursor-pointer transition"
                          >
                            <img
                              src={prod.primary_image}
                              alt={prod.title_en}
                              referrerPolicy="no-referrer"
                              className="w-11 h-11 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                {lang === 'bn' ? prod.title_bn : prod.title_en}
                              </p>
                              <div className="flex items-center space-x-2 mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                                <span>{cat ? (lang === 'bn' ? cat.name_bn : cat.name_en) : prod.brand}</span>
                                <span>•</span>
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                                  {formatMoney(defaultVar.price)}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-zinc-400" />
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <button
                        onClick={() => {
                          navigate({ view: 'shop', search: searchQuery.trim() });
                          setIsSearchFocused(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-indigo-600 hover:text-white text-indigo-600 dark:text-indigo-400 text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>
                          {lang === 'bn'
                            ? `"${searchQuery}" এর সব ফলাফল দেখুন`
                            : `View all results for "${searchQuery}"`}
                        </span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-zinc-500 dark:text-zinc-400 space-y-1">
                    <p className="font-semibold">{lang === 'bn' ? 'কোনো পণ্য মেলেনি' : 'No matching items found'}</p>
                    <p className="text-[11px]">{lang === 'bn' ? 'অন্য কোনো কিওয়ার্ড বা ক্যাটাগরি অনুসন্ধান করুন।' : 'Try searching with different keywords.'}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons (Cart, Account, Hotline Mobile) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
              className="md:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Mobile Lang Switcher Button */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="md:hidden px-2 py-1 rounded-md text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
            >
              {lang === 'en' ? 'বাংলা' : 'EN'}
            </button>

            {/* Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={() => navigate({ view: 'cart' })}
              className="relative flex items-center space-x-2 px-3 py-2 rounded-xl text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">{t('cart')}</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white leading-none">
                  {formatMoney(cartSubtotal)}
                </span>
              </div>
            </button>

            {/* User Account / Profile */}
            <div className="relative">
              {currentUser ? (
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-2 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 hidden sm:inline text-zinc-400" />
                </button>
              ) : (
                <button
                  id="header-login-btn"
                  onClick={() => navigate({ view: 'auth', mode: 'login' })}
                  className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>{t('login')}</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && currentUser && (
                <div
                  onMouseLeave={() => setIsUserDropdownOpen(false)}
                  className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">{currentUser.phone}</p>
                  </div>

                  <button
                    onClick={() => {
                      navigate({ view: 'profile' });
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    {t('profile')}
                  </button>

                  <button
                    onClick={() => {
                      navigate({ view: 'my_orders' });
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
                  >
                    {t('my_orders')}
                  </button>

                  <div className="border-t border-zinc-100 dark:border-zinc-800 my-1"></div>

                  <button
                    onClick={() => {
                      logoutUser();
                      setIsUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isSearchOpenMobile && (
          <form onSubmit={handleSearchSubmit} className="md:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder={lang === 'bn' ? 'পোশাক, গ্যাজেট, ফ্যাশন বা কিচেন খুঁজুন...' : 'Search clothing, gadgets, lifestyle, kitchen...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-20 py-2.5 rounded-xl text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
              >
                Search
              </button>
            </div>
          </form>
        )}
      </div>
    </header>
  );
};
