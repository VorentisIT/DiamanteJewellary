import React, { createContext, useContext, useState, useEffect } from 'react';

const ShopContext = createContext();

export const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const ShopProvider = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aurelia_cart');
    return saved ? JSON.parse(saved) : [
      {
        _id: 'cart_item_1',
        product: {
          _id: 'mem_prod_1',
          name: 'Celeste Diamond Ring',
          slug: 'celeste-diamond-ring',
          price: 48900,
          metal: '18K Gold',
          images: ['/assets/category_rings.jpg'],
          category: 'Rings'
        },
        quantity: 1,
        selectedSize: '7',
        selectedMetal: '18K Gold'
      }
    ];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aurelia_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Auth User State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('aurelia_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Applied Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Quick View Modal Product
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Is Cart Drawer Open
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('aurelia_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aurelia_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aurelia_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('aurelia_user');
    }
  }, [user]);

  // Cart Functions
  const addToCart = (product, quantity = 1, selectedSize = '7', selectedMetal = '18K Gold') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product._id === product._id && item.selectedSize === selectedSize && item.selectedMetal === selectedMetal
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [
        ...prev,
        {
          _id: `cart_${Date.now()}`,
          product,
          quantity,
          selectedSize,
          selectedMetal
        }
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item._id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item._id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p._id === product._id);
      if (exists) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((p) => p._id === productId);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 25000;
  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 500;
  const discountAmount = appliedCoupon ? (cartSubtotal * appliedCoupon.discountPercentage) / 100 : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  // User Auth
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aurelia_user');
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        shippingFee,
        discountAmount,
        cartTotal,
        freeShippingThreshold,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        login,
        logout,
        appliedCoupon,
        setAppliedCoupon,
        quickViewProduct,
        setQuickViewProduct,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
