/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review, User, Order } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Premium Wool Trench Coat',
    description: 'Elevate your winter wardrobe with our signature Premium Wool Trench Coat. Crafted from a luxurious blend of Australian merino wool and cashmere, this coat features a double-breasted silhouette, tailored notch lapels, structured shoulders, and a detachable waist-defining belt. Fully lined with a silky satin fabric for effortless layering over cozy sweaters or tailored suits.',
    price: 189,
    originalPrice: 249,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Midnight Black', 'Slate Grey'],
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 12,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 34
  },
  {
    id: 'prod-2',
    name: 'Classic Linen Button-Down',
    description: 'Stay cool and sophisticated even in high humidity with our Classic Linen Shirt. Made from 100% premium European flax, this lightweight button-down offers unparalleled breathability and a relaxed yet refined drape. Features a traditional collar, single chest pocket, and adjustable button cuffs. Garment-washed for extra softness from the very first wear.',
    price: 59,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Sky Blue', 'Sage Green', 'Beige'],
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1621072156002-e2fcc103e86e?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 28,
    isFeatured: true,
    rating: 4.5,
    reviewsCount: 18
  },
  {
    id: 'prod-3',
    name: 'Silk Slip Midi Dress',
    description: 'Effortless glamour in a single piece. Our Silk Slip Midi Dress is cut on the bias from luxurious heavy-weight mulberry silk, allowing it to skim the body beautifully. Designed with a delicate cowl neckline, adjustable crossover spaghetti straps, and a subtle side slit for movement. Dress it down with a denim jacket and white sneakers, or elevate with heels.',
    price: 120,
    originalPrice: 145,
    category: 'women',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    colors: ['Emerald', 'Champagne Gold', 'Ruby Red', 'Classic Black'],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 8,
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 42
  },
  {
    id: 'prod-4',
    name: 'Oversized Heavyweight Hoodie',
    description: 'The ultimate lounge essential that doesn\'t sacrifice style. Built from an ultra-thick 450GSM organic cotton fleece, this heavyweight hoodie provides a cozy boxy fit and structure. Featuring a double-lined hood without drawstrings for a clean contemporary aesthetic, dropped shoulders, and a spacious kangaroo pocket. Preshrunk to retain its shape forever.',
    price: 75,
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Heather Grey', 'Off-White', 'Olive', 'Charcoal'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 35,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 25
  },
  {
    id: 'prod-5',
    name: 'Slim Fit Stretch Chinos',
    description: 'Meet your new everyday pants. Designed with a modern slim silhouette that tapers slightly from the knee down, these chinos are crafted from premium long-staple cotton woven with 3% elastane for maximum comfort and flexible movement. Features tailored slash side pockets, button-through back welt pockets, and a clean flat-front waistband.',
    price: 65,
    originalPrice: 79,
    category: 'men',
    sizes: ['30x30', '32x32', '34x32', '36x34'],
    colors: ['Navy Blue', 'Khaki', 'Dark Olive', 'Stone Grey'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 22,
    isFeatured: false,
    rating: 4.3,
    reviewsCount: 14
  },
  {
    id: 'prod-6',
    name: 'A-Line Pleated Summer Dress',
    description: 'Flowy, feminine, and perfect for warm sunny days. Our A-Line Summer Dress is crafted from a breathable cotton-modal blend that feels buttery soft on the skin. Detailed with a fitted smocked bodice, delicate flutter sleeves, and a beautifully tiered pleated skirt that moves gracefully. Includes a lightweight breathable inner lining.',
    price: 85,
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Sunflower Yellow', 'Lavender Purple', 'Powder Blue'],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 15,
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 21
  },
  {
    id: 'prod-7',
    name: 'Kids Cozy Denim Jacket',
    description: 'A miniature classic built for high-energy play. Crafted from durable 100% organic cotton medium-wash denim, this jacket is thick enough to block the wind but soft enough for all-day comfort. Designed with classic contrast stitching, dual chest button-flap pockets, button cuffs, and adjustable waist tabs. Pre-shrunk and completely machine washable.',
    price: 49,
    category: 'kids',
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Classic Indigo', 'Vintage Light Wash'],
    images: [
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 18,
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 16
  },
  {
    id: 'prod-8',
    name: 'Kids Organic Cotton Playsuit',
    description: 'Ultra-soft, ultra-comfy, and incredibly cute. Our one-piece Kids Playsuit is made from 100% GOTS-certified organic cotton rib knit, which offers natural stretch for active toddlers. Designed with a snap-button front for effortless dressing, flatlock seams to prevent skin irritation, and fold-over cuffs on smaller sizes. dyed with safe, non-toxic water-based inks.',
    price: 32,
    originalPrice: 38,
    category: 'kids',
    sizes: ['0-6M', '6-12M', '12-18M', '18-24M'],
    colors: ['Dusty Rose', 'Oatmeal Melange', 'Clay Orange'],
    images: [
      'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 25,
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 12
  },
  {
    id: 'prod-9',
    name: 'Minimalist Leather Backpack',
    description: 'Clean geometry meets daily utility. Expertly handcrafted from full-grain vegetable-tanned leather that will develop a gorgeous, unique patina over time. It features a padded laptop compartment (up to 15"), an interior zippered passport pocket, comfortable adjustable padded shoulder straps, and premium brass zipper closures. Perfect for the modern creative professional.',
    price: 145,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Tan Brown', 'Cognac', 'Ink Black'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 10,
    isFeatured: true,
    rating: 4.7,
    reviewsCount: 29
  },
  {
    id: 'prod-10',
    name: 'Classic Leather Sneakers',
    description: 'The luxury low-top sneaker, simplified. Crafted with an Italian full-grain calfskin leather upper, fully lined with breathable cowhide leather, and set on top of a durable Margom rubber cupsole. Includes waxed cotton laces, custom-cushioned footbeds with arch support, and hand-stitched detailing. They offer the perfect balance of dressed-up refinement and casual ease.',
    price: 110,
    originalPrice: 130,
    category: 'accessories',
    sizes: ['40', '41', '42', '43', '44'],
    colors: ['Minimalist White', 'Tan Accent White', 'Triple Black'],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 14,
    isFeatured: false,
    rating: 4.6,
    reviewsCount: 23
  },
  {
    id: 'prod-11',
    name: 'Acetate Polarized Sunglasses',
    description: 'A timeless silhouette constructed with high-end acetate. Inspired by vintage 1950s design, these sunglasses feature a hand-polished plant-based cellulose acetate frame and robust 5-barrel hinges. Equipped with premium polarized lenses offering 100% UVA/UVB protection, eliminating glare while enhancing contrast and true-color perception. Includes a premium protective leather case.',
    price: 45,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Tortoiseshell', 'Amber Honey', 'Polished Black'],
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80'
    ],
    stock: 30,
    isFeatured: false,
    rating: 4.4,
    reviewsCount: 15
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    userName: 'Jessica Miller',
    rating: 5,
    comment: 'Absolutely stunning! The camel color is perfect, and it feels extremely luxurious. It is heavy enough for NYC winter but drapes elegantly. Definitely worth every penny.',
    createdAt: '2026-06-15'
  },
  {
    id: 'rev-2',
    productId: 'prod-1',
    userName: 'Sarah K.',
    rating: 4,
    comment: 'Very warm and high quality. The shoulders run slightly structured/wide, so check measurements. The belt pulls the waist in beautifully.',
    createdAt: '2026-06-18'
  },
  {
    id: 'rev-3',
    productId: 'prod-2',
    userName: 'Daniel Ross',
    rating: 5,
    comment: 'The perfect summer linen shirt. Breathing is amazing, and it doesn\'t feel rough like cheap linen. Will buy in Sage next!',
    createdAt: '2026-06-12'
  },
  {
    id: 'rev-4',
    productId: 'prod-3',
    userName: 'Elena Rostova',
    rating: 5,
    comment: 'Stunning emerald color. The fabric feels like a second skin. Bias cut makes it look incredibly flattering on the hips.',
    createdAt: '2026-06-25'
  }
];

export const DEFAULT_USERS: User[] = [
  {
    id: 'user-admin',
    name: 'Admin Nest',
    email: 'admin@stylenest.com',
    role: 'admin',
    createdAt: '2026-01-01'
  },
  {
    id: 'user-cust',
    name: 'Karim Rahman',
    email: 'karim@gmail.com',
    role: 'customer',
    createdAt: '2026-03-10'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8921',
    userId: 'user-cust',
    customerName: 'Karim Rahman',
    email: 'karim@gmail.com',
    shippingAddress: {
      address: 'House 42, Road 11, Banani',
      city: 'Dhaka',
      postalCode: '1213',
      country: 'Bangladesh'
    },
    phone: '01712345678',
    paymentMethod: 'Credit Card',
    items: [
      {
        productId: 'prod-2',
        productName: 'Classic Linen Button-Down',
        price: 59,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
        quantity: 1,
        size: 'M',
        color: 'White'
      },
      {
        productId: 'prod-11',
        productName: 'Acetate Polarized Sunglasses',
        price: 45,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
        quantity: 1,
        size: 'One Size',
        color: 'Tortoiseshell'
      }
    ],
    total: 104,
    status: 'shipped',
    createdAt: '2026-06-20T10:30:00.000Z',
    trackingId: 'TRK-SN-7781920'
  },
  {
    id: 'ORD-7215',
    userId: 'user-cust',
    customerName: 'Karim Rahman',
    email: 'karim@gmail.com',
    shippingAddress: {
      address: 'Apartment 4B, Lalmatia',
      city: 'Dhaka',
      postalCode: '1207',
      country: 'Bangladesh'
    },
    phone: '01712345678',
    paymentMethod: 'Cash on Delivery',
    items: [
      {
        productId: 'prod-9',
        productName: 'Minimalist Leather Backpack',
        price: 145,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
        quantity: 1,
        size: 'One Size',
        color: 'Cognac'
      }
    ],
    total: 145,
    status: 'delivered',
    createdAt: '2026-05-14T14:20:00.000Z',
    trackingId: 'TRK-SN-1234567'
  }
];
