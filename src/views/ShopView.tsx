import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Star,
  ShoppingBag,
  ArrowUpDown,
  Check,
  PackageX,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';

interface ShopViewProps {
  initialCategorySlug?: string;
  initialSubcategorySlug?: string;
  initialSearch?: string;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialCategorySlug,
  initialSubcategorySlug,
  initialSearch
}) => {
  const {
    products,
    categories,
    navigate,
    lang,
    t,
    formatMoney,
    addToCart
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategorySlug || 'all');
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch || '');
  const [selectedSort, setSelectedSort] = useState<'newest' | 'price_low' | 'price_high' | 'popular'>('newest');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Sync state if incoming props change
  useEffect(() => {
    if (initialCategorySlug !== undefined) setSelectedCategory(initialCategorySlug || 'all');
    if (initialSubcategorySlug !== undefined) setSelectedSubcategory(initialSubcategorySlug || 'all');
    if (initialSearch !== undefined) setSearchTerm(initialSearch || '');
  }, [initialCategorySlug, initialSubcategorySlug, initialSearch]);

  const mainCategories = useMemo(() => categories.filter(c => !c.parent_id), [categories]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product.is_active) return false;

      // Category filter (support parent category & child subcategory)
      if (selectedCategory !== 'all') {
        const cat = categories.find(c => c.slug === selectedCategory);
        if (cat) {
          // If it's a parent category, match products that either belong to this category OR belong to one of its subcategories
          const subCategoryIds = categories.filter(c => c.parent_id === cat.id).map(c => c.id);
          const isCategoryMatch = product.category_id === cat.id || subCategoryIds.includes(product.category_id);
          if (!isCategoryMatch) return false;
        }
      }

      // Subcategory filter
      if (selectedSubcategory !== 'all') {
        const subCat = categories.find(c => c.slug === selectedSubcategory);
        if (subCat) {
          const isSubMatch = product.subcategory_id === subCat.id || product.category_id === subCat.id;
          if (!isSubMatch) return false;
        }
      }

      // Comprehensive multi-field search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        const matchTitleEn = product.title_en.toLowerCase().includes(q);
        const matchTitleBn = product.title_bn.toLowerCase().includes(q);
        const matchBrand = product.brand.toLowerCase().includes(q);
        const matchDescEn = product.description_en.toLowerCase().includes(q);
        const matchDescBn = product.description_bn.toLowerCase().includes(q);
        const matchKeywords = (product.keywords || []).some(k => k.toLowerCase().includes(q));
        const matchSkuOrVariant = product.variants.some(
          v => v.sku.toLowerCase().includes(q) || v.name_en.toLowerCase().includes(q) || v.name_bn.toLowerCase().includes(q)
        );
        const catObj = categories.find(c => c.id === product.category_id);
        const matchCatName = catObj && (catObj.name_en.toLowerCase().includes(q) || catObj.name_bn.toLowerCase().includes(q));

        if (
          !matchTitleEn &&
          !matchTitleBn &&
          !matchBrand &&
          !matchDescEn &&
          !matchDescBn &&
          !matchKeywords &&
          !matchSkuOrVariant &&
          !matchCatName
        ) {
          return false;
        }
      }

      // Price filter
      const defaultVariant = product.variants.find(v => v.is_default) || product.variants[0];
      if (defaultVariant.price > maxPrice) {
        return false;
      }

      // Stock filter
      if (inStockOnly) {
        const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
        if (totalStock <= 0) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = (a.variants.find(v => v.is_default) || a.variants[0]).price;
      const priceB = (b.variants.find(v => v.is_default) || b.variants[0]).price;

      if (selectedSort === 'price_low') return priceA - priceB;
      if (selectedSort === 'price_high') return priceB - priceA;
      if (selectedSort === 'popular') return b.sales_count - a.sales_count;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [products, categories, selectedCategory, selectedSubcategory, searchTerm, selectedSort, maxPrice, inStockOnly]);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSearchTerm('');
    setMaxPrice(10000);
    setInStockOnly(false);
    setSelectedSort('newest');
  };

  const currentCategoryObj = categories.find(c => c.slug === selectedCategory);
  const currentSubcategoryObj = categories.find(c => c.slug === selectedSubcategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-1">
            <span
              onClick={clearAllFilters}
              className="hover:text-indigo-600 cursor-pointer"
            >
              {t('shop')}
            </span>
            {currentCategoryObj && (
              <>
                <span>/</span>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  {lang === 'bn' ? currentCategoryObj.name_bn : currentCategoryObj.name_en}
                </span>
              </>
            )}
            {currentSubcategoryObj && (
              <>
                <span>/</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {lang === 'bn' ? currentSubcategoryObj.name_bn : currentSubcategoryObj.name_en}
                </span>
              </>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {currentSubcategoryObj
              ? (lang === 'bn' ? currentSubcategoryObj.name_bn : currentSubcategoryObj.name_en)
              : currentCategoryObj
              ? (lang === 'bn' ? currentCategoryObj.name_bn : currentCategoryObj.name_en)
              : t('shop')}
          </h1>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {filteredProducts.length} {t('items_count')}
            {searchTerm && <span> • matching <strong className="text-zinc-900 dark:text-white">"{searchTerm}"</strong></span>}
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-72">
            <input
              type="text"
              placeholder={lang === 'bn' ? 'পণ্য বা ক্যাটাগরি খুঁজুন...' : 'Search all products & categories...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 border border-transparent focus:border-indigo-500 focus:outline-none transition"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-transparent focus:border-indigo-500 focus:outline-none font-medium cursor-pointer"
            >
              <option value="newest">{t('sort_newest')}</option>
              <option value="price_low">{t('sort_price_low')}</option>
              <option value="price_high">{t('sort_price_high')}</option>
              <option value="popular">{t('sort_popular')}</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>

          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 cursor-pointer"
            title="Open Filters"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Active Filter Badges */}
      {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchTerm || inStockOnly || maxPrice < 10000) && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-zinc-400 font-medium">Active filters:</span>

          {currentCategoryObj && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200 dark:border-indigo-800">
              <span>Category: {lang === 'bn' ? currentCategoryObj.name_bn : currentCategoryObj.name_en}</span>
              <button onClick={() => { setSelectedCategory('all'); setSelectedSubcategory('all'); }} className="hover:text-indigo-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {currentSubcategoryObj && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold border border-violet-200 dark:border-violet-800">
              <span>Subcategory: {lang === 'bn' ? currentSubcategoryObj.name_bn : currentSubcategoryObj.name_en}</span>
              <button onClick={() => setSelectedSubcategory('all')} className="hover:text-violet-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchTerm && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-semibold border border-amber-200 dark:border-amber-800">
              <span>Keyword: "{searchTerm}"</span>
              <button onClick={() => setSearchTerm('')} className="hover:text-amber-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800">
              <span>In Stock Only</span>
              <button onClick={() => setInStockOnly(false)} className="hover:text-emerald-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="text-xs text-rose-500 hover:underline font-semibold ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center space-x-2 font-bold text-sm text-zinc-900 dark:text-white">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>{t('filters')}</span>
              </div>
              {(selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchTerm || maxPrice < 10000 || inStockOnly) && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
                >
                  {t('clear_filters')}
                </button>
              )}
            </div>

            {/* Category & Subcategory Filter */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span>{t('categories')}</span>
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
              </label>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'all' && selectedSubcategory === 'all'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <span>{t('view_all')} ({products.length})</span>
                  {selectedCategory === 'all' && selectedSubcategory === 'all' && <Check className="w-3.5 h-3.5" />}
                </button>

                {mainCategories.map((cat) => {
                  const subCats = categories.filter(c => c.parent_id === cat.id);
                  const isParentActive = selectedCategory === cat.slug;
                  const catItemCount = products.filter(p => {
                    const subIds = subCats.map(s => s.id);
                    return p.category_id === cat.id || subIds.includes(p.category_id);
                  }).length;

                  return (
                    <div key={cat.id} className="space-y-1">
                      <button
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setSelectedSubcategory('all');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                          isParentActive && selectedSubcategory === 'all'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <span>{lang === 'bn' ? cat.name_bn : cat.name_en}</span>
                        <span className="text-[11px] opacity-75">({catItemCount})</span>
                      </button>

                      {/* Subcategories */}
                      {subCats.length > 0 && (
                        <div className="pl-4 pr-1 space-y-1 py-1">
                          {subCats.map((sub) => {
                            const isSubActive = selectedSubcategory === sub.slug;
                            const subItemCount = products.filter(p => p.subcategory_id === sub.id || p.category_id === sub.id).length;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setSelectedCategory(cat.slug);
                                  setSelectedSubcategory(sub.slug);
                                }}
                                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition flex items-center justify-between cursor-pointer ${
                                  isSubActive
                                    ? 'bg-violet-600 text-white shadow-xs'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900'
                                }`}
                              >
                                <span>• {lang === 'bn' ? sub.name_bn : sub.name_en}</span>
                                <span className="opacity-75">({subItemCount})</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold uppercase tracking-wider text-zinc-400">
                  {t('price_range')}
                </label>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {formatMoney(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={15000}
                step={250}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>{formatMoney(500)}</span>
                <span>{formatMoney(15000)}</span>
              </div>
            </div>

            {/* In Stock Only Toggle */}
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <label className="flex items-center space-x-2.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 cursor-pointer"
                />
                <span>{t('in_stock_only')}</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <div className="relative w-80 max-w-full bg-white dark:bg-zinc-900 h-full p-6 shadow-2xl overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-bold text-base text-zinc-900 dark:text-white">{t('filters')}</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-400">{t('categories')}</label>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                      selectedCategory === 'all' && selectedSubcategory === 'all' ? 'bg-indigo-600 text-white' : 'text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {t('view_all')}
                  </button>
                  {mainCategories.map((cat) => {
                    const subCats = categories.filter(c => c.parent_id === cat.id);
                    return (
                      <div key={cat.id} className="space-y-1">
                        <button
                          onClick={() => {
                            setSelectedCategory(cat.slug);
                            setSelectedSubcategory('all');
                            setIsMobileFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                            selectedCategory === cat.slug && selectedSubcategory === 'all' ? 'bg-indigo-600 text-white' : 'text-zinc-700 dark:text-zinc-300'
                          }`}
                        >
                          {lang === 'bn' ? cat.name_bn : cat.name_en}
                        </button>
                        {subCats.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setSelectedCategory(cat.slug);
                              setSelectedSubcategory(sub.slug);
                              setIsMobileFilterOpen(false);
                            }}
                            className={`w-full text-left pl-6 pr-3 py-1.5 rounded-lg text-xs font-medium ${
                              selectedSubcategory === sub.slug ? 'bg-violet-600 text-white' : 'text-zinc-600 dark:text-zinc-400'
                            }`}
                          >
                            • {lang === 'bn' ? sub.name_bn : sub.name_en}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between text-xs font-bold">
                  <span>{t('price_range')}</span>
                  <span className="text-indigo-600">{formatMoney(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={15000}
                  step={250}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs cursor-pointer shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
                <PackageX className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                {t('no_products_found')}
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                No items match your search "{searchTerm}". Try different keywords, price bounds, or clear active category filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition cursor-pointer"
              >
                {t('clear_filters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => {
                const defaultVariant = product.variants.find(v => v.is_default) || product.variants[0];
                const hasDiscount = defaultVariant.original_price && defaultVariant.original_price > defaultVariant.price;
                const discountPercent = hasDiscount
                  ? Math.round(((defaultVariant.original_price! - defaultVariant.price) / defaultVariant.original_price!) * 100)
                  : 0;

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-500/40 transition-all"
                  >
                    {/* Product Image */}
                    <div
                      onClick={() => navigate({ view: 'product', slug: product.slug })}
                      className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800 cursor-pointer"
                    >
                      <img
                        src={product.primary_image}
                        alt={product.title_en}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {hasDiscount && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[11px] font-bold shadow-xs">
                          -{discountPercent}%
                        </span>
                      )}

                      <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-zinc-900/80 backdrop-blur text-white text-[10px] font-medium">
                        COD Available
                      </span>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{product.brand}</span>
                          <div className="flex items-center space-x-1 text-amber-400">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="font-semibold text-zinc-700 dark:text-zinc-300">{product.rating}</span>
                          </div>
                        </div>

                        <h3
                          onClick={() => navigate({ view: 'product', slug: product.slug })}
                          className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer line-clamp-2 leading-snug"
                        >
                          {lang === 'bn' ? product.title_bn : product.title_en}
                        </h3>
                      </div>

                      {/* Pricing & Buttons */}
                      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                        <div className="flex items-baseline space-x-2 mb-3">
                          <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                            {formatMoney(defaultVariant.price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-zinc-400 line-through">
                              {formatMoney(defaultVariant.original_price!)}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => addToCart(product, defaultVariant, 1, false)}
                            className="w-full py-2 px-2 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{t('add_to_cart')}</span>
                          </button>

                          <button
                            onClick={() => addToCart(product, defaultVariant, 1, true)}
                            className="w-full py-2 px-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center justify-center shadow-xs cursor-pointer"
                          >
                            <span>{lang === 'bn' ? 'অর্ডার করুন' : 'Buy Now'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
