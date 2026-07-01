/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { Plus, Edit3, Trash2, Search, X, Tag, RefreshCw } from 'lucide-react';

export default function ManageProducts() {
  const { products, addProduct, updateProduct, deleteProduct, changeView } = useApp();
  
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(50);
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('women');
  const [stock, setStock] = useState(10);
  const [sizesInput, setSizesInput] = useState('S, M, L, XL');
  const [colorsInput, setColorsInput] = useState('Off-White, Sage Green');
  const [imageUrl, setImageUrl] = useState('');

  // Search filter
  const filteredList = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase().trim();
    return products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }, [products, search]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setDescription('');
    setPrice(50);
    setOriginalPrice('');
    setCategory('women');
    setStock(10);
    setSizesInput('S, M, L, XL');
    setColorsInput('Off-White, Black');
    setImageUrl('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setDescription(p.description);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice ? String(p.originalPrice) : '');
    setCategory(p.category);
    setStock(p.stock);
    setSizesInput(p.sizes.join(', '));
    setColorsInput(p.colors.join(', '));
    setImageUrl(p.images[0] || '');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !description.trim() || !imageUrl.trim()) {
      alert('Please fill out all required fields.');
      return;
    }

    const sizes = sizesInput.split(',').map(s => s.trim()).filter(Boolean);
    const colors = colorsInput.split(',').map(c => c.trim()).filter(Boolean);
    const origPrice = originalPrice.trim() ? Number(originalPrice) : undefined;

    const commonData = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      originalPrice: origPrice,
      category,
      stock: Number(stock),
      sizes,
      colors,
      images: [imageUrl.trim()],
      isFeatured: editingProduct ? editingProduct.isFeatured : false
    };

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...commonData
      });
      alert('Product updated successfully!');
    } else {
      addProduct({
        ...commonData,
        isFeatured: true // brand additions made featured by default
      });
      alert('New clothing article appended to catalog!');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete "${name}"? This removes it from catalogs and client bags.`)) {
      deleteProduct(id);
    }
  };

  return (
    <div id="admin-products-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-charcoal-900">Manage Apparel Inventory</h1>
          <p className="text-xs text-charcoal-500 mt-1">Append, edit, or remove catalog lines instantly stored in active memory.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-1.5 rounded-lg bg-charcoal-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-gold-500 transition-all cursor-pointer shadow-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Append New Product
        </button>
      </div>

      {/* Admin Tab rail links */}
      <div className="flex border-b border-charcoal-200 pb-2 mb-8 gap-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button onClick={() => changeView('admin-dashboard')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Overview Stats</button>
        <button onClick={() => changeView('admin-products')} className="py-1.5 px-3 rounded-lg bg-charcoal-900 text-white cursor-pointer">Manage Products ({products.length})</button>
        <button onClick={() => changeView('admin-orders')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Manage Orders</button>
        <button onClick={() => changeView('admin-users')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Manage Users</button>
      </div>

      {/* Interactive search bar */}
      <div className="relative max-w-md mb-6">
        <input
          type="text"
          placeholder="Search items by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-charcoal-200 bg-white py-2 pl-10 pr-4 text-xs outline-none focus:border-gold-400"
        />
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
      </div>

      {/* Grid listing */}
      <div className="bg-white rounded-xl border border-charcoal-100 overflow-hidden shadow-3xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-charcoal-600">
            <thead className="bg-charcoal-50 text-3xs font-extrabold uppercase tracking-widest text-charcoal-400 border-b border-charcoal-100">
              <tr>
                <th className="py-4 px-6">Product Details</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Pricing</th>
                <th className="py-4 px-4">Active Stock</th>
                <th className="py-4 px-4">Sizes / Colors</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {filteredList.map((p) => (
                <tr key={p.id} className="hover:bg-charcoal-50/20">
                  <td className="py-4 px-6 flex gap-4">
                    <div className="h-12 w-9 rounded overflow-hidden bg-charcoal-100 border border-charcoal-100 shrink-0">
                      <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="self-center">
                      <h4 className="font-bold text-charcoal-900">{p.name}</h4>
                      <span className="text-[10px] font-mono font-semibold text-charcoal-400">{p.id}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 capitalize font-semibold text-charcoal-800">{p.category}</td>
                  <td className="py-4 px-4">
                    <span className="font-extrabold text-charcoal-900">${p.price.toFixed(2)}</span>
                    {p.originalPrice && (
                      <span className="block text-[10px] text-charcoal-400 line-through">${p.originalPrice.toFixed(2)}</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-mono font-bold ${p.stock === 0 ? 'text-red-500' : p.stock <= 5 ? 'text-yellow-600' : 'text-charcoal-800'}`}>
                      {p.stock === 0 ? 'Sold Out' : `${p.stock} units`}
                    </span>
                  </td>
                  <td className="py-4 px-4 space-y-1">
                    <div className="flex flex-wrap gap-1">
                      {p.sizes.map(s => (
                        <span key={s} className="px-1.5 py-0.5 rounded text-[9px] bg-charcoal-100 font-bold">{s}</span>
                      ))}
                    </div>
                    <p className="text-[10px] text-charcoal-400 max-w-[150px] truncate">{p.colors.join(', ')}</p>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex gap-2.5 justify-end">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-md border border-charcoal-200 text-charcoal-600 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50/25 transition-all cursor-pointer"
                        title="Edit specifications"
                      >
                        <Edit3 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        className="p-1.5 rounded-md border border-charcoal-200 text-charcoal-600 hover:border-red-400 hover:text-red-600 hover:bg-red-50/25 transition-all cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredList.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-charcoal-500 italic bg-charcoal-50/10">No items match search. Click Append to add some.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* OVERLAY INTERACTIVE MODAL */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl border border-charcoal-100 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in relative cursor-default"
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-charcoal-100 shrink-0">
              <h3 className="font-serif text-xl font-bold text-charcoal-900 flex items-center gap-1.5">
                <Tag size={18} className="text-gold-500" /> {editingProduct ? 'Edit Product Line' : 'Append New Catalog Article'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-charcoal-400 hover:text-charcoal-700 p-1.5 rounded-full hover:bg-charcoal-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Modal Content Body */}
            <div className="overflow-y-auto p-6 flex-1 space-y-4 text-xs">
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Product Name/Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Classic Trench Coat"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Product Description *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write material details, drape look, pocket specifications..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-xl border border-charcoal-200 bg-charcoal-50 p-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-charcoal-500 uppercase">Sale Price ($) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-charcoal-500 uppercase">Original Price ($) (Optional)</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="None"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-charcoal-500 uppercase">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white capitalize"
                    >
                      <option value="women">Women</option>
                      <option value="men">Men</option>
                      <option value="kids">Kids</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-charcoal-500 uppercase">Active Stock Inventory *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={stock}
                      onChange={(e) => setStock(Number(e.target.value))}
                      className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Sizes (comma-separated list) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. S, M, L, XL"
                    value={sizesInput}
                    onChange={(e) => setSizesInput(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Colors (comma-separated list) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sage Green, Off-White, Black"
                    value={colorsInput}
                    onChange={(e) => setColorsInput(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Cover Image URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="Paste Unsplash image URL..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 h-11 border border-charcoal-300 text-charcoal-700 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-red-500 hover:border-red-500 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] h-11 bg-charcoal-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-gold-500 transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <RefreshCw size={14} /> {editingProduct ? 'Commit Changes' : 'Append to Catalog'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
