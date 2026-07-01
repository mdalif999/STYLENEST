/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ChevronRight, Plus, Minus, ShoppingBag, MessageSquare, AlertCircle, Send, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const {
    selectedProductId,
    products,
    reviews,
    addReview,
    addToCart,
    currentUser,
    changeView
  } = useApp();

  // Find active product
  const product = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  // Gallery Active Image
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Selector choices
  const [selectedSize, setSelectedSize] = useState(() => product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(() => product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);

  // Review states
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Reset selectors when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors[0] || '');
      setQuantity(1);
      setActiveImageIdx(0);
      setNewComment('');
      setReviewSuccess(false);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-center py-24">
        <p className="text-sm font-semibold text-charcoal-500">Error loading product.</p>
        <button onClick={() => changeView('shop')} className="mt-4 rounded-full bg-charcoal-900 px-4 py-2 text-xs font-bold text-white">
          Back to Shop
        </button>
      </div>
    );
  }

  // Filter reviews for this product
  const productReviews = useMemo(() => {
    return reviews.filter(r => r.productId === product.id);
  }, [reviews, product.id]);

  // Filter related products
  const relatedProducts = useMemo(() => {
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product.category, product.id]);

  const handleQtyIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleQtyDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    addToCart(product, quantity, selectedSize, selectedColor);
    alert(`Successfully added ${quantity}x ${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) to your shopping bag.`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    addReview(product.id, newRating, newComment.trim());
    setNewComment('');
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 5000);
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div id="product-detail-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-16">
      
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-1.5 text-2xs uppercase tracking-widest font-bold text-charcoal-400">
        <button onClick={() => changeView('home')} className="hover:text-gold-500">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => changeView('shop', null, product.category)} className="hover:text-gold-500 capitalize">{product.category}</button>
        <ChevronRight size={10} />
        <span className="text-charcoal-700 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Details Stage Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: Gallery */}
        <div className="space-y-4">
          <div className="aspect-3/4 w-full overflow-hidden rounded-2xl border border-charcoal-100 bg-charcoal-50 shadow-xs relative">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center transition-all duration-300"
            />
          </div>

          {/* Thumbnails list */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIdx(index)}
                  className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-charcoal-50 transition-all ${
                    index === activeImageIdx ? 'border-gold-500 scale-95 shadow-xs' : 'border-charcoal-100 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index}`} className="h-full w-full object-cover object-center" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Content Buy stage */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-2xs font-extrabold uppercase tracking-widest text-gold-600 block">StyleNest Boutique</span>
            <h1 className="font-serif text-3xl font-extrabold text-charcoal-900 leading-tight">{product.name}</h1>
            
            {/* Reviews summary block */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-gold-500 font-sans">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.round(product.rating) ? 'fill-current text-gold-500' : 'text-charcoal-200'}
                  />
                ))}
                <span className="text-xs font-black text-charcoal-800 ml-1.5">{product.rating}</span>
              </div>
              <span className="text-charcoal-200">|</span>
              <a href="#reviews-anchor" className="text-xs font-bold text-charcoal-500 underline hover:text-gold-500 transition-colors">
                {productReviews.length} Verified Reviews
              </a>
            </div>
          </div>

          {/* Pricing Stage */}
          <div className="flex items-baseline gap-3 border-b border-charcoal-100 pb-5">
            <span className="text-2xl font-black text-charcoal-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm font-medium text-charcoal-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="inline-block rounded-md bg-red-50 text-red-600 text-[10px] font-extrabold px-2 py-0.5 border border-red-100">
                  SAVE ${Math.round(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Item Description block */}
          <p className="text-xs text-charcoal-600 leading-relaxed font-light">
            {product.description}
          </p>

          {/* Selections Form */}
          <div className="space-y-5 pt-3 border-t border-charcoal-100">
            
            {/* COLOR picker */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-charcoal-900">Selected Color: <span className="text-gold-600 font-black">{selectedColor}</span></span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      selectedColor === color
                        ? 'bg-charcoal-950 text-white border-charcoal-950 shadow-xs'
                        : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-charcoal-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE picker */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-charcoal-900">Selected Size: <span className="text-gold-600 font-black">{selectedSize}</span></span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 w-12 rounded-lg text-xs font-bold border transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? 'bg-gold-500 text-white border-gold-500 shadow-sm'
                        : 'bg-white text-charcoal-700 border-charcoal-200 hover:border-charcoal-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Warning Banner */}
            <div className="pt-2">
              {isOutOfStock ? (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-600 border border-red-100 text-xs">
                  <AlertCircle size={16} />
                  <span><strong>Sold Out:</strong> This popular apparel size is currently out of stock. Contact support to request notification of replenishment.</span>
                </div>
              ) : isLowStock ? (
                <div className="flex items-center gap-2 p-3 bg-gold-50 rounded-lg text-gold-800 border border-gold-200 text-xs">
                  <AlertCircle size={16} />
                  <span><strong>Low Inventory:</strong> Only <strong>{product.stock} items left</strong> in active stock. Complete order details to reserve.</span>
                </div>
              ) : (
                <div className="text-[11px] font-bold text-green-600 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse inline-block" /> In Stock & Ready to Ship (Est. delivery: 2-3 business days)
                </div>
              )}
            </div>

            {/* Qty & Add To Cart Actions */}
            {!isOutOfStock && (
              <div className="flex gap-4 items-center pt-3">
                <div className="flex items-center border border-charcoal-200 bg-white rounded-xl h-12 shadow-2xs">
                  <button
                    onClick={handleQtyDecrease}
                    className="p-3 text-charcoal-500 hover:text-charcoal-800 transition-colors focus:outline-none"
                    title="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-xs font-extrabold text-charcoal-800">{quantity}</span>
                  <button
                    onClick={handleQtyIncrease}
                    className="p-3 text-charcoal-500 hover:text-charcoal-800 transition-colors focus:outline-none"
                    title="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-charcoal-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-gold-500 transition-all cursor-pointer"
                >
                  <ShoppingBag size={16} /> Add To Shopping Bag
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* REVIEWS SECTION - ANCHOR */}
      <section id="reviews-anchor" className="border-t border-charcoal-100 pt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left column - ratings breakdown */}
        <div>
          <h2 className="font-serif text-2xl font-extrabold text-charcoal-900 flex items-center gap-2">
            <MessageSquare size={22} className="text-gold-500" /> Customer Reviews
          </h2>
          <p className="text-xs text-charcoal-500 mt-1 leading-relaxed">
            Real customer insights check. All reviews represent verified StyleNest product acquisitions.
          </p>

          <div className="bg-white border border-charcoal-100/60 p-6 rounded-2xl shadow-xs mt-6 space-y-4">
            <div className="text-center">
              <span className="text-4xl font-black text-charcoal-900 block">{product.rating}</span>
              <div className="flex justify-center text-gold-500 font-sans my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(product.rating) ? 'fill-current text-gold-500' : 'text-charcoal-200'}
                  />
                ))}
              </div>
              <span className="text-3xs font-mono text-charcoal-400 font-bold uppercase tracking-wider">
                BASED ON {productReviews.length} REVIEWS
              </span>
            </div>

            {/* Simulated graph bar breakdown */}
            <div className="space-y-1.5 pt-4 border-t border-charcoal-100 text-3xs font-bold text-charcoal-500">
              <div className="flex items-center gap-2">
                <span className="w-8 shrink-0 text-left">5 Stars</span>
                <div className="h-2 w-full bg-charcoal-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400" style={{ width: '75%' }} />
                </div>
                <span className="w-6 shrink-0 text-right">75%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 shrink-0 text-left">4 Stars</span>
                <div className="h-2 w-full bg-charcoal-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400" style={{ width: '15%' }} />
                </div>
                <span className="w-6 shrink-0 text-right">15%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 shrink-0 text-left">3 Stars</span>
                <div className="h-2 w-full bg-charcoal-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400" style={{ width: '10%' }} />
                </div>
                <span className="w-6 shrink-0 text-right">10%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-8 shrink-0 text-left">2 Stars</span>
                <div className="h-2 w-full bg-charcoal-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-400" style={{ width: '0%' }} />
                </div>
                <span className="w-6 shrink-0 text-right">0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center column - actual reviews list */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
            {productReviews.length > 0 ? (
              productReviews.map((rev) => (
                <div key={rev.id} className="bg-white p-5 rounded-2xl border border-charcoal-100/60 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-charcoal-900">{rev.userName}</span>
                    <span className="text-[10px] text-charcoal-400 font-bold font-mono">{rev.createdAt}</span>
                  </div>
                  
                  <div className="flex text-gold-500 font-sans">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} className={i < rev.rating ? 'fill-current' : 'text-charcoal-200'} />
                    ))}
                  </div>

                  <p className="text-xs text-charcoal-600 font-light leading-relaxed">{rev.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-charcoal-500 italic text-center py-8">No reviews written for this product yet. Be the first to share your experience!</p>
            )}
          </div>

          {/* Add a Review Form Block */}
          <div className="bg-white border border-charcoal-100 rounded-2xl p-6 mt-6">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 mb-4 flex items-center gap-1">
              <Sparkles size={14} className="text-gold-500" /> Share Your Thoughts
            </h4>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Star selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-charcoal-600">Product Rating:</span>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const value = idx + 1;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setNewRating(value)}
                        className="text-gold-500 focus:outline-none"
                      >
                        <Star size={18} className={value <= newRating ? 'fill-current text-gold-500' : 'text-charcoal-200'} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  required
                  rows={3}
                  placeholder={currentUser ? "Write details about material quality, sizing, and drape comfort..." : "Register or write as guest..."}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full rounded-xl border border-charcoal-200 bg-charcoal-50 p-4 text-xs outline-none focus:border-gold-400 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] text-charcoal-400">
                  {currentUser ? `Submitting as ${currentUser.name}` : 'Submitting as Guest'}
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-charcoal-900 px-4 py-2 text-xs font-bold text-white hover:bg-gold-500 transition-all cursor-pointer"
                >
                  <Send size={12} /> Post Review
                </button>
              </div>

              {reviewSuccess && (
                <p className="text-xs font-medium text-green-600">✓ Review posted successfully! Your feedback recalculated product ratings instantly.</p>
              )}
            </form>
          </div>
        </div>

      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section id="related-products" className="border-t border-charcoal-100 pt-16">
          <div className="mb-8">
            <p className="font-mono text-2xs font-extrabold tracking-widest text-gold-600 uppercase">Aesthetic Harmony</p>
            <h2 className="font-serif text-2xl font-extrabold text-charcoal-900">You May Also Appreciate</h2>
          </div>

          <div className="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
