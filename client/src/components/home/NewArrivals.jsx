import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, ArrowRight, Star } from 'lucide-react';
import { useShop, formatINR } from '../../store/ShopContext';
import { seedProducts } from '../../../../server/seed/seedData.js';

export default function NewArrivals() {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products?newArrival=true')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.slice(0, 4));
        } else {
          setProducts(seedProducts.slice(0, 4).map((p, i) => ({ ...p, _id: `mem_prod_${i + 1}` })));
        }
      })
      .catch(() => {
        setProducts(seedProducts.slice(0, 4).map((p, i) => ({ ...p, _id: `mem_prod_${i + 1}` })));
      });
  }, []);

  return (
    <section className="bg-ivory py-16 lg:py-24 border-b border-warm-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Editorial Header */}
          <div className="lg:col-span-3 space-y-4 pr-4">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase block">
              NEW ARRIVALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal leading-snug">
              Pieces designed for now, made to last.
            </h2>
            <div className="pt-4">
              <Link
                to="/jewellery?newArrival=true"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-charcoal border-b border-gold pb-1 hover:text-gold transition-colors group"
              >
                VIEW ALL <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Product Grid (4 cards) */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              const inWishlist = isInWishlist(product._id);
              return (
                <div
                  key={product._id}
                  className="group bg-white border border-warm-border p-3 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative"
                >
                  {/* NEW Badge */}
                  <span className="absolute top-4 left-4 z-10 bg-gold text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5">
                    New
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 z-10 p-1.5 bg-white/90 rounded-full text-charcoal hover:text-gold transition-colors shadow-sm"
                    aria-label="Add to Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'text-red-500 fill-red-500' : ''}`} />
                  </button>

                  {/* Product Image */}
                  <div className="aspect-square bg-ivory-paper overflow-hidden relative mb-3 flex items-center justify-center">
                    <img
                      src={product.images && product.images[0] ? product.images[0] : '/assets/category_rings.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Hover Quick Action */}
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-forest/85 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="flex-1 bg-ivory text-charcoal text-[9px] font-semibold uppercase tracking-widest py-1.5 hover:bg-gold hover:text-white transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> Quick View
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="bg-gold text-white p-1.5 hover:bg-gold-dark transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-1">
                    <Link to={`/product/${product.slug || product._id}`}>
                      <h3 className="font-serif font-bold text-sm text-charcoal group-hover:text-gold transition-colors truncate">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[10px] text-charcoal-muted truncate">
                      {product.metal} • {product.stone}
                    </p>
                    
                    <div className="pt-1.5 flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-charcoal">
                        {formatINR(product.discountPrice || product.price)}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-charcoal-muted">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <span>4.8 (120)</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
