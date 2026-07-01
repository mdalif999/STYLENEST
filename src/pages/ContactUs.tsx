/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle, Clock } from 'lucide-react';

export default function ContactUs() {
  const { submitContactForm } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product sizing question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    submitContactForm({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject,
      message: message.trim()
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div id="contact-view" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-12">
      
      {/* Title block */}
      <div className="text-center space-y-2">
        <p className="font-mono text-2xs font-extrabold tracking-widest text-gold-600 uppercase">Interactive Service Hub</p>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-charcoal-900">Get in Touch</h1>
        <p className="text-xs text-charcoal-500 max-w-md mx-auto">
          Whether you need help choosing a size, tracking an active courier dispatch, or requesting return slips, we are here.
        </p>
        <div className="mx-auto h-0.5 w-12 bg-gold-400 mt-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: CONTACT DETAILS & MAP (lg:span-5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Details Card */}
          <div className="bg-white rounded-2xl border border-charcoal-100 p-6 shadow-3xs space-y-6">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-3">
              Flagship Boutique
            </h3>

            <div className="space-y-4 text-xs text-charcoal-600">
              <div className="flex gap-3 items-start">
                <div className="rounded-full bg-gold-50 p-2.5 text-gold-600 shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="block font-bold text-charcoal-800">Store Address</span>
                  <p className="mt-0.5">StyleNest Flagship Store, House 12, Road 11, Banani, Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="rounded-full bg-gold-50 p-2.5 text-gold-600 shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="block font-bold text-charcoal-800">Phone Support</span>
                  <p className="mt-0.5">+880 1712-345678 (10:00 AM - 8:00 PM GMT+6)</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="rounded-full bg-gold-50 p-2.5 text-gold-600 shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="block font-bold text-charcoal-800">Email Support</span>
                  <p className="mt-0.5">support@stylenest.com (24/7 Response priority)</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="rounded-full bg-gold-50 p-2.5 text-gold-600 shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="block font-bold text-charcoal-800">Boutique Timings</span>
                  <p className="mt-0.5">Saturday - Thursday: 10:00 AM - 10:00 PM</p>
                  <p>Friday: 3:00 PM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* SIMULATED MAP SECTION */}
          <div className="bg-white rounded-2xl border border-charcoal-100 p-4 shadow-3xs space-y-3">
            <span className="text-[10px] font-mono font-bold text-charcoal-400 block uppercase tracking-wider">Simulated Vector Map Location</span>
            
            {/* Visual grid layout representing a map */}
            <div className="relative h-48 w-full rounded-xl overflow-hidden bg-gold-50/50 border border-gold-200/60 flex items-center justify-center font-bold text-xs text-gold-800">
              {/* Decorative grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfd7cb_1px,transparent_1px),linear-gradient(to_bottom,#dfd7cb_1px,transparent_1px)] bg-[size:20px_20px] opacity-40" />
              
              {/* Simulated Roads */}
              <div className="absolute top-1/2 left-0 right-0 h-8 bg-white border-y border-charcoal-200/50 -translate-y-1/2 flex items-center pl-6 font-mono text-[9px] uppercase tracking-wider text-charcoal-400 font-bold">
                ROAD 11, BANANI
              </div>
              <div className="absolute left-1/3 top-0 bottom-0 w-8 bg-white border-x border-charcoal-200/50 flex items-center justify-center font-mono text-[9px] uppercase tracking-wider text-charcoal-400 font-bold rotate-90">
                Kamal Ataturk
              </div>

              {/* Pin point marker */}
              <div className="absolute top-1/3 left-2/3 flex flex-col items-center animate-bounce z-10">
                <MapPin size={24} className="text-red-500 fill-current" />
                <span className="bg-charcoal-900 text-white font-sans text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-widest mt-1 block shadow-md whitespace-nowrap">
                  STYLENEST BOUTIQUE
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CONTACT FORM (lg:span-7) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-charcoal-100 p-8 shadow-3xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="mx-auto h-16 w-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 border border-green-100 mb-2">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal-900">Message Transmitted Successfully!</h3>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting StyleNest support. We have stored your support message in the sandbox `localStorage` array. One of our stylists will response shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold px-4 py-2 bg-charcoal-900 hover:bg-gold-500 text-white rounded-full transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-charcoal-900 border-b border-charcoal-100 pb-3 flex items-center gap-1.5">
                <HelpCircle size={15} className="text-gold-500" /> Send an Inquiry
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Karim Rahman"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2.5 px-3.5 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-charcoal-500 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. karim@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2.5 px-3.5 text-xs outline-none focus:border-gold-400 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-charcoal-500 uppercase">Inquiry Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-lg border border-charcoal-200 bg-charcoal-50 py-2.5 px-3.5 text-xs outline-none focus:border-gold-400 focus:bg-white"
                >
                  <option value="Product sizing question">Apparel Sizing and Fitting Assistance</option>
                  <option value="Courier Tracking status">Courier Tracking Status</option>
                  <option value="Returns and exchanges">Returns, Exchanges, or Slip Refunds</option>
                  <option value="Wholesale and custom design">Bulk Orders and Custom Tailoring</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-charcoal-500 uppercase">Detailed Inquiry Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you need help with. Include any Order IDs if relevant..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-charcoal-200 bg-charcoal-50 p-4 text-xs outline-none focus:border-gold-400 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-charcoal-900 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs hover:bg-gold-500 transition-all cursor-pointer"
              >
                <Send size={12} /> Dispatch Inquiry Message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
