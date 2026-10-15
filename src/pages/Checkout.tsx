/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2, Printer, ShoppingBag, Landmark } from 'lucide-react';

export default function Checkout() {
  const {
    cart,
    currentUser,
    placeOrder,
    changeView
  } = useApp();

  // Shipping form fields
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [phone, setPhone] = useState('');

  // Payment form fields
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  // Checkout steps and statuses
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  // Retrieve discount states
  const discountPercent = Number(localStorage.getItem('sn_applied_discount') || '0');
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = subtotal - discountAmount + shippingFee;

  const handlePlaceOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!address.trim() || !city.trim() || !postalCode.trim() || !phone.trim()) {
      setFormError('Please fill out all shipping details.');
      return;
    }

    if (paymentMethod === 'Credit Card') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCVV.trim()) {
        setFormError('Please fill out card details for processing.');
        return;
      }
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const result = placeOrder(
        { address: address.trim(), city: city.trim(), postalCode: postalCode.trim(), country },
        phone.trim(),
        paymentMethod
      );

      setIsSubmitting(false);

      if (result.success && result.orderId) {
        setPlacedOrderId(result.orderId);
        // Clear temporary discount
        localStorage.removeItem('sn_applied_discount');
        localStorage.removeItem('sn_applied_promo');
      } else {
        setFormError(result.error || 'Failed to process order. Please try again.');
      }
    }, 1500); // realistic payment gateway processing delay
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  // SUCCESS STAGE
  if (placedOrderId) {
    return (
      <div id="checkout-success" className="mx-auto max-w-2xl text-center py-16 px-4 animate-fade-in space-y-8">
        <div className="mx-auto h-20 w-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-6 border border-green-100 shadow-sm">
          <CheckCircle2 size={44} className="animate-scale-up" />
        </div>
        
        <div className="space-y-3">
          <span className="font-mono text-2xs font-bold text-green-600 uppercase tracking-widest block">ORDER COMPLETED SUCCESSFULLY</span>
          <h1 className="font-serif text-3xl font-black text-charcoal-900">Your StyleNest Is Reserved!</h1>
          <p className="text-xs text-charcoal-500 max-w-md mx-auto">
            Thank you for shopping with us! Your e-commerce order has been securely processed and placed on our server. We are assembling your luxury articles right now.
          </p>
        </div>

        {/* Invoice Box */}
        <div className="bg-white border border-charcoal-100 rounded-2xl p-6 text-left shadow-sm divide-y divide-charcoal-100 max-w-md mx-auto space-y-4">
          <div className="flex justify-between items-center pb-3">
            <div>
              <span className="text-3xs font-mono font-bold text-charcoal-400 block uppercase">ORDER ID</span>
              <span className="text-xs font-black text-charcoal-950 font-mono">{placedOrderId}</span>
            </div>
            <div className="text-right">
              <span className="text-3xs font-mono font-bold text-charcoal-400 block uppercase">ESTIMATED ARRIVAL</span>
              <span className="text-xs font-black text-gold-600">3 Business Days</span>
            </div>
          </div>

          <div className="pt-3 pb-3 space-y-1.5 text-xs text-charcoal-600">
            <p><strong>Customer:</strong> {currentUser?.name}</p>
            <p><strong>Delivery Address:</strong> {address}, {city}, {postalCode}, {country}</p>
            <p><strong>Contact Phone:</strong> {phone}</p>
            <p><strong>Payment Mode:</strong> {paymentMethod}</p>
          </div>

          <div className="pt-3 flex justify-between items-center font-bold text-xs">
            <span className="text-charcoal-900">Paid Grand Total</span>
            <span className="text-base font-black text-gold-600">৳{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Action button triggers */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
          <button
            onClick={handlePrintReceipt}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-charcoal-200 py-2.5 text-xs font-bold text-charcoal-700 bg-white hover:bg-charcoal-50 cursor-pointer"
          >
            <Printer size={14} /> Print Invoice
          </button>
          <button
            onClick={() => changeView('orders')}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-charcoal-900 py-2.5 text-xs font-bold text-white hover:bg-gold-500 cursor-pointer"
          >
            <ShoppingBag size={14} /> View My Orders
          </button>
        </div>
      </div>
    );
  }

  // STANDARD CHECKOUT STAGE
  return (
    <div id="checkout-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-2xs uppercase tracking-widest font-bold text-charcoal-400 mb-8">
        <button onClick={() => changeView('home')} className="hover:text-gold-500">Home</button>
        <ChevronRight size={10} />
        <button onClick={() => changeView('cart')} className="hover:text-gold-500">Shopping Bag</button>
        <ChevronRight size={10} />
        <span className="text-charcoal-700">Checkout Wizard</span>
      </nav>

      <h1 className="font-serif text-3xl font-extrabold text-charcoal-900 mb-8">Checkout Information</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        
        {/* LEFT COLUMN: INFORMATION FORM (lg:span-7) */}
        <div className="lg:col-span-7">
          <form onSubmit={handlePlaceOrderSubmit} className="space-y-6">
            
            {/* Step 1: Shipping Address Details */}
            <div className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-3 flex items-center gap-1.5">
                <Truck size={14} className="text-gold-500" /> 1. Shipping Destination
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Delivery Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Apartment, suite, street name"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhaka"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Postal/ZIP Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1213"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  >
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 01712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Mode */}
            <div className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-3 flex items-center gap-1.5">
                <CreditCard size={14} className="text-gold-500" /> 2. Secured Payment Information
              </h3>

              {/* Payment toggle buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Credit Card')}
                  className={`p-4 rounded-xl border text-xs font-bold text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'Credit Card'
                      ? 'border-gold-500 bg-gold-50/50 text-gold-900 ring-2 ring-gold-400/20'
                      : 'border-charcoal-200 hover:border-charcoal-300 text-charcoal-700'
                  }`}
                >
                  <CreditCard size={18} className="text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <span>Secure Card Portal</span>
                    <span className="block text-[10px] text-charcoal-400 font-medium font-sans mt-0.5">Pay via Visa, Mastercard, AMEX</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Cash on Delivery')}
                  className={`p-4 rounded-xl border text-xs font-bold text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                    paymentMethod === 'Cash on Delivery'
                      ? 'border-gold-500 bg-gold-50/50 text-gold-900 ring-2 ring-gold-400/20'
                      : 'border-charcoal-200 hover:border-charcoal-300 text-charcoal-700'
                  }`}
                >
                  <Landmark size={18} className="text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <span>Cash on Delivery</span>
                    <span className="block text-[10px] text-charcoal-400 font-medium font-sans mt-0.5">Pay in cash on parcel dropoff</span>
                  </div>
                </button>
              </div>

              {/* Card form simulator details */}
              {paymentMethod === 'Credit Card' && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-charcoal-100/60 animate-fade-in">
                  <div className="col-span-3 space-y-1">
                    <label className="text-[10px] font-bold text-charcoal-500 uppercase font-sans">Simulated Credit Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white font-mono"
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-charcoal-500 uppercase font-sans">Expiration Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white font-mono"
                    />
                  </div>

                  <div className="col-span-1 space-y-1">
                    <label className="text-[10px] font-bold text-charcoal-500 uppercase font-sans">CVV / CVN</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={3}
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3 text-xs outline-none focus:border-gold-400 focus:bg-white font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

            {formError && (
              <p className="text-xs font-semibold text-red-500">{formError}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className={`w-full h-12 rounded-xl text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                isSubmitting
                  ? 'bg-charcoal-400 cursor-wait'
                  : 'bg-charcoal-900 hover:bg-gold-500'
              }`}
            >
              {isSubmitting ? 'Verifying secure authorization...' : `Authorize Secure Order • ৳${grandTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: RECAP ORDER LIST (lg:span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-xs divide-y divide-charcoal-100/60 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 pb-2">
              Purchase Summary
            </h3>

            {/* List items */}
            <div className="space-y-4 pt-4 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 justify-between items-center text-xs">
                  <div className="flex gap-3">
                    <div className="h-12 w-9 rounded overflow-hidden bg-charcoal-100 border border-charcoal-100 shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="self-center">
                      <h4 className="font-bold text-charcoal-800 line-clamp-1">{item.product.name}</h4>
                      <p className="text-[10px] text-charcoal-400 font-bold uppercase">
                        {item.selectedSize} / {item.selectedColor} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-extrabold text-charcoal-900 shrink-0">
                    ৳{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing math */}
            <div className="space-y-2.5 pt-4 text-xs text-charcoal-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Student Coupon (15% Off)</span>
                  <span>-৳{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `৳${shippingFee.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between pt-2 border-t border-charcoal-100 text-sm font-bold text-charcoal-900">
                <span>Total Payment Amount</span>
                <span className="font-black text-gold-600 text-base">৳{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center items-center gap-1 text-[10px] uppercase font-bold text-charcoal-400 tracking-wider">
              <ShieldCheck size={14} className="text-gold-500" /> Secure Payment Guaranteed
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
