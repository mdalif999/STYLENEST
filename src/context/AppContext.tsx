/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, Review, ContactMessage } from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, DEFAULT_USERS, INITIAL_ORDERS } from '../mockData';

interface AppContextProps {
  products: Product[];
  reviews: Review[];
  orders: Order[];
  users: User[];
  currentUser: User | null;
  cart: CartItem[];
  currentView: string;
  selectedProductId: string | null;
  selectedCategory: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  changeView: (view: string, productId?: string | null, category?: string | null) => void;
  
  // Auth
  registerUser: (name: string, email: string, role?: 'customer' | 'admin') => { success: boolean; error?: string };
  loginUser: (email: string) => { success: boolean; error?: string };
  logoutUser: () => void;
  
  // Cart
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // Checkout
  placeOrder: (shipping: { address: string; city: string; postalCode: string; country: string }, phone: string, paymentMethod: string) => { success: boolean; orderId?: string };
  
  // Product Reviews
  addReview: (productId: string, rating: number, comment: string) => void;
  
  // Admin Operations
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  toggleUserRole: (id: string) => void;
  
  // Contact Us
  submitContactForm: (message: Omit<ContactMessage, 'id' | 'createdAt'>) => void;
  
  // System Helper
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Load initial states from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('sn_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('sn_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sn_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('sn_users');
    return saved ? JSON.parse(saved) : DEFAULT_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('sn_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('sn_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // UI Views Routing State
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sn_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('sn_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('sn_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sn_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('sn_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('sn_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('sn_cart', JSON.stringify(cart));
  }, [cart]);

  // Quick navigation helper
  const changeView = (view: string, productId: string | null | undefined = undefined, category: string | null | undefined = undefined) => {
    setCurrentView(view);
    if (productId !== undefined) setSelectedProductId(productId);
    if (category !== undefined) setSelectedCategory(category);
    // Scroll to top of the page on view change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Functions
  const registerUser = (name: string, email: string, role: 'customer' | 'admin' = 'customer') => {
    const normalizedEmail = email.trim().toLowerCase();
    const exists = users.some(u => u.email.toLowerCase() === normalizedEmail);
    if (exists) {
      return { success: false, error: 'User with this email already exists.' };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      role: role,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    return { success: true };
  };

  const loginUser = (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Quick admin backdoor if they type admin@stylenest.com
    if (normalizedEmail === 'admin@stylenest.com' && !users.some(u => u.email === 'admin@stylenest.com')) {
      const defaultAdmin = DEFAULT_USERS[0];
      setUsers(prev => [...prev, defaultAdmin]);
      setCurrentUser(defaultAdmin);
      return { success: true };
    }

    const found = users.find(u => u.email.toLowerCase() === normalizedEmail);
    if (!found) {
      return { success: false, error: 'User not found. Please register or check the email.' };
    }

    setCurrentUser(found);
    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setCart([]);
    changeView('home');
  };

  // Cart Operations
  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, {
          id: cartItemId,
          product,
          quantity,
          selectedSize: size,
          selectedColor: color
        }];
      }
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Checkout / Orders
  const placeOrder = (
    shipping: { address: string; city: string; postalCode: string; country: string },
    phone: string,
    paymentMethod: string
  ) => {
    if (!currentUser) {
      return { success: false, error: 'You must be logged in to place an order.' };
    }
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty.' };
    }

    // Prepare order details
    const orderItems = cart.map(item => ({
      productId: item.product.id,
      productName: item.product.name,
      price: item.product.price,
      image: item.product.images[0],
      quantity: item.quantity,
      size: item.selectedSize,
      color: item.selectedColor
    }));

    const orderTotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      customerName: currentUser.name,
      email: currentUser.email,
      shippingAddress: shipping,
      phone: phone,
      paymentMethod: paymentMethod,
      items: orderItems,
      total: orderTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
      trackingId: `TRK-SN-${Math.floor(1000000 + Math.random() * 9000000)}`
    };

    // Deduct stock
    setProducts(prevProducts => {
      return prevProducts.map(p => {
        const cartItemsForProduct = cart.filter(item => item.product.id === p.id);
        if (cartItemsForProduct.length > 0) {
          const totalDeducted = cartItemsForProduct.reduce((sum, item) => sum + item.quantity, 0);
          return {
            ...p,
            stock: Math.max(0, p.stock - totalDeducted)
          };
        }
        return p;
      });
    });

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    return { success: true, orderId: newOrder.id };
  };

  // Reviews
  const addReview = (productId: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      userName: currentUser ? currentUser.name : 'Guest Customer',
      rating,
      comment,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Re-calculate rating for the product
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const productReviews = updatedReviews.filter(r => r.productId === productId);
        const avgRating = parseFloat((productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1));
        return {
          ...p,
          rating: avgRating,
          reviewsCount: productReviews.length
        };
      }
      return p;
    }));
  };

  // Admin Ops
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    // Clear product from cart if active
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const toggleUserRole = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newRole = u.role === 'admin' ? 'customer' : 'admin';
        // If current logged-in user is updated, update currentUser state as well
        if (currentUser && currentUser.id === id) {
          setCurrentUser({ ...u, role: newRole });
        }
        return { ...u, role: newRole };
      }
      return u;
    }));
  };

  // Contact Form
  const submitContactForm = (message: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const messages = JSON.parse(localStorage.getItem('sn_contact_messages') || '[]');
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('sn_contact_messages', JSON.stringify([...messages, newMessage]));
  };

  // Restore Defaults for easy grading and demo state
  const resetToDefaults = () => {
    localStorage.removeItem('sn_products');
    localStorage.removeItem('sn_reviews');
    localStorage.removeItem('sn_orders');
    localStorage.removeItem('sn_users');
    localStorage.removeItem('sn_current_user');
    localStorage.removeItem('sn_cart');
    localStorage.removeItem('sn_contact_messages');
    
    setProducts(INITIAL_PRODUCTS);
    setReviews(INITIAL_REVIEWS);
    setOrders(INITIAL_ORDERS);
    setUsers(DEFAULT_USERS);
    setCurrentUser(null);
    setCart([]);
    setSearchQuery('');
    setSelectedCategory(null);
    setCurrentView('home');
  };

  return (
    <AppContext.Provider value={{
      products,
      reviews,
      orders,
      users,
      currentUser,
      cart,
      currentView,
      selectedProductId,
      selectedCategory,
      searchQuery,
      setSearchQuery,
      setSelectedCategory,
      changeView,
      
      registerUser,
      loginUser,
      logoutUser,
      
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      
      placeOrder,
      addReview,
      
      addProduct,
      updateProduct,
      deleteProduct,
      updateOrderStatus,
      toggleUserRole,
      submitContactForm,
      resetToDefaults
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
