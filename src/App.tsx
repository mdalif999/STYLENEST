/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import LoginRegister from './pages/LoginRegister';
import MyOrders from './pages/MyOrders';
import ContactUs from './pages/ContactUs';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';

function AppContent() {
  const { currentView } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <Home />;
      case 'shop':
        return <ProductListing />;
      case 'details':
        return <ProductDetails />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'login':
        return <LoginRegister />;
      case 'orders':
        return <MyOrders />;
      case 'contact':
        return <ContactUs />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-products':
        return <ManageProducts />;
      case 'admin-orders':
        return <ManageOrders />;
      case 'admin-users':
        return <ManageUsers />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0B0D] text-[#E2E4E9] selection:bg-[#E5C158] selection:text-black">
      <Navbar />
      <main className="flex-grow">
        {renderActiveView()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
