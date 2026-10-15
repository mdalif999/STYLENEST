/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, Tag, Minus, Plus, RefreshCw } from 'lucide-react';

export default function Cart() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    changeView,
    currentUser
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(() => {
    const saved = localStorage.getItem('sn_applied_discount');
    return saved ? Number(saved) : 0;
  });
  const [promoApplied, setPromoApplied] = useState(() => {
    return localStorage.getItem('sn_applied_promo') || '';
  });
  const [promoError, setPromoError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    
    if (code === 'STYLE15') {
      setDiscountPercent(15);
      setPromoApplied('STYLE15');
      localStorage.setItem('sn_applied_discount', '15');
      localStorage.setItem('sn_applied_promo', 'STYLE15');
      setPromoCode('');
    } else if (code === '') {
      setPromoError('Please enter a coupon code.');
    } else {
      setPromoError('Invalid coupon code. Try using STYLE15 for 15% off.');
    }
  };

  const handleRemovePromo = () => {
    setDiscountPercent(0);
    setPromoApplied('');
    localStorage.removeItem('sn_applied_discount');
    localStorage.removeItem('sn_applied_promo');
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handleCheckoutRedirect = () => {
    if (!currentUser) {
      alert('Authentication required. Please register or log in to continue secure checkout.');
      changeView('login');
    } else {
      changeView('checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <div id="empty-cart-stage" className="mx-auto max-w-xl text-center py-20 px-4 animate-fade-in">
        <div className="mx-auto h-16 w-16 rounded-full bg-charcoal-50 flex items-center justify-center text-charcoal-400 mb-6 border border-charcoal-100">
          <ShoppingBag size={26} />
        </div>
        <h2 className="font-serif text-2xl font-extrabold text-charcoal-900">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-charcoal-500 max-w-sm mx-auto mt-2 leading-relaxed">
          Looks like you haven't added any premium clothing articles to your active bag yet. Explore our latest arrivals to find your aesthetic.
        </p>
        <button
          onClick={() => changeView('shop')}
          className="mt-6 rounded-full bg-charcoal-900 px-6 py-3 text-xs font-bold text-white hover:bg-gold-500 hover:scale-105 transition-all cursor-pointer"
        >
          Browse All Apparel
        </button>
      </div>
    );
  }

  return (
    <div id="cart-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      <h1 className="font-serif text-3xl font-extrabold text-charcoal-900 mb-8">Shopping Bag</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        
        {/* LEFT COLUMN: ITEM LIST (lg:span-8) */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-white rounded-2xl border border-charcoal-100/65 shadow-2xs overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 bg-charcoal-50 py-3.5 px-6 text-3xs font-extrabold text-charcoal-400 uppercase tracking-widest border-b border-charcoal-100">
              <span className="col-span-6">Product Details</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Quantity</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            <div className="divide-y divide-charcoal-100">
              {cart.map((item) => (
                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 items-center gap-4 py-5 px-6">
                  
                  {/* Image & Descriptions */}
                  <div className="col-span-1 sm:col-span-6 flex gap-4">
                    <div className="h-20 w-16 rounded-lg overflow-hidden bg-charcoal-100 shrink-0 border border-charcoal-100">
                      <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="space-y-1 self-center">
                      <h4
                        onClick={() => changeView('details', item.product.id)}
                        className="text-xs font-bold text-charcoal-900 hover:text-gold-500 transition-colors cursor-pointer"
                      >
                        {item.product.name}
                      </h4>
                      <div className="flex gap-2 text-[10px] font-bold text-charcoal-400 uppercase">
                        <span>Size: <strong className="text-charcoal-600">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-charcoal-600">{item.selectedColor}</strong></span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-[10px] text-red-500 hover:text-red-700 font-bold transition-colors pt-1 cursor-pointer"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price (Mobile labels added) */}
                  <div className="col-span-1 sm:col-span-2 flex sm:justify-center justify-between text-xs">
                    <span className="sm:hidden font-bold text-charcoal-400">Unit Price:</span>
                    <span className="font-extrabold text-charcoal-900">৳{item.product.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity Actions */}
                  <div className="col-span-1 sm:col-span-2 flex sm:justify-center justify-between items-center">
                    <span className="sm:hidden font-bold text-charcoal-400">Quantity:</span>
                    <div className="flex items-center border border-charcoal-200 bg-white rounded-lg h-9 shadow-3xs">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-charcoal-400 hover:text-charcoal-800"
                        title="Reduce quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-charcoal-800">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-charcoal-400 hover:text-charcoal-800"
                        title="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal Item line */}
                  <div className="col-span-1 sm:col-span-2 flex sm:justify-end justify-between text-xs">
                    <span className="sm:hidden font-bold text-charcoal-400">Line Total:</span>
                    <span className="font-black text-charcoal-900">৳{(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => changeView('shop')}
            className="text-xs font-bold text-gold-600 hover:text-gold-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            ← Continue Browsing Collections
          </button>
        </div>

        {/* RIGHT COLUMN: BREAKDOWN CART (lg:span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-xs space-y-6">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-3">
              Order Details
            </h3>

            {/* Calculations Breakdown */}
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between text-charcoal-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-charcoal-900">৳{subtotal.toFixed(2)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-green-600 font-medium bg-green-50 p-2.5 rounded-lg border border-green-100">
                  <span className="flex items-center gap-1"><Tag size={12} /> Code STYLE15 applied</span>
                  <div className="flex items-center gap-1">
                    <span>-৳{discountAmount.toFixed(2)}</span>
                    <button onClick={handleRemovePromo} className="text-red-500 hover:text-red-700 text-2xs font-bold pl-1 uppercase">Remove</button>
                  </div>
                </div>
              )}

              <div className="flex justify-between text-charcoal-600">
                <span>Express Shipping</span>
                <span className="font-bold text-charcoal-900">
                  {shippingFee === 0 ? 'FREE' : `৳${shippingFee.toFixed(2)}`}
                </span>
              </div>
              
              {shippingFee > 0 && (
                <p className="text-[10px] text-charcoal-400 leading-tight">
                  💡 Tip: Add <strong>৳{(150 - subtotal).toFixed(0)}</strong> more to your bag to enjoy <strong>FREE shipping</strong>.
                </p>
              )}

              <hr className="border-charcoal-100" />

              <div className="flex justify-between text-sm pt-1.5">
                <span className="font-bold text-charcoal-900">Grand Total</span>
                <span className="font-black text-gold-600 text-base">৳{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleCheckoutRedirect}
              className="w-full h-12 rounded-xl bg-charcoal-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-gold-500 transition-all cursor-pointer"
            >
              Secure Checkout <ArrowRight size={14} />
            </button>

            <div className="flex justify-center items-center gap-1.5 text-3xs text-charcoal-400 font-bold uppercase tracking-wider text-center">
              <ShieldCheck size={14} className="text-gold-400" /> Fully Secured 256-Bit SSL Checkout Encryption
            </div>
          </div>

          {/* Promotional Coupon Entry Stage */}
          <div className="bg-white rounded-2xl border border-charcoal-100 p-5 shadow-2xs">
            <h4 className="text-xs font-bold text-charcoal-800 mb-2 flex items-center gap-1">
              <Tag size={12} className="text-gold-500" /> Have a Coupon Code?
            </h4>
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter code (e.g. STYLE15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 rounded-lg border border-charcoal-200 px-3 py-2 text-xs outline-none uppercase font-mono focus:border-gold-400 bg-charcoal-50 focus:bg-white"
              />
              <button
                type="submit"
                className="bg-charcoal-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gold-500 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>
            {promoError && (
              <p className="text-[11px] text-red-500 font-medium mt-1">{promoError}</p>
            )}
            <p className="text-[10px] text-charcoal-400 mt-2 leading-tight">
              💡 Hint: Enter code <strong>STYLE15</strong> to apply the lab course 15% discount structure.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
