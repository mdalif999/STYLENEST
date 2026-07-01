/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, RotateCcw, Search, Grid, List, Check } from 'lucide-react';

export default function ProductListing() {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useApp();

  // Filter States
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [sortBy, setSortBy] = useState<string>('default');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Derive unique sizes, colors, and max price dynamically
  const { allSizes, allColors, absoluteMaxPrice } = useMemo(() => {
    const sizes = new Set<string>();
    const colors = new Set<string>();
    let highestPrice = 100;

    products.forEach(p => {
      p.sizes.forEach(s => sizes.add(s));
      p.colors.forEach(c => colors.add(c));
      if (p.price > highestPrice) highestPrice = p.price;
    });

    return {
      allSizes: Array.from(sizes),
      allColors: Array.from(colors),
      absoluteMaxPrice: Math.ceil(highestPrice)
    };
  }, [products]);

  // Reset local filters when category changes to prevent empty results from outdated filter selections
  useEffect(() => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('default');
    if (absoluteMaxPrice) {
      setMaxPrice(absoluteMaxPrice);
    }
  }, [selectedCategory, absoluteMaxPrice]);

  // Handle sizes click
  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  // Handle colors click
  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(absoluteMaxPrice);
    setSearchQuery('');
    setSortBy('default');
  };

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory) {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Sizes Filter
    if (selectedSizes.length > 0) {
      result = result.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    }

    // Colors Filter
    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }

    // Price Filter
    result = result.filter(p => p.price <= maxPrice);

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, selectedSizes, selectedColors, maxPrice, sortBy]);

  return (
    <div id="shop-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Top Title & Quick Context */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-charcoal-100 pb-5 mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-charcoal-900 capitalize">
            {selectedCategory ? `${selectedCategory}'s Collection` : 'All Apparel Catalog'}
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Showing {filteredProducts.length} premium designs {searchQuery ? `for "${searchQuery}"` : ''}
          </p>
        </div>

        {/* Quick Utilities */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 rounded-lg border border-charcoal-200 bg-white px-3 py-1.5 shadow-xs">
            <ArrowUpDown size={14} className="text-charcoal-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-bold text-charcoal-700 outline-none bg-transparent cursor-pointer"
            >
              <option value="default">Default Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>

          {/* Reset Filters Utility */}
          {(selectedCategory || selectedSizes.length > 0 || selectedColors.length > 0 || searchQuery || sortBy !== 'default') && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
        
        {/* SIDEBAR FILTERS (Desktop) */}
        <aside id="shop-sidebar" className="hidden lg:block space-y-8 bg-white border border-charcoal-100/60 p-6 rounded-xl shadow-xs self-start">
          
          {/* Categories Selector */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-2">
              Categories
            </h3>
            <div className="flex flex-col gap-2 text-xs">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`text-left py-1 font-semibold transition-colors hover:text-gold-500 ${!selectedCategory ? 'text-gold-600' : 'text-charcoal-600'}`}
              >
                All Products ({products.length})
              </button>
              <button
                onClick={() => setSelectedCategory('women')}
                className={`text-left py-1 font-semibold transition-colors hover:text-gold-500 ${selectedCategory === 'women' ? 'text-gold-600' : 'text-charcoal-600'}`}
              >
                Women's Apparel
              </button>
              <button
                onClick={() => setSelectedCategory('men')}
                className={`text-left py-1 font-semibold transition-colors hover:text-gold-500 ${selectedCategory === 'men' ? 'text-gold-600' : 'text-charcoal-600'}`}
              >
                Men's Apparel
              </button>
              <button
                onClick={() => setSelectedCategory('kids')}
                className={`text-left py-1 font-semibold transition-colors hover:text-gold-500 ${selectedCategory === 'kids' ? 'text-gold-600' : 'text-charcoal-600'}`}
              >
                Kids' Apparel
              </button>
              <button
                onClick={() => setSelectedCategory('accessories')}
                className={`text-left py-1 font-semibold transition-colors hover:text-gold-500 ${selectedCategory === 'accessories' ? 'text-gold-600' : 'text-charcoal-600'}`}
              >
                Accessories
              </button>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-2">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900">
                Max Price
              </h3>
              <span className="text-xs font-black text-gold-600">${maxPrice}</span>
            </div>
            <div className="pt-2">
              <input
                type="range"
                min="30"
                max={absoluteMaxPrice || 250}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-charcoal-400 font-bold mt-1">
                <span>$30</span>
                <span>${absoluteMaxPrice || 250}</span>
              </div>
            </div>
          </div>

          {/* Sizes Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-2">
              Filter by Size
            </h3>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`h-9 min-w-9 px-2 rounded-md border text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                      isSelected
                        ? 'bg-charcoal-900 text-white border-charcoal-900'
                        : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-charcoal-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors Filter */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-2">
              Filter by Color
            </h3>
            <div className="flex flex-wrap gap-2">
              {allColors.map((color) => {
                const isSelected = selectedColors.includes(color);
                return (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-2xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gold-50 text-gold-700 border-gold-400 font-extrabold'
                        : 'bg-white text-charcoal-600 border-charcoal-200 hover:border-charcoal-300'
                    }`}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full border border-charcoal-200"
                      style={{
                        backgroundColor:
                          color.toLowerCase() === 'white' ? '#ffffff' :
                          color.toLowerCase() === 'midnight black' || color.toLowerCase() === 'classic black' || color.toLowerCase() === 'ink black' ? '#000000' :
                          color.toLowerCase() === 'camel' ? '#c19a6b' :
                          color.toLowerCase() === 'sage green' || color.toLowerCase() === 'dark olive' || color.toLowerCase() === 'olive' ? '#556b2f' :
                          color.toLowerCase() === 'beige' ? '#f5f5dc' :
                          color.toLowerCase() === 'emerald' ? '#046307' :
                          color.toLowerCase() === 'champagne gold' ? '#f7e7ce' :
                          color.toLowerCase() === 'ruby red' ? '#9b111e' :
                          color.toLowerCase() === 'navy blue' || color.toLowerCase() === 'sky blue' || color.toLowerCase() === 'powder blue' ? '#000080' :
                          color.toLowerCase() === 'heather grey' || color.toLowerCase() === 'stone grey' || color.toLowerCase() === 'slate grey' ? '#808080' :
                          '#cbd5e1'
                      }}
                    />
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

        </aside>

        {/* PRODUCTS GRID (Catalog List) */}
        <main className="lg:col-span-3">
          
          {/* Mobile Filter Button toggle (visible on small/medium screens only) */}
          <div className="flex items-center justify-between lg:hidden border border-charcoal-200 bg-white p-3 rounded-xl shadow-xs mb-6">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="flex items-center gap-2 text-xs font-bold text-charcoal-800"
            >
              <SlidersHorizontal size={14} className="text-gold-500" /> Filter & Sort Options
            </button>
            <span className="text-2xs font-bold text-charcoal-500">{filteredProducts.length} Products</span>
          </div>

          {/* Mobile Filters Accordion Drawer */}
          {isMobileFilterOpen && (
            <div className="lg:hidden border border-charcoal-100 bg-white p-5 rounded-xl shadow-inner mb-6 space-y-6 animate-fade-in">
              <div>
                <h4 className="text-2xs font-extrabold uppercase tracking-widest text-charcoal-400 mb-2">Category Selection</h4>
                <div className="flex flex-wrap gap-2">
                  {[null, 'women', 'men', 'kids', 'accessories'].map((cat) => (
                    <button
                      key={cat || 'all'}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`px-3 py-1.5 rounded-md text-2xs font-bold capitalize border ${
                        selectedCategory === cat
                          ? 'bg-gold-500 text-white border-gold-500'
                          : 'bg-white text-charcoal-700 border-charcoal-200'
                      }`}
                    >
                      {cat || 'Shop All'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-2xs font-extrabold uppercase tracking-widest text-charcoal-400">Max Price Limit</h4>
                  <span className="text-xs font-black text-gold-600">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max={absoluteMaxPrice || 250}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div>
                <h4 className="text-2xs font-extrabold uppercase tracking-widest text-charcoal-400 mb-2">Select Sizes</h4>
                <div className="flex flex-wrap gap-1.5">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`h-8 w-10 text-2xs font-bold border rounded ${
                        selectedSizes.includes(size) ? 'bg-charcoal-900 text-white' : 'bg-white text-charcoal-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 bg-charcoal-900 text-white py-2 rounded-lg text-xs font-bold"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleResetFilters}
                  className="border border-charcoal-200 text-charcoal-700 py-2 px-4 rounded-lg text-xs font-bold"
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {/* Catalog Listing */}
          {filteredProducts.length > 0 ? (
            <div id="catalog-grid" className="grid grid-cols-2 gap-y-10 gap-x-4 sm:gap-x-6 sm:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* No Results Stage */
            <div id="no-results-stage" className="text-center py-20 px-4 bg-white border border-charcoal-100 rounded-2xl shadow-xs">
              <div className="mx-auto h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4">
                <Search size={22} />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900">No Clothing Items Match Your Filters</h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto mt-2 leading-relaxed">
                We couldn't find any premium apparel matching your selected categories, sizes, colors, or search query. Try widening your price ranges.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-6 rounded-full bg-charcoal-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-gold-500 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
