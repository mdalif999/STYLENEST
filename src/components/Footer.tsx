/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

export default function Footer() {
  const { changeView, setSelectedCategory } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleCategoryClick = (cat: string | null) => {
    setSelectedCategory(cat);
    changeView('shop');
  };

  return (
    <footer id="main-footer" className="bg-charcoal-900 text-charcoal-300">
      
      {/* Brand Value Props Bar */}
      <div className="border-b border-charcoal-800 bg-charcoal-950 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-charcoal-800 p-3 text-gold-400">
                <Truck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">Free Shipping</h4>
                <p className="mt-1 text-xs text-charcoal-400 leading-relaxed">On all orders over ৳150 with quick reliable express delivery.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-charcoal-800 p-3 text-gold-400">
                <RefreshCw size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">Easy Returns</h4>
                <p className="mt-1 text-xs text-charcoal-400 leading-relaxed">30-day hassle-free return and exchange policy for perfect fit.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-charcoal-800 p-3 text-gold-400">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">Secure Payment</h4>
                <p className="mt-1 text-xs text-charcoal-400 leading-relaxed">Fully encrypted checkout and multiple premium transaction modes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-charcoal-800 p-3 text-gold-400">
                <Star size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">Premium Quality</h4>
                <p className="mt-1 text-xs text-charcoal-400 leading-relaxed">Carefully sourced materials and meticulously checked craftsmanship.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Column 1: Store Intro */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-2xl font-bold tracking-widest text-white uppercase">
              STYLE<span className="text-gold-400 font-sans font-light">NEST</span>
            </h3>
            <p className="mt-4 text-xs text-charcoal-400 leading-relaxed max-w-md">
              StyleNest is a curated premium clothing destination combining modern designs, high-quality organic fabrics, and sustainable processes. Experience a tailored fashion lab crafted for everyday elegance and luxury.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#instagram" className="rounded-full bg-charcoal-800 p-2 text-charcoal-400 hover:bg-gold-500 hover:text-white transition-all">
                <Instagram size={16} />
              </a>
              <a href="#facebook" className="rounded-full bg-charcoal-800 p-2 text-charcoal-400 hover:bg-gold-500 hover:text-white transition-all">
                <Facebook size={16} />
              </a>
              <a href="#twitter" className="rounded-full bg-charcoal-800 p-2 text-charcoal-400 hover:bg-gold-500 hover:text-white transition-all">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-4">Shop Categories</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => handleCategoryClick(null)} className="text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer">
                  Shop All Apparel
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('women')} className="text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer">
                  Women's Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('men')} className="text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer">
                  Men's Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('kids')} className="text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer">
                  Kids' Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('accessories')} className="text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer">
                  Accessories & Bags
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => changeView('contact')} className="text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => changeView('orders')} className="text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => changeView('login')} className="text-charcoal-400 hover:text-gold-400 transition-colors cursor-pointer">
                  Account Registration
                </button>
              </li>
              <li>
                <a href="#shipping-policy" className="text-charcoal-400 hover:text-gold-400 transition-colors">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#faq" className="text-charcoal-400 hover:text-gold-400 transition-colors">
                  FAQs & Sizing Help
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-white uppercase mb-4">Stay Inspired</h4>
            <p className="text-xs text-charcoal-400 leading-relaxed mb-4">
              Subscribe to get styling advice, early collection access, and 15% off your first purchase.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded bg-charcoal-800 border border-charcoal-700 py-2 pl-3 pr-10 text-xs text-white placeholder-charcoal-500 outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gold-400 hover:text-gold-300">
                  <Mail size={14} />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-green-400 font-medium">✓ Subscribed successfully! Thank you.</p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar Details */}
        <div className="mt-16 border-t border-charcoal-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-charcoal-500">
          <div>
            <p className="flex items-center gap-1">
              <MapPin size={12} className="text-gold-400" /> StyleNest Flagship Store, Banani, Dhaka, BD
            </p>
            <p className="flex items-center gap-1 mt-1">
              <Phone size={12} className="text-gold-400" /> +880 1712-345678 | support@stylenest.com
            </p>
          </div>
          
          <div className="text-left md:text-right">
            <p>© {new Date().getFullYear()} StyleNest. All Rights Reserved.</p>
            <p className="mt-1 font-mono text-[10px] text-charcoal-600 uppercase">
              Web & E-Commerce Lab Project • Submitted for Grading
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
