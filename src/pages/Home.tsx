/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Gift, Percent } from 'lucide-react';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: string | null;
}

const HERO_SLIDES: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80',
    tagline: 'SUMMER SOLSTICE COLLECTION',
    title: 'Warm Days, Light Fabrics',
    subtitle: 'Discover our breathable organic European flax linens and airy summer slip dresses designed for ultimate sun-kissed luxury.',
    category: 'women'
  },
  {
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1600&auto=format&fit=crop&q=80',
    tagline: 'NORDIC MINIMALISM',
    title: 'Tailored for Every Day',
    subtitle: 'Experience classic silhouettes, refined tailoring, and premium sustainable materials designed to elevate your everyday capsule wardrobe.',
    category: 'men'
  },
  {
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1600&auto=format&fit=crop&q=80',
    tagline: 'PREMIUM UTILITY BAGS',
    title: 'Crafted Leather Accents',
    subtitle: 'Meticulously handcrafted vegetable-tanned leather backpacks and canvas sneakers built with modern geometries.',
    category: 'accessories'
  }
];

export default function Home() {
  const { products, changeView, setSelectedCategory } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [couponCopied, setCouponCopied] = useState(false);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleExploreCategory = (category: string | null) => {
    setSelectedCategory(category);
    changeView('shop');
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('STYLE15');
    setCouponCopied(true);
    setTimeout(() => setCouponCopied(false), 3000);
  };

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div id="home-view" className="space-y-16 pb-16 animate-fade-in">
      
      {/* Hero Carousel Slider Section */}
      <section id="hero-slider" className="relative h-[450px] md:h-[580px] w-full overflow-hidden bg-charcoal-900">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Slide Background Image */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            
            {/* Slide Content Box */}
            <div className="absolute inset-0 z-20 flex items-center">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full text-white space-y-4 md:space-y-6">
                <p className="font-mono text-xs md:text-sm font-extrabold tracking-widest text-gold-300 uppercase flex items-center gap-1.5 animate-fade-in-up">
                  <Sparkles size={14} className="animate-pulse text-gold-300" /> {slide.tagline}
                </p>
                <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight max-w-2xl leading-tight">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-base max-w-xl text-charcoal-200 font-light leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => handleExploreCategory(slide.category)}
                    className="inline-flex items-center gap-2 rounded-full bg-white text-charcoal-900 px-6 py-3 text-xs md:text-sm font-bold shadow-md hover:bg-gold-400 hover:text-white hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    Explore Collection <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-colors focus:outline-none"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs transition-colors focus:outline-none"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Visual Directory Grid */}
      <section id="categories-grid" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <p className="font-mono text-2xs font-extrabold tracking-widest text-gold-600 uppercase">Aesthetic Curation</p>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-charcoal-900">Browse by Category</h2>
          <div className="mx-auto h-0.5 w-12 bg-gold-400" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Women Category Card */}
          <div
            onClick={() => handleExploreCategory('women')}
            className="group relative h-80 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-charcoal-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/10 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80"
              alt="Women"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 bottom-5 z-20 flex flex-col items-center text-center">
              <h3 className="font-serif text-xl font-bold text-white tracking-wide">Women's Wear</h3>
              <p className="text-3xs font-mono text-gold-300 tracking-widest uppercase mt-1">Elegance Crafted</p>
            </div>
          </div>

          {/* Men Category Card */}
          <div
            onClick={() => handleExploreCategory('men')}
            className="group relative h-80 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-charcoal-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/10 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80"
              alt="Men"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 bottom-5 z-20 flex flex-col items-center text-center">
              <h3 className="font-serif text-xl font-bold text-white tracking-wide">Men's Wear</h3>
              <p className="text-3xs font-mono text-gold-300 tracking-widest uppercase mt-1">Classic Tailored</p>
            </div>
          </div>

          {/* Kids Category Card */}
          <div
            onClick={() => handleExploreCategory('kids')}
            className="group relative h-80 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-charcoal-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/10 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1471286174243-e7a4d9afb30a?w=600&auto=format&fit=crop&q=80"
              alt="Kids"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 bottom-5 z-20 flex flex-col items-center text-center">
              <h3 className="font-serif text-xl font-bold text-white tracking-wide">Kids' Collection</h3>
              <p className="text-3xs font-mono text-gold-300 tracking-widest uppercase mt-1">Playful Organic</p>
            </div>
          </div>

          {/* Accessories Category Card */}
          <div
            onClick={() => handleExploreCategory('accessories')}
            className="group relative h-80 rounded-xl overflow-hidden cursor-pointer shadow-sm border border-charcoal-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-charcoal-950/10 to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=600&auto=format&fit=crop&q=80"
              alt="Accessories"
              referrerPolicy="no-referrer"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-4 bottom-5 z-20 flex flex-col items-center text-center">
              <h3 className="font-serif text-xl font-bold text-white tracking-wide">Accessories</h3>
              <p className="text-3xs font-mono text-gold-300 tracking-widest uppercase mt-1">Minimal Details</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Arrivals Showcase */}
      <section id="featured-arrivals" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between border-b border-charcoal-100 pb-5 mb-10 gap-4">
          <div>
            <p className="font-mono text-2xs font-extrabold tracking-widest text-gold-600 uppercase">Curated Showcase</p>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-charcoal-900 mt-1">New & Featured Arrivals</h2>
          </div>
          <button
            onClick={() => handleExploreCategory(null)}
            className="group inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-charcoal-800 hover:text-gold-500 transition-colors cursor-pointer"
          >
            Shop All Arrivals <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Lab Coupon Banner */}
      <section id="coupon-banner" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-gold-800 to-gold-950 p-8 md:p-12 shadow-md text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold-400/20 text-xs font-bold text-gold-200 tracking-wide uppercase">
              <Gift size={12} /> Student Lab Discount
            </span>
            <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight">Enjoy 15% Off Your Entire Cart</h3>
            <p className="text-xs text-gold-100/85 leading-relaxed">
              We have pre-configured a promo code for testing checkout. Apply this code in your shopping bag to reduce product costs by 15% instantly.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 border border-white/20 p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center backdrop-blur-xs min-w-[200px]">
            <span className="text-2xs font-bold uppercase tracking-widest text-gold-200">PROMO CODE</span>
            <span className="font-mono text-2xl font-black text-white bg-charcoal-900/40 px-4 py-1 rounded border border-white/10 tracking-wider">
              STYLE15
            </span>
            <button
              onClick={handleCopyCoupon}
              className="mt-2 w-full text-center text-xs font-bold py-1.5 px-4 bg-white text-charcoal-900 rounded hover:bg-gold-100 transition-colors cursor-pointer"
            >
              {couponCopied ? '✓ Copied' : 'Copy Code'}
            </button>
          </div>
        </div>
      </section>

      {/* Brand Values / Editorial Block */}
      <section id="brand-story" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-2xl overflow-hidden border border-charcoal-100/80 p-8 md:p-12 shadow-sm">
          <div className="space-y-6">
            <span className="font-mono text-2xs font-extrabold tracking-widest text-gold-600 uppercase">StyleNest Philosophy</span>
            <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-charcoal-900 leading-tight">
              Designed for Comfort, Styled for Sophistication.
            </h2>
            <p className="text-xs text-charcoal-600 leading-relaxed">
              At StyleNest, we believe luxury shouldn't compromise the planet. Every garment in our collection is carefully curated from organic linens, ethically harvested wools, and GOTS-certified baby apparel. Our designs aim for timeless simplicity over short-lived trends.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-charcoal-100">
              <div>
                <span className="block text-2xl font-serif font-black text-gold-600">100%</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-charcoal-400">Organic Flax Linen</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-black text-gold-600">Zero</span>
                <span className="text-[10px] uppercase tracking-wider font-bold text-charcoal-400">Harsh Dye Chemicals</span>
              </div>
            </div>
          </div>
          <div className="h-96 rounded-xl overflow-hidden shadow-inner bg-charcoal-100">
            <img
              src="https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800&auto=format&fit=crop&q=80"
              alt="Boutique philosophy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
