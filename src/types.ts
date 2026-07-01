/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number; // For sales
  category: string; // 'men' | 'women' | 'kids' | 'accessories'
  sizes: string[]; // e.g. ['S', 'M', 'L', 'XL']
  colors: string[]; // e.g. ['Black', 'White', 'Beige']
  images: string[]; // Image URLs
  stock: number;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string; // Unique for cart (productId + size + color)
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  email: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  paymentMethod: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    image: string;
    quantity: number;
    size: string;
    color: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  trackingId: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
