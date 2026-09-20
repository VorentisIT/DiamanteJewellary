import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { useShop, formatINR } from '../../store/ShopContext';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    freeShippingThreshold,
    shippingFee,
    discountAmount,
    cartTotal,
    appliedCoupon,
    setAppliedCoupon,
    isCartOpen,
    setIsCartOpen
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const progress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    if (couponCode.trim().toUpperCase() === 'AURELIA10') {
      setAppliedCoupon({ code: 'AURELIA10', discountPercentage: 10 });
      setCouponSuccess('10% Luxury discount applied!');
    } else if (couponCode.trim().toUpperCase() === 'BRIDAL15' && cartSubtotal >= 100000) {
      setAppliedCoupon({ code: 'BRIDAL15', discountPercentage: 15 });
      setCouponSuccess('15% Bridal Edit discount applied!');
    } else {
      setCouponError('Invalid coupon code or minimum order not met.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="bg-ivory w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-warm-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-xl font-bold uppercase tracking-widest text-charcoal">Your Shopping Bag</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-charcoal hover:text-gold transition-colors"
              aria-label="Close Shopping Bag"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="mt-4 bg-ivory-paper p-3 border border-warm-border rounded-sm">
            <div className="flex justify-between text-xs font-medium text-charcoal mb-1">
              {remainingForFreeShipping > 0 ? (
                <span>Add <strong className="text-gold font-bold">{formatINR(remainingForFreeShipping)}</strong> more for <strong>Free Insured Shipping</strong></span>
              ) : (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  ✓ You've unlocked Complimentary Express Insured Shipping!
                </span>
              )}
            </div>
            <div className="w-full bg-warm-border h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-gold h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-12 h-12 text-warm-gray mx-auto stroke-1" />
              <p className="font-serif text-lg text-charcoal">Your shopping bag is empty.</p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/jewellery');
                }}
                className="bg-charcoal text-ivory text-xs uppercase tracking-widest px-6 py-3 hover:bg-gold transition-colors"
              >
                Explore Fine Jewellery
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex gap-4 pb-4 border-b border-warm-border">
                <img
                  src={item.product.images && item.product.images[0] ? item.product.images[0] : '/assets/category_rings.jpg'}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover bg-ivory-paper border border-warm-border flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif font-bold text-sm text-charcoal">{item.product.name}</h4>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-warm-gray hover:text-red-500 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-[11px] text-warm-gray mt-0.5">
                      Metal: {item.selectedMetal} • Size: {item.selectedSize}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-warm-border">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-1 hover:bg-warm-border text-charcoal"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1 hover:bg-warm-border text-charcoal"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-serif font-bold text-sm text-charcoal">
                      {formatINR(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="p-6 bg-ivory-paper border-t border-warm-border space-y-4">
            
            {/* Coupon Section */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-warm-gray absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Coupon (Try AURELIA10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-warm-border text-xs text-charcoal placeholder:text-warm-gray focus:outline-none uppercase"
                />
              </div>
              <button
                type="submit"
                className="bg-charcoal text-ivory text-xs px-4 uppercase tracking-widest font-semibold hover:bg-gold transition-colors"
              >
                Apply
              </button>
            </form>
            {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
            {couponSuccess && <p className="text-[11px] text-emerald-700 font-semibold">{couponSuccess}</p>}

            {/* Calculations */}
            <div className="space-y-1 text-xs text-charcoal-muted">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatINR(cartSubtotal)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-gold font-semibold">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Insured Express Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatINR(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-serif text-base font-bold text-charcoal pt-2 border-t border-warm-border">
                <span>Total Amount</span>
                <span>{formatINR(cartTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
              className="w-full bg-charcoal text-ivory text-xs font-semibold uppercase tracking-widest py-3.5 hover:bg-gold transition-colors flex items-center justify-center gap-2 shadow-luxury"
            >
              Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-warm-gray">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>100% Insured Delivery • Encrypted Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
