import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShopProvider, useShop } from './store/ShopContext';

import Home from './pages/Home';
import PLP from './pages/PLP';
import PDP from './pages/PDP';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Login from './pages/Login';
import OrderTracking from './pages/OrderTracking';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import AdminDashboard from './pages/AdminDashboard';

// Protected Admin Route Guard
function ProtectedAdminRoute({ children }) {
  const { user } = useShop();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jewellery" element={<PLP />} />
          <Route path="/jewellery/:categoryParam" element={<PLP />} />
          <Route path="/product/:identifier" element={<PDP />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

