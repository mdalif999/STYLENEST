/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Order } from '../../types';
import { Search, FileText, ChevronDown, CheckCircle, Package, Clock, Truck, SlidersHorizontal } from 'lucide-react';

export default function ManageOrders() {
  const { orders, updateOrderStatus, changeView } = useApp();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Search & Filter orders
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (statusFilter !== 'all') {
      result = result.filter(o => o.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(o => o.customerName.toLowerCase().includes(q) || o.id.toLowerCase().includes(q));
    }

    return result;
  }, [orders, search, statusFilter]);

  const handleStatusChange = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    alert(`Order ${orderId} successfully updated to status: "${status}"`);
  };

  return (
    <div id="admin-orders-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Title block */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-extrabold text-charcoal-900">Manage Customer Transactions</h1>
        <p className="text-xs text-charcoal-500 mt-1">Check invoice payments, examine delivery locations, and update dispatch courier timelines.</p>
      </div>

      {/* Admin navigation bar links */}
      <div className="flex border-b border-charcoal-200 pb-2 mb-8 gap-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button onClick={() => changeView('admin-dashboard')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Overview Stats</button>
        <button onClick={() => changeView('admin-products')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Manage Products</button>
        <button onClick={() => changeView('admin-orders')} className="py-1.5 px-3 rounded-lg bg-charcoal-900 text-white cursor-pointer">Manage Orders ({orders.length})</button>
        <button onClick={() => changeView('admin-users')} className="py-1.5 px-3 rounded-lg text-charcoal-500 hover:bg-charcoal-100 cursor-pointer">Manage Users</button>
      </div>

      {/* Filters stage bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search orders by customer name or Order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-charcoal-200 bg-white py-2 pl-10 pr-4 text-xs outline-none focus:border-gold-400"
          />
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal-400" />
        </div>

        {/* Status filter */}
        <div className="flex items-center gap-2 rounded-lg border border-charcoal-200 bg-white px-3 py-1.5 shadow-3xs shrink-0 self-start sm:self-auto">
          <SlidersHorizontal size={14} className="text-charcoal-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-bold text-charcoal-700 outline-none bg-transparent cursor-pointer"
          >
            <option value="all">All Order Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table list */}
      <div className="bg-white rounded-xl border border-charcoal-100 overflow-hidden shadow-3xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-charcoal-600">
            <thead className="bg-charcoal-50 text-3xs font-extrabold uppercase tracking-widest text-charcoal-400 border-b border-charcoal-100">
              <tr>
                <th className="py-4 px-6">ID / Customer</th>
                <th className="py-4 px-4">Placement Date</th>
                <th className="py-4 px-4">Purchased Goods</th>
                <th className="py-4 px-4">Paid Total</th>
                <th className="py-4 px-4">Delivery Coordinates</th>
                <th className="py-4 px-6 text-right">Update Courier Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {filteredOrders.map((o) => {
                const statusCapsule = 
                  o.status === 'delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                  o.status === 'shipped' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  o.status === 'processing' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' :
                  'bg-gold-50 text-gold-700 border-gold-200';

                return (
                  <tr key={o.id} className="hover:bg-charcoal-50/20">
                    <td className="py-4 px-6">
                      <span className="font-mono font-black text-charcoal-900 block">{o.id}</span>
                      <span className="block text-xs font-bold text-charcoal-800 mt-0.5">{o.customerName}</span>
                      <span className="block text-[10px] text-charcoal-400">{o.email}</span>
                    </td>
                    <td className="py-4 px-4 text-charcoal-500 font-medium">
                      {new Date(o.createdAt).toLocaleDateString()}
                      <span className="block text-[10px] text-charcoal-400 font-mono mt-0.5">
                        {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="py-4 px-4 space-y-1">
                      {o.items.map((item, index) => (
                        <div key={index} className="text-[10px] text-charcoal-700 font-medium">
                          • {item.productName} <span className="text-charcoal-400 font-bold">({item.size} / {item.color} x{item.quantity})</span>
                        </div>
                      ))}
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-extrabold text-charcoal-950 text-xs">৳{o.total.toFixed(2)}</span>
                      <span className="block text-[10px] text-charcoal-400 font-semibold">{o.paymentMethod}</span>
                    </td>
                    <td className="py-4 px-4 text-[10px] leading-relaxed text-charcoal-500">
                      <p className="font-semibold text-charcoal-700">{o.shippingAddress.address}</p>
                      <p>{o.shippingAddress.city}, {o.shippingAddress.postalCode}, {o.shippingAddress.country}</p>
                      <p className="mt-0.5"><strong>Phone:</strong> {o.phone}</p>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value as Order['status'])}
                          className={`text-2xs font-extrabold uppercase rounded px-2 py-1 border outline-none bg-white cursor-pointer ${statusCapsule}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-xs text-charcoal-500 italic bg-charcoal-50/10">No orders currently processed or match search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
