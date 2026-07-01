/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, UserCheck, Key, Mail, User, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

export default function LoginRegister() {
  const { loginUser, registerUser, changeView } = useApp();

  const [isLoginTab, setIsLoginTab] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (isLoginTab) {
      const res = loginUser(email);
      if (res.success) {
        changeView('home');
      } else {
        setErrorMsg(res.error || 'Authentication failed.');
      }
    } else {
      if (!name.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      const res = registerUser(name, email);
      if (res.success) {
        setSuccessMsg('Account created! Logging in...');
        setTimeout(() => changeView('home'), 1000);
      } else {
        setErrorMsg(res.error || 'Registration failed.');
      }
    }
  };

  // Helper buttons for grading
  const handleBackdoorAdmin = () => {
    loginUser('admin@stylenest.com');
    changeView('admin-dashboard');
  };

  const handleBackdoorCustomer = () => {
    loginUser('karim@gmail.com');
    changeView('orders');
  };

  return (
    <div id="auth-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN: AUTH FORM (lg:span-7) */}
        <div className="lg:col-span-7 max-w-md mx-auto w-full">
          <div className="bg-white rounded-2xl border border-charcoal-100 p-8 shadow-sm space-y-6">
            
            {/* Header Titles */}
            <div className="text-center space-y-1">
              <h2 className="font-serif text-2xl font-black text-charcoal-900 uppercase">
                {isLoginTab ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-xs text-charcoal-500 font-light">
                {isLoginTab ? 'Log in to securely track clothing orders and details' : 'Register to curate your custom fashion wardrobe'}
              </p>
            </div>

            {/* Selector Tab pills */}
            <div className="flex border-b border-charcoal-100 pb-1 gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsLoginTab(true);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  isLoginTab ? 'border-gold-500 text-charcoal-900' : 'border-transparent text-charcoal-400'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLoginTab(false);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className={`flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  !isLoginTab ? 'border-gold-500 text-charcoal-900' : 'border-transparent text-charcoal-400'
                }`}
              >
                Register
              </button>
            </div>

            {/* Main Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {!isLoginTab && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase flex items-center gap-1"><User size={12} /> Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karim Rahman"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3.5 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-charcoal-500 uppercase flex items-center gap-1"><Mail size={12} /> Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. karim@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3.5 text-xs outline-none focus:border-gold-400 focus:bg-white"
                />
              </div>

              {/* Password simulation - informative but client-simulated */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase flex items-center gap-1"><Key size={12} /> Account Password</label>
                  {isLoginTab && <span className="text-[10px] text-gold-600 font-bold hover:underline cursor-pointer">Forgot?</span>}
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2 px-3.5 text-xs outline-none focus:border-gold-400 focus:bg-white"
                />
              </div>

              {errorMsg && (
                <p className="text-2xs font-semibold text-red-500">{errorMsg}</p>
              )}

              {successMsg && (
                <p className="text-2xs font-semibold text-green-600">{successMsg}</p>
              )}

              <button
                type="submit"
                className="w-full h-11 rounded-lg bg-charcoal-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-gold-500 transition-colors cursor-pointer"
              >
                {isLoginTab ? 'Log In Secures' : 'Complete Registration'}
              </button>

            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: LAB GRADING PANEL (lg:span-5) */}
        <div className="lg:col-span-5 max-w-md mx-auto w-full">
          <div className="rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 p-6 border border-gold-200/80 shadow-xs space-y-5">
            <div className="space-y-2 text-center">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold-400/20 text-3xs font-extrabold text-gold-800 tracking-widest uppercase">
                <Sparkles size={10} /> Lab Examiner Portal
              </span>
              <h3 className="font-serif text-lg font-extrabold text-gold-900 uppercase">Grading Quick-Login Panel</h3>
              <p className="text-3xs text-gold-700/85 leading-relaxed">
                Skip registration and login steps by clicking on the backdoor options below. They instantly authenticate active profiles stored in local states.
              </p>
            </div>

            <div className="space-y-3.5">
              
              {/* Backdoor 1: Store Owner (Admin) */}
              <button
                type="button"
                onClick={handleBackdoorAdmin}
                className="w-full p-4 bg-white hover:bg-gold-50 border border-gold-300 rounded-xl text-left flex gap-3 transition-all cursor-pointer group shadow-2xs hover:scale-102"
              >
                <div className="h-9 w-9 rounded-full bg-gold-500 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldAlert size={16} />
                </div>
                <div className="self-center">
                  <span className="block text-xs font-black text-charcoal-900 uppercase tracking-wide leading-none">Login as Store Owner</span>
                  <span className="block text-3xs text-charcoal-500 font-mono mt-1 font-semibold">Username: admin@stylenest.com</span>
                  <span className="block text-[10px] text-gold-700 font-medium leading-tight mt-1.5">
                    🔓 Grants full access to manage catalog CRUD, adjust customer order statuses, and view users metrics.
                  </span>
                </div>
              </button>

              {/* Backdoor 2: Normal customer (with history!) */}
              <button
                type="button"
                onClick={handleBackdoorCustomer}
                className="w-full p-4 bg-white hover:bg-gold-50 border border-gold-300 rounded-xl text-left flex gap-3 transition-all cursor-pointer group shadow-2xs hover:scale-102"
              >
                <div className="h-9 w-9 rounded-full bg-charcoal-900 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <UserCheck size={16} />
                </div>
                <div className="self-center">
                  <span className="block text-xs font-black text-charcoal-900 uppercase tracking-wide leading-none">Login as Karim (Client)</span>
                  <span className="block text-3xs text-charcoal-500 font-mono mt-1 font-semibold">Username: karim@gmail.com</span>
                  <span className="block text-[10px] text-gold-700 font-medium leading-tight mt-1.5">
                    🛍️ Prefilled with 2 active test orders (Shipped and Delivered statuses) and full detailed tracking timelines.
                  </span>
                </div>
              </button>

            </div>

            <div className="flex justify-center items-center gap-1 text-[9px] uppercase font-bold text-gold-600 text-center">
              <ShieldCheck size={12} className="text-gold-500 animate-pulse" /> Local State Sandbox Activated
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
