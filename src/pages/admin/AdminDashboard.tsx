/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ShoppingBag, Users, DollarSign, Tag, TrendingUp, Sparkles, FileText, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const { products, orders, users, changeView } = useApp();

  // Unified Admin Tab rail subcomponent
  const renderAdminNav = (activeTab: string) => {
    return (
      <div className="flex border-b border-charcoal-200 pb-2 mb-8 gap-4 overflow-x-auto text-xs font-bold uppercase tracking-wider">
        <button
          onClick={() => changeView('admin-dashboard')}
          className={`py-1.5 px-3 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'dashboard' ? 'bg-charcoal-900 text-white' : 'text-charcoal-500 hover:bg-charcoal-100'
          }`}
        >
          Overview Stats
        </button>
        <button
          onClick={() => changeView('admin-products')}
          className={`py-1.5 px-3 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'products' ? 'bg-charcoal-900 text-white' : 'text-charcoal-500 hover:bg-charcoal-100'
          }`}
        >
          Manage Products ({products.length})
        </button>
        <button
          onClick={() => changeView('admin-orders')}
          className={`py-1.5 px-3 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'orders' ? 'bg-charcoal-900 text-white' : 'text-charcoal-500 hover:bg-charcoal-100'
          }`}
        >
          Manage Orders ({orders.length})
        </button>
        <button
          onClick={() => changeView('admin-users')}
          className={`py-1.5 px-3 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'users' ? 'bg-charcoal-900 text-white' : 'text-charcoal-500 hover:bg-charcoal-100'
          }`}
        >
          Manage Users ({users.length})
        </button>
      </div>
    );
  };

  // Compute stats metrics
  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const totalProducts = products.length;

    // Category distribution counts
    const categories: Record<string, number> = { women: 0, men: 0, kids: 0, accessories: 0 };
    products.forEach(p => {
      const cat = p.category.toLowerCase();
      if (categories[cat] !== undefined) categories[cat]++;
    });

    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      categories
    };
  }, [products, orders, users]);

  const recentOrders = orders.slice(0, 5);

  return (
    <div id="admin-dashboard-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Title Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-extrabold text-charcoal-900">Admin Control Center</h1>
          <p className="text-xs text-charcoal-500 mt-1">Examine and manage StyleNest products, orders, and registered students accounts.</p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-800 text-3xs font-extrabold uppercase tracking-widest border border-gold-200">
          <Sparkles size={11} className="text-gold-600 animate-pulse" /> Live Store Sandbox
        </span>
      </div>

      {/* Navigation Sub-rail */}
      {renderAdminNav('dashboard')}

      {/* KPI METRICS WIDGETS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Metric 1: Total Sales Revenue */}
        <div className="bg-white border border-charcoal-100 rounded-xl p-5 shadow-3xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Total Store Sales</span>
            <span className="text-lg font-black text-charcoal-950">${stats.totalRevenue.toFixed(2)}</span>
          </div>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-white border border-charcoal-100 rounded-xl p-5 shadow-3xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Total Orders</span>
            <span className="text-lg font-black text-charcoal-950">{stats.totalOrders}</span>
          </div>
        </div>

        {/* Metric 3: Active Users */}
        <div className="bg-white border border-charcoal-100 rounded-xl p-5 shadow-3xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-gold-50 text-gold-600 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Active Clients</span>
            <span className="text-lg font-black text-charcoal-950">{stats.totalUsers}</span>
          </div>
        </div>

        {/* Metric 4: Total Products */}
        <div className="bg-white border border-charcoal-100 rounded-xl p-5 shadow-3xs flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Tag size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">Total Catalog</span>
            <span className="text-lg font-black text-charcoal-950">{stats.totalProducts} Items</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: RECENT ORDERS (lg:span-7) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-charcoal-100 p-6 shadow-3xs space-y-4">
          <div className="flex justify-between items-center border-b border-charcoal-100 pb-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 flex items-center gap-2">
              <FileText size={14} className="text-gold-500" /> Recent Sales Feed
            </h3>
            <button
              onClick={() => changeView('admin-orders')}
              className="text-[10px] font-bold text-gold-600 hover:underline uppercase"
            >
              Examine All
            </button>
          </div>

          <div className="divide-y divide-charcoal-100 max-h-96 overflow-y-auto pr-2">
            {recentOrders.length > 0 ? (
              recentOrders.map((o) => {
                const statusCapsule = 
                  o.status === 'delivered' ? 'bg-green-50 text-green-700' :
                  o.status === 'shipped' ? 'bg-blue-50 text-blue-700' :
                  o.status === 'processing' ? 'bg-yellow-50 text-yellow-800' :
                  'bg-gold-50 text-gold-700';

                return (
                  <div key={o.id} className="py-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-charcoal-900">{o.customerName}</p>
                      <p className="text-[10px] text-charcoal-400 font-mono mt-0.5">{o.id} • {new Date(o.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className="font-black text-charcoal-950">${o.total.toFixed(2)}</p>
                        <span className="text-[10px] text-charcoal-400">{o.items.length} clothes</span>
                      </div>
                      <span className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${statusCapsule}`}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-charcoal-500 text-center py-8 italic">No orders processed yet.</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ANALYTICS GRAPHS (lg:span-5) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-charcoal-100 p-6 shadow-3xs space-y-6">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-gold-500" /> Catalog Distribution
          </h3>

          {/* Simple Visual custom progress bar charts */}
          <div className="space-y-4 text-xs">
            {Object.entries(stats.categories).map(([cat, count]) => {
              const percentage = stats.totalProducts > 0
                ? Math.round(((count as number) / stats.totalProducts) * 100)
                : 0;

              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-charcoal-800 capitalize">{cat} Wear</span>
                    <span className="text-charcoal-400 text-3xs font-bold">{count} items ({percentage}%)</span>
                  </div>
                  <div className="h-2.5 w-full bg-charcoal-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat === 'women' ? 'bg-gold-500' :
                        cat === 'men' ? 'bg-charcoal-900' :
                        cat === 'kids' ? 'bg-blue-400' : 'bg-purple-400'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-gold-50/50 border border-gold-200/50 text-[11px] leading-relaxed text-gold-800">
            💡 <strong>Stylist Suggestion:</strong> Your Women's apparel category is highest stocked. Consider running promotional vouchers specifically to clear Accessories.
          </div>
        </div>

      </div>

    </div>
  );
}
export { AdminDashboard };
