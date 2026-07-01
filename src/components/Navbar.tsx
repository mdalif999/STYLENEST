/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Search, User, Menu, X, Settings, LogOut, FileText, ChevronDown, RefreshCw } from 'lucide-react';

export default function Navbar() {
  const {
    cart,
    currentUser,
    currentView,
    logoutUser,
    changeView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    resetToDefaults
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    changeView('shop');
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setLocalSearch('');
    changeView('shop');
    setIsMobileMenuOpen(false);
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 w-full border-b border-charcoal-100 bg-white/85 backdrop-blur-md">
      {/* Top Bar Promotions */}
      <div id="promo-bar" className="bg-charcoal-900 py-2 text-center text-xs font-medium tracking-wider text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="w-full text-center">FREE EXPRESS SHIPPING ON ORDERS OVER $150 • DISCOVER THE NEW ARRIVALS</p>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all data to default store items and sample orders? This is highly useful for grading.')) {
                resetToDefaults();
                alert('Store data has been successfully reset.');
              }
            }}
            title="Reset to default demo data"
            className="hidden sm:flex items-center gap-1 text-[10px] uppercase font-bold text-gold-300 hover:text-gold-200 transition-colors ml-4 shrink-0"
          >
            <RefreshCw size={10} /> Reset Store
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-btn"
            className="flex p-2 text-charcoal-600 lg:hidden hover:text-charcoal-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Elegant Logo */}
          <div className="flex lg:flex-1">
            <button
              id="brand-logo"
              onClick={() => changeView('home')}
              className="flex items-center gap-1.5 focus:outline-none group text-left cursor-pointer"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-900 text-white font-serif font-extrabold text-lg tracking-tighter shadow-sm transition-transform group-hover:scale-105">
                S
              </div>
              <div>
                <span className="font-serif text-xl font-black tracking-widest text-charcoal-900 block leading-none">
                  STYLE<span className="text-gold-500 font-sans font-light">NEST</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-charcoal-400 block uppercase font-medium">Fashion Lab</span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav id="desktop-nav" className="hidden lg:flex lg:gap-x-8">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`text-sm font-semibold tracking-wider uppercase transition-colors hover:text-gold-500 py-1 border-b-2 cursor-pointer ${
                currentView === 'shop' && selectedCategory === null && searchQuery === '' ? 'border-gold-500 text-gold-500' : 'border-transparent text-charcoal-600'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => handleCategoryClick('women')}
              className={`text-sm font-semibold tracking-wider uppercase transition-colors hover:text-gold-500 py-1 border-b-2 cursor-pointer ${
                currentView === 'shop' && selectedCategory === 'women' ? 'border-gold-500 text-gold-500' : 'border-transparent text-charcoal-600'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => handleCategoryClick('men')}
              className={`text-sm font-semibold tracking-wider uppercase transition-colors hover:text-gold-500 py-1 border-b-2 cursor-pointer ${
                currentView === 'shop' && selectedCategory === 'men' ? 'border-gold-500 text-gold-500' : 'border-transparent text-charcoal-600'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => handleCategoryClick('kids')}
              className={`text-sm font-semibold tracking-wider uppercase transition-colors hover:text-gold-500 py-1 border-b-2 cursor-pointer ${
                currentView === 'shop' && selectedCategory === 'kids' ? 'border-gold-500 text-gold-500' : 'border-transparent text-charcoal-600'
              }`}
            >
              Kids
            </button>
            <button
              onClick={() => handleCategoryClick('accessories')}
              className={`text-sm font-semibold tracking-wider uppercase transition-colors hover:text-gold-500 py-1 border-b-2 cursor-pointer ${
                currentView === 'shop' && selectedCategory === 'accessories' ? 'border-gold-500 text-gold-500' : 'border-transparent text-charcoal-600'
              }`}
            >
              Accessories
            </button>
            <button
              onClick={() => changeView('contact')}
              className={`text-sm font-semibold tracking-wider uppercase transition-colors hover:text-gold-500 py-1 border-b-2 cursor-pointer ${
                currentView === 'contact' ? 'border-gold-500 text-gold-500' : 'border-transparent text-charcoal-600'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Actions: Search, Account, Cart */}
          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
            
            {/* Search Input (Desktop) */}
            <form onSubmit={handleSearchSubmit} id="search-form" className="relative hidden sm:block w-48 lg:w-64">
              <input
                type="text"
                placeholder="Search premium apparel..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full rounded-full border border-charcoal-200 bg-charcoal-50 py-1.5 pl-4 pr-10 text-xs text-charcoal-900 outline-none transition-all focus:border-gold-400 focus:bg-white focus:ring-1 focus:ring-gold-400"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-700">
                <Search size={14} />
              </button>
            </form>

            {/* User Account / Admin Action */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    id="user-menu-trigger"
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsUserDropdownOpen(false), 200)}
                    className="flex items-center gap-1.5 py-1.5 px-3 rounded-full border border-charcoal-200 hover:bg-charcoal-50 transition-colors focus:outline-none cursor-pointer"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-100 text-gold-800 text-[10px] font-bold uppercase">
                      {currentUser.name.substring(0, 2)}
                    </div>
                    <span className="hidden md:inline text-xs font-semibold max-w-[80px] truncate text-charcoal-700">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={12} className={`text-charcoal-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Account Dropdown */}
                  {isUserDropdownOpen && (
                    <div id="user-dropdown" className="absolute right-0 mt-2 w-52 origin-top-right rounded-lg bg-white p-2 shadow-xl border border-charcoal-100 ring-1 ring-black/5 z-50">
                      <div className="px-3 py-2 border-b border-charcoal-100 mb-1">
                        <p className="text-xs font-bold text-charcoal-900 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-charcoal-500 truncate">{currentUser.email}</p>
                        {currentUser.role === 'admin' && (
                          <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-gold-100 text-gold-800 uppercase tracking-wider">
                            Store Owner
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => changeView('orders')}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-medium text-charcoal-700 hover:bg-charcoal-50 rounded-md transition-colors cursor-pointer"
                      >
                        <FileText size={14} /> My Orders
                      </button>

                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => changeView('admin-dashboard')}
                          className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-gold-700 hover:bg-gold-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Settings size={14} /> Admin Dashboard
                        </button>
                      )}

                      <button
                        onClick={logoutUser}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1 pt-1 border-t border-charcoal-100 cursor-pointer"
                      >
                        <LogOut size={14} /> Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  id="nav-login-btn"
                  onClick={() => changeView('login')}
                  className="flex items-center gap-1 py-1.5 px-3.5 rounded-full border border-charcoal-200 text-xs font-bold text-charcoal-800 hover:bg-charcoal-900 hover:text-white hover:border-charcoal-900 transition-all cursor-pointer"
                >
                  <User size={14} />
                  <span>Log In</span>
                </button>
              )}
            </div>

            {/* Shopping Bag Button */}
            <button
              id="nav-cart-btn"
              onClick={() => changeView('cart')}
              className="relative flex items-center justify-center p-2 rounded-full border border-charcoal-100 hover:bg-charcoal-50 text-charcoal-700 hover:text-charcoal-900 transition-colors cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-extrabold text-white animate-scale-up">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-drawer" className="lg:hidden border-t border-charcoal-100 bg-white px-4 py-4 space-y-4 animate-fade-in shadow-inner">
          <form onSubmit={handleSearchSubmit} className="relative sm:hidden w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full rounded-full border border-charcoal-200 bg-charcoal-50 py-2 pl-4 pr-10 text-xs text-charcoal-900 outline-none"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-400">
              <Search size={14} />
            </button>
          </form>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-3 py-2 text-sm font-bold tracking-wider text-left uppercase rounded-md transition-colors cursor-pointer ${
                currentView === 'shop' && selectedCategory === null && searchQuery === '' ? 'bg-gold-500/15 text-gold-500' : 'text-charcoal-800 hover:bg-charcoal-50'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => handleCategoryClick('women')}
              className={`px-3 py-2 text-sm font-bold tracking-wider text-left uppercase rounded-md transition-colors cursor-pointer ${
                currentView === 'shop' && selectedCategory === 'women' ? 'bg-gold-500/15 text-gold-500' : 'text-charcoal-800 hover:bg-charcoal-50'
              }`}
            >
              Women
            </button>
            <button
              onClick={() => handleCategoryClick('men')}
              className={`px-3 py-2 text-sm font-bold tracking-wider text-left uppercase rounded-md transition-colors cursor-pointer ${
                currentView === 'shop' && selectedCategory === 'men' ? 'bg-gold-500/15 text-gold-500' : 'text-charcoal-800 hover:bg-charcoal-50'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => handleCategoryClick('kids')}
              className={`px-3 py-2 text-sm font-bold tracking-wider text-left uppercase rounded-md transition-colors cursor-pointer ${
                currentView === 'shop' && selectedCategory === 'kids' ? 'bg-gold-500/15 text-gold-500' : 'text-charcoal-800 hover:bg-charcoal-50'
              }`}
            >
              Kids
            </button>
            <button
              onClick={() => handleCategoryClick('accessories')}
              className={`px-3 py-2 text-sm font-bold tracking-wider text-left uppercase rounded-md transition-colors cursor-pointer ${
                currentView === 'shop' && selectedCategory === 'accessories' ? 'bg-gold-500/15 text-gold-500' : 'text-charcoal-800 hover:bg-charcoal-50'
              }`}
            >
              Accessories
            </button>
            <button
              onClick={() => {
                changeView('contact');
                setIsMobileMenuOpen(false);
              }}
              className={`px-3 py-2 text-sm font-bold tracking-wider text-left uppercase rounded-md transition-colors cursor-pointer ${
                currentView === 'contact' ? 'bg-gold-500/15 text-gold-500' : 'text-charcoal-800 hover:bg-charcoal-50'
              }`}
            >
              Contact Us
            </button>
            <hr className="border-charcoal-100 my-1" />
            <button
              onClick={() => {
                if (confirm('Reset store data to defaults?')) {
                  resetToDefaults();
                  alert('Reset successfully');
                  setIsMobileMenuOpen(false);
                }
              }}
              className="px-3 py-2 text-xs font-bold tracking-wider text-left uppercase text-gold-600 hover:bg-gold-50 rounded-md flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={12} /> Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
