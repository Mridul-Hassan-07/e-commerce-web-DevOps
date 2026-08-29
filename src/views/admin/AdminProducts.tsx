import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductVariant } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Video,
  Star,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react';

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, formatMoney, lang } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [brand, setBrand] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [primaryImage, setPrimaryImage] = useState('');
  const [imagesText, setImagesText] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descBn, setDescBn] = useState('');
  const [featuresEnText, setFeaturesEnText] = useState('');
  const [featuresBnText, setFeaturesBnText] = useState('');
  const [lowStockThreshold, setLowStockThreshold] = useState(5);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);

  // Video states (Section A7 & B3)
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoPlacement, setVideoPlacement] = useState<'gallery' | 'below_images' | 'below_description'>('below_images');

  // Variants state
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const filteredProducts = products.filter(p => {
    const q = searchTerm.toLowerCase();
    return p.title_en.toLowerCase().includes(q) || p.title_bn.includes(q) || p.brand.toLowerCase().includes(q);
  });

  const openCreateModal = () => {
    setEditingProduct(null);
    setTitleEn('');
    setTitleBn('');
    setBrand('');
    setCategoryId(categories[0]?.id || '');
    setPrimaryImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80');
    setImagesText('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80');
    setDescEn('Premium quality electronic gadget.');
    setDescBn('প্রিমিয়াম কোয়ালিটি গ্যাজেট।');
    setFeaturesEnText('Authentic Quality\n1 Year Warranty\nFast Delivery');
    setFeaturesBnText('অরিজিনাল কোয়ালিটি\n১ বছরের ওয়ারেন্টি\nদ্রুত ডেলিভারি');
    setLowStockThreshold(5);
    setIsFeatured(false);
    setIsActive(true);
    setVideoEnabled(false);
    setVideoUrl('');
    setVideoTitle('');
    setVideoPlacement('below_images');

    // Default variant
    setVariants([
      {
        id: `var-${Date.now()}-1`,
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        name_en: 'Standard Edition',
        name_bn: 'স্ট্যান্ডার্ড এডিশন',
        price: 2500,
        original_price: 3000,
        stock: 20,
        is_default: true
      }
    ]);

    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setTitleEn(p.title_en);
    setTitleBn(p.title_bn);
    setBrand(p.brand);
    setCategoryId(p.category_id);
    setPrimaryImage(p.primary_image);
    setImagesText(p.images.join('\n'));
    setDescEn(p.description_en);
    setDescBn(p.description_bn);
    setFeaturesEnText(p.features_en.join('\n'));
    setFeaturesBnText(p.features_bn.join('\n'));
    setLowStockThreshold(p.low_stock_threshold);
    setIsFeatured(p.is_featured);
    setIsActive(p.is_active);
    setVideoEnabled(p.video_enabled);
    setVideoUrl(p.video_url || '');
    setVideoTitle(p.video_title || '');
    setVideoPlacement(p.video_placement || 'below_images');
    setVariants(p.variants);

    setIsModalOpen(true);
  };

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        id: `var-${Date.now()}-${variants.length + 1}`,
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        name_en: 'New Variant',
        name_bn: 'নতুন ভ্যারিয়েন্ট',
        price: 2000,
        original_price: 2500,
        stock: 15,
        is_default: false
      }
    ]);
  };

  const handleUpdateVariant = (index: number, field: keyof ProductVariant, value: any) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    if (field === 'is_default' && value === true) {
      updated.forEach((v, i) => {
        if (i !== index) v.is_default = false;
      });
    }
    setVariants(updated);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length <= 1) {
      alert('A product must have at least one variant.');
      return;
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim()) return;

    const slug = (titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')).replace(/^-|-$/g, '') || `prod-${Date.now()}`;
    const imagesList = imagesText.split('\n').map(s => s.trim()).filter(Boolean);
    if (imagesList.length === 0) imagesList.push(primaryImage);

    const featEn = featuresEnText.split('\n').map(s => s.trim()).filter(Boolean);
    const featBn = featuresBnText.split('\n').map(s => s.trim()).filter(Boolean);

    const productPayload: Omit<Product, 'id' | 'created_at'> = {
      title_en: titleEn.trim(),
      title_bn: titleBn.trim() || titleEn.trim(),
      slug,
      category_id: categoryId,
      brand: brand.trim() || 'Generic',
      primary_image: primaryImage.trim() || imagesList[0],
      images: imagesList,
      description_en: descEn,
      description_bn: descBn || descEn,
      features_en: featEn,
      features_bn: featBn.length > 0 ? featBn : featEn,
      variants,
      rating: editingProduct?.rating || 4.8,
      reviews_count: editingProduct?.reviews_count || 12,
      sales_count: editingProduct?.sales_count || 0,
      is_featured: isFeatured,
      is_active: isActive,
      low_stock_threshold: Number(lowStockThreshold),
      video_enabled: videoEnabled,
      video_url: videoUrl.trim(),
      video_title: videoTitle.trim(),
      video_placement: videoPlacement
    };

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productPayload
      });
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
            Product & Inventory Management
          </h1>
          <p className="text-xs text-zinc-500">
            Manage multi-variant items, YouTube video embeds, pricing & stock thresholds
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative w-60">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[11px] uppercase tracking-wider text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Category & Brand</th>
                <th className="py-3 px-4">Variants & Stock</th>
                <th className="py-3 px-4">Base Price</th>
                <th className="py-3 px-4">Video</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {filteredProducts.map((p) => {
                const totalStock = p.variants.reduce((acc, v) => acc + v.stock, 0);
                const hasLowStock = p.variants.some(v => v.stock <= p.low_stock_threshold);
                const defaultV = p.variants.find(v => v.is_default) || p.variants[0];

                return (
                  <tr key={p.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={p.primary_image}
                          alt={p.title_en}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover bg-zinc-100 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-zinc-900 dark:text-white line-clamp-1">{p.title_en}</p>
                          <p className="text-[11px] text-zinc-400 line-clamp-1">{p.title_bn}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="font-semibold text-zinc-900 dark:text-white">{p.brand}</p>
                      <p className="text-[11px] text-zinc-400">
                        {categories.find(c => c.id === p.category_id)?.name_en || 'General'}
                      </p>
                    </td>

                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {p.variants.length} Variants
                        </span>
                        <div className="flex items-center space-x-1.5">
                          <span className={`text-[11px] font-mono font-bold ${
                            hasLowStock ? 'text-amber-500' : 'text-emerald-600'
                          }`}>
                            {totalStock} in stock
                          </span>
                          {hasLowStock && (
                            <span className="px-1 bg-amber-100 text-amber-800 rounded text-[9px] font-bold">
                              Low
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-black text-indigo-600 dark:text-indigo-400">
                      {formatMoney(defaultV.price)}
                    </td>

                    <td className="py-3 px-4">
                      {p.video_enabled && p.video_url ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 flex items-center space-x-1 w-fit">
                          <Video className="w-3 h-3" />
                          <span>{p.video_placement}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] text-zinc-400">None</span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.is_active ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-zinc-200 text-zinc-600'
                      }`}>
                        {p.is_active ? 'Active' : 'Draft'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-200"
                          title="Edit Product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${p.title_en}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white">
                {editingProduct ? 'Edit Product' : 'Create New Product'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
              {/* Basic Info */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-zinc-400">Basic Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold">Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold">Title (বাংলা)</label>
                    <input
                      type="text"
                      value={titleBn}
                      onChange={(e) => setTitleBn(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold">Brand</label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold">Category & Subcategory</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    >
                      {categories.filter(c => !c.parent_id).map((c) => {
                        const subCats = categories.filter(sub => sub.parent_id === c.id);
                        if (subCats.length > 0) {
                          return (
                            <optgroup key={c.id} label={`${c.name_en} (${c.name_bn})`}>
                              <option value={c.id}>
                                {c.name_en} (Main Category)
                              </option>
                              {subCats.map(sub => (
                                <option key={sub.id} value={sub.id}>
                                  ↳ {sub.name_en} ({sub.name_bn})
                                </option>
                              ))}
                            </optgroup>
                          );
                        }
                        return (
                          <option key={c.id} value={c.id}>
                            {c.name_en} ({c.name_bn})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase text-zinc-400">Images (URLs)</h4>
                <div className="space-y-1">
                  <label className="font-bold">Primary Display Image URL</label>
                  <input
                    type="url"
                    required
                    value={primaryImage}
                    onChange={(e) => setPrimaryImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[11px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold">Gallery Images (One URL per line)</label>
                  <textarea
                    rows={2}
                    value={imagesText}
                    onChange={(e) => setImagesText(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-[11px] resize-none"
                  />
                </div>
              </div>

              {/* Multi-Variants Config (Section B3) */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs uppercase text-zinc-900 dark:text-white">
                    Product Variants (SKU, Price, Stock)
                  </h4>
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="px-2.5 py-1 bg-indigo-600 text-white rounded-lg text-[11px] font-bold"
                  >
                    + Add Variant
                  </button>
                </div>

                <div className="space-y-2">
                  {variants.map((v, i) => (
                    <div key={v.id || i} className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 grid grid-cols-1 sm:grid-cols-6 gap-2 items-center">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="Name (EN)"
                          value={v.name_en}
                          onChange={(e) => handleUpdateVariant(i, 'name_en', e.target.value)}
                          className="w-full px-2 py-1 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="SKU"
                          value={v.sku}
                          onChange={(e) => handleUpdateVariant(i, 'sku', e.target.value)}
                          className="w-full px-2 py-1 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Price ৳"
                          value={v.price}
                          onChange={(e) => handleUpdateVariant(i, 'price', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 font-bold text-indigo-600 text-xs"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Stock"
                          value={v.stock}
                          onChange={(e) => handleUpdateVariant(i, 'stock', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-zinc-50 dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-700 font-mono text-xs"
                        />
                      </div>
                      <div className="flex items-center justify-end space-x-2">
                        <label className="flex items-center space-x-1 text-[10px]">
                          <input
                            type="radio"
                            name="default_variant"
                            checked={v.is_default}
                            onChange={() => handleUpdateVariant(i, 'is_default', true)}
                          />
                          <span>Def</span>
                        </label>
                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVariant(i)}
                            className="text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Placement Controls (Section A7 & B3) */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Video className="w-4 h-4 text-violet-600" />
                    <span className="font-bold text-zinc-900 dark:text-white">Product Video Embed Controls</span>
                  </div>
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={videoEnabled}
                      onChange={(e) => setVideoEnabled(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span className="font-bold text-xs">Enable Video</span>
                  </label>
                </div>

                {videoEnabled && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="sm:col-span-2 space-y-1">
                      <label className="font-bold">YouTube / Embed Video URL</label>
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/embed/..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-[11px]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-bold">Video Placement</label>
                      <select
                        value={videoPlacement}
                        onChange={(e) => setVideoPlacement(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
                      >
                        <option value="gallery">In Gallery</option>
                        <option value="below_images">Below Images</option>
                        <option value="below_description">Below Description</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Threshold & Flags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="font-bold">Low Stock Alert Threshold</label>
                  <input
                    type="number"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    id="is_featured_cb"
                    className="rounded text-indigo-600"
                  />
                  <label htmlFor="is_featured_cb" className="font-bold cursor-pointer">Feature on Homepage</label>
                </div>

                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    id="is_active_cb"
                    className="rounded text-indigo-600"
                  />
                  <label htmlFor="is_active_cb" className="font-bold cursor-pointer">Published / Active</label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center space-x-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
