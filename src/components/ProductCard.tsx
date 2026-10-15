/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Eye, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  key?: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { changeView, addToCart } = useApp();

  const handleDetailsClick = () => {
    changeView('details', product.id);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const isOutOfStock = product.stock <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    
    // Select default first size and color
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0] || 'Neutral';
    
    addToCart(product, 1, defaultSize, defaultColor);
    alert(`Added ${product.name} (Size: ${defaultSize}, Color: ${defaultColor}) to shopping bag.`);
  };

  return (
    <div
      onClick={handleDetailsClick}
      className="group relative cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden border border-charcoal-100/60 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-3/4 overflow-hidden bg-charcoal-100">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Promo Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1 z-10">
          {hasDiscount && (
            <span className="inline-flex items-center rounded-md bg-red-600 px-2 py-1 text-2xs font-extrabold uppercase tracking-wider text-white">
              -{discountPercentage}% SALE
            </span>
          )}
          {product.isFeatured && (
            <span className="inline-flex items-center rounded-md bg-gold-500 px-2 py-1 text-2xs font-extrabold uppercase tracking-wider text-white">
              FEATURED
            </span>
          )}
          {isOutOfStock && (
            <span className="inline-flex items-center rounded-md bg-charcoal-700 px-2 py-1 text-2xs font-extrabold uppercase tracking-wider text-white">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Action Button Overlays (Desktop Hover Only) */}
        <div className="absolute inset-0 bg-black/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`h-10 w-10 flex items-center justify-center rounded-full text-white transition-all shadow-md ${
              isOutOfStock
                ? 'bg-charcoal-400 cursor-not-allowed'
                : 'bg-gold-500 hover:bg-gold-600 hover:scale-110'
            }`}
            title={isOutOfStock ? 'Sold Out' : 'Quick add to bag'}
          >
            <ShoppingCart size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDetailsClick();
            }}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-charcoal-900 hover:bg-charcoal-100 hover:scale-110 transition-all shadow-md"
            title="View Details"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col p-4">
        {/* Category & Rating Row */}
        <div className="flex items-center justify-between text-2xs uppercase tracking-widest text-charcoal-400 font-bold mb-1">
          <span>{product.category}</span>
          <div className="flex items-center gap-0.5 text-gold-500 font-sans">
            <Star size={10} className="fill-current" />
            <span className="text-charcoal-600 ml-1">{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-semibold text-charcoal-900 group-hover:text-gold-600 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Color Palette Indicators */}
        <div className="flex gap-1.5 mt-2 mb-3">
          {product.colors.slice(0, 3).map((col) => (
            <span
              key={col}
              className="inline-block h-2.5 w-2.5 rounded-full border border-charcoal-200"
              style={{
                backgroundColor:
                  col.toLowerCase() === 'white' ? '#ffffff' :
                  col.toLowerCase() === 'midnight black' || col.toLowerCase() === 'classic black' || col.toLowerCase() === 'ink black' ? '#000000' :
                  col.toLowerCase() === 'camel' ? '#c19a6b' :
                  col.toLowerCase() === 'sage green' || col.toLowerCase() === 'dark olive' || col.toLowerCase() === 'olive' ? '#556b2f' :
                  col.toLowerCase() === 'beige' ? '#f5f5dc' :
                  col.toLowerCase() === 'emerald' ? '#046307' :
                  col.toLowerCase() === 'champagne gold' ? '#f7e7ce' :
                  col.toLowerCase() === 'ruby red' ? '#9b111e' :
                  col.toLowerCase() === 'navy blue' || col.toLowerCase() === 'sky blue' || col.toLowerCase() === 'powder blue' ? '#000080' :
                  col.toLowerCase() === 'heather grey' || col.toLowerCase() === 'stone grey' || col.toLowerCase() === 'slate grey' ? '#808080' :
                  '#cbd5e1'
              }}
              title={col}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="text-[9px] font-bold text-charcoal-400 leading-none self-center">
              +{product.colors.length - 3}
            </span>
          )}
        </div>

        {/* Price Row */}
        <div className="mt-auto flex items-baseline gap-2">
          <span className="text-sm font-extrabold text-charcoal-900">৳{product.price.toFixed(2)}</span>
          {hasDiscount && (
            <span className="text-xs text-charcoal-400 line-through font-medium">
              ৳{product.originalPrice!.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
