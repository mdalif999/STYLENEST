/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight, Package, Clock, Truck, CheckCircle, ChevronDown, ChevronUp, Copy } from 'lucide-react';

export default function MyOrders() {
  const { orders, currentUser, changeView } = useApp();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [copiedTracking, setCopiedTracking] = useState<string | null>(null);

  const myOrdersList = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter(o => o.userId === currentUser.id);
  }, [orders, currentUser]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(prev => prev === orderId ? null : orderId);
  };

  const handleCopyTracking = (e: React.MouseEvent, trk: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(trk);
    setCopiedTracking(trk);
    setTimeout(() => setCopiedTracking(null), 2500);
  };

  if (!currentUser) {
    return (
      <div className="text-center py-20 px-4 animate-fade-in">
        <div className="mx-auto h-16 w-16 rounded-full bg-charcoal-50 flex items-center justify-center text-charcoal-400 mb-6 border border-charcoal-100">
          <Clock size={26} />
        </div>
        <h2 className="font-serif text-2xl font-extrabold text-charcoal-900">Sign In Required</h2>
        <p className="text-xs text-charcoal-500 max-w-sm mx-auto mt-2 leading-relaxed">
          Please log in to check your order records, tracking statuses, and dynamic print-receipt invoices.
        </p>
        <button
          onClick={() => changeView('login')}
          className="mt-6 rounded-full bg-charcoal-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-gold-500 transition-colors cursor-pointer"
        >
          Go to Sign In
        </button>
      </div>
    );
  }

  if (myOrdersList.length === 0) {
    return (
      <div className="text-center py-20 px-4 animate-fade-in">
        <div className="mx-auto h-16 w-16 rounded-full bg-charcoal-50 flex items-center justify-center text-charcoal-400 mb-6 border border-charcoal-100">
          <Package size={26} />
        </div>
        <h2 className="font-serif text-2xl font-extrabold text-charcoal-900">No Orders Recorded</h2>
        <p className="text-xs text-charcoal-500 max-w-sm mx-auto mt-2 leading-relaxed">
          You haven't completed any apparel purchases on this session. Use our grading panel to register or browse items in our shop.
        </p>
        <button
          onClick={() => changeView('shop')}
          className="mt-6 rounded-full bg-charcoal-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-gold-500 transition-colors cursor-pointer"
        >
          Browse Our Catalogue
        </button>
      </div>
    );
  }

  return (
    <div id="orders-view" className="mx-auto max-w-4xl px-4 sm:px-6 py-8 animate-fade-in space-y-8">
      
      <div>
        <h1 className="font-serif text-3xl font-extrabold text-charcoal-900">Your Order History</h1>
        <p className="text-xs text-charcoal-500 mt-1">Review, track, and examine transactions for current wardrobe selections.</p>
      </div>

      <div className="space-y-4">
        {myOrdersList.map((order) => {
          const isExpanded = expandedOrderId === order.id;
          
          // Formatted placement date
          const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          });

          // Status-specific color configurations
          const statusCapsule = 
            order.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
            order.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
            order.status === 'processing' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
            'bg-gold-50 text-gold-700 border-gold-200';

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-charcoal-100/65 shadow-3xs overflow-hidden"
            >
              {/* Order Header Grid (Collapse trigger) */}
              <div
                onClick={() => toggleExpand(order.id)}
                className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-charcoal-50/45 transition-colors"
              >
                <div className="grid grid-cols-2 md:flex items-center gap-x-6 gap-y-2 text-xs">
                  <div>
                    <span className="text-3xs font-mono font-bold text-charcoal-400 block uppercase">ORDER NUMBER</span>
                    <span className="font-mono font-black text-charcoal-950">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-3xs font-mono font-bold text-charcoal-400 block uppercase">DATE PLACED</span>
                    <span className="font-bold text-charcoal-700">{orderDate}</span>
                  </div>
                  <div>
                    <span className="text-3xs font-mono font-bold text-charcoal-400 block uppercase">GRAND TOTAL</span>
                    <span className="font-extrabold text-gold-600">৳{order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-2xs font-bold uppercase tracking-wider border ${statusCapsule}`}>
                    {order.status}
                  </span>
                  {isExpanded ? <ChevronUp size={16} className="text-charcoal-400" /> : <ChevronDown size={16} className="text-charcoal-400" />}
                </div>
              </div>

              {/* Collapsible details section */}
              {isExpanded && (
                <div className="border-t border-charcoal-100 p-6 bg-charcoal-50/30 space-y-6 animate-fade-in">
                  
                  {/* Tracking progress bar timeline */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs items-center">
                      <span className="font-bold text-charcoal-800">Delivery Status Timeline</span>
                      <button
                        onClick={(e) => handleCopyTracking(e, order.trackingId)}
                        className="text-[10px] font-bold text-gold-600 flex items-center gap-1 hover:text-gold-700"
                        title="Copy Courier ID"
                      >
                        <Copy size={12} /> {copiedTracking === order.trackingId ? 'Copied ID' : `Tracking: ${order.trackingId}`}
                      </button>
                    </div>

                    {/* Timeline stepper */}
                    <div className="grid grid-cols-4 relative pt-4">
                      {/* Stepper background connector line */}
                      <div className="absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-charcoal-200 z-0" />
                      {/* Active green progress filler */}
                      <div
                        className="absolute top-7 left-[12.5%] h-0.5 bg-green-500 z-0 transition-all duration-500"
                        style={{
                          width:
                            order.status === 'delivered' ? '75%' :
                            order.status === 'shipped' ? '50%' :
                            order.status === 'processing' ? '25%' : '0%'
                        }}
                      />

                      {/* Step 1: Placed */}
                      <div className="flex flex-col items-center text-center relative z-10 text-[10px]">
                        <div className="h-7 w-7 rounded-full bg-green-500 text-white flex items-center justify-center border-2 border-white shadow-2xs font-bold">
                          ✓
                        </div>
                        <span className="mt-2 font-bold text-charcoal-800">Placed</span>
                      </div>

                      {/* Step 2: Processing */}
                      <div className="flex flex-col items-center text-center relative z-10 text-[10px]">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center border-2 border-white shadow-2xs font-bold ${
                          ['processing', 'shipped', 'delivered'].includes(order.status)
                            ? 'bg-green-500 text-white'
                            : 'bg-charcoal-100 text-charcoal-400'
                        }`}>
                          {['processing', 'shipped', 'delivered'].includes(order.status) ? '✓' : '2'}
                        </div>
                        <span className={`mt-2 font-bold ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'text-charcoal-800' : 'text-charcoal-400'}`}>Processing</span>
                      </div>

                      {/* Step 3: Shipped */}
                      <div className="flex flex-col items-center text-center relative z-10 text-[10px]">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center border-2 border-white shadow-2xs font-bold ${
                          ['shipped', 'delivered'].includes(order.status)
                            ? 'bg-green-500 text-white'
                            : 'bg-charcoal-100 text-charcoal-400'
                        }`}>
                          {['shipped', 'delivered'].includes(order.status) ? '✓' : '3'}
                        </div>
                        <span className={`mt-2 font-bold ${['shipped', 'delivered'].includes(order.status) ? 'text-charcoal-800' : 'text-charcoal-400'}`}>Shipped</span>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="flex flex-col items-center text-center relative z-10 text-[10px]">
                        <div className={`h-7 w-7 rounded-full flex items-center justify-center border-2 border-white shadow-2xs font-bold ${
                          order.status === 'delivered'
                            ? 'bg-green-500 text-white'
                            : 'bg-charcoal-100 text-charcoal-400'
                        }`}>
                          {order.status === 'delivered' ? '✓' : '4'}
                        </div>
                        <span className={`mt-2 font-bold ${order.status === 'delivered' ? 'text-charcoal-800' : 'text-charcoal-400'}`}>Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* List of ordered articles */}
                  <div className="space-y-4 pt-3 border-t border-charcoal-100/60">
                    <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest block">Bought Articles</span>
                    
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-charcoal-100/40 text-xs shadow-2xs">
                          <div className="flex gap-3">
                            <div className="h-12 w-9 rounded overflow-hidden bg-charcoal-100 shrink-0">
                              <img src={item.image} alt={item.productName} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="self-center">
                              <h4 className="font-bold text-charcoal-900">{item.productName}</h4>
                              <p className="text-[10px] text-charcoal-400 font-bold uppercase mt-0.5">
                                Size: {item.size} / Color: {item.color} • Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-black text-charcoal-900">৳{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Location Recap */}
                  <div className="pt-4 border-t border-charcoal-100/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal-600">
                    <div>
                      <p className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">Courier Dispatch Location</p>
                      <p className="mt-1 font-bold text-charcoal-800">{order.customerName}</p>
                      <p className="mt-0.5">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                      <p>{order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-charcoal-400 uppercase tracking-widest">Contact Details</p>
                      <p className="mt-1"><strong>Phone:</strong> {order.phone}</p>
                      <p className="mt-0.5"><strong>Email:</strong> {order.email}</p>
                      <p className="mt-0.5"><strong>Payment Method:</strong> {order.paymentMethod}</p>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
