import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List, Heart, Eye, ShoppingBag, X } from 'lucide-react';
import AnnouncementBar from '../components/common/AnnouncementBar';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import QuickViewModal from '../components/common/QuickViewModal';
import CartDrawer from '../components/cart/CartDrawer';
import { useShop, formatINR } from '../store/ShopContext';
import { seedProducts } from '../../../server/seed/seedData.js';

export default function PLP() {
  const { categoryParam } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();

  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter States
  const activeCategory = categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : searchParams.get('category') || '';
  const selectedMetal = searchParams.get('metal') || '';
  const selectedStone = searchParams.get('stone') || '';
  const selectedCollection = searchParams.get('collection') || '';
  const sortOption = searchParams.get('sort') || 'newest';
  const searchQuery = searchParams.get('search') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    let url = '/api/products?';
    if (activeCategory) url += `category=${encodeURIComponent(activeCategory)}&`;
    if (selectedMetal) url += `metal=${encodeURIComponent(selectedMetal)}&`;
    if (selectedStone) url += `stone=${encodeURIComponent(selectedStone)}&`;
    if (selectedCollection) url += `collection=${encodeURIComponent(selectedCollection)}&`;
    if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;
    if (minPrice) url += `minPrice=${minPrice}&`;
    if (maxPrice) url += `maxPrice=${maxPrice}&`;
    if (sortOption) url += `sort=${sortOption}&`;

    const localProds = JSON.parse(localStorage.getItem('aurelia_local_products') || '[]');
    const baseProds = [...localProds, ...seedProducts.map((p, i) => ({ ...p, _id: `mem_prod_${i + 1}` }))];
    const uniqueBase = baseProds.filter((v, i, a) => a.findIndex(t => (t.sku === v.sku || t._id === v._id)) === i);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = [...data, ...localProds];
          const uniqueMerged = merged.filter((v, i, a) => a.findIndex(t => (t.sku === v.sku || t._id === v._id)) === i);
          setProducts(uniqueMerged);
        } else {
          let filtered = [...uniqueBase];
          if (activeCategory) filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
          if (selectedMetal) filtered = filtered.filter(p => p.metal === selectedMetal);
          if (selectedStone) filtered = filtered.filter(p => p.stone === selectedStone);
          if (searchQuery) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
          if (minPrice) filtered = filtered.filter(p => p.price >= Number(minPrice));
          if (maxPrice) filtered = filtered.filter(p => p.price <= Number(maxPrice));
          setProducts(filtered);
        }
      })
      .catch(() => {
        let filtered = [...uniqueBase];
        if (activeCategory) filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
        if (selectedMetal) filtered = filtered.filter(p => p.metal === selectedMetal);
        setProducts(filtered);
      });
  }, [activeCategory, selectedMetal, selectedStone, selectedCollection, searchQuery, minPrice, maxPrice, sortOption]);


  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal font-sans flex flex-col justify-between">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header Breadcrumbs & Title */}
        <div className="mb-8 pb-6 border-b border-warm-border">
          <nav className="text-xs text-warm-gray mb-2 space-x-2">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <span className="text-charcoal font-medium">{activeCategory || 'All Jewellery'}</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal font-normal">
            {activeCategory ? `${activeCategory} Collection` : 'Fine Jewellery Catalogue'}
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Showing {products.length} certified handcrafted pieces
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap justify-between items-center bg-ivory-paper border border-warm-border p-4 mb-8 gap-4">
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-charcoal hover:text-gold transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold" /> Filter & Refine
          </button>

          {/* Metal Filter Pills */}
          <div className="hidden md:flex items-center gap-2">
            <span className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider">Metal:</span>
            {['', '18K Gold', 'Rose Gold', 'White Gold', 'Platinum'].map((metal) => (
              <button
                key={metal}
                onClick={() => updateFilter('metal', metal)}
                className={`text-xs px-3 py-1 border transition-colors ${
                  (selectedMetal === metal || (!selectedMetal && !metal))
                    ? 'border-gold bg-gold text-white font-semibold'
                    : 'border-warm-border text-charcoal hover:border-gold'
                }`}
              >
                {metal || 'All Metals'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="bg-white border border-warm-border text-xs text-charcoal py-1.5 px-3 focus:outline-none font-serif cursor-pointer"
            >
              <option value="newest">Sort By: New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Grid / List Switcher */}
            <div className="hidden sm:flex border border-warm-border">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-gold text-white' : 'text-charcoal'}`}
                aria-label="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 ${viewMode === 'list' ? 'bg-gold text-white' : 'text-charcoal'}`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Catalog Display */}
        {products.length === 0 ? (
          <div className="text-center py-20 bg-ivory-paper border border-warm-border space-y-4">
            <p className="font-serif text-xl text-charcoal">No jewellery pieces match your selected filters.</p>
            <button
              onClick={clearAllFilters}
              className="bg-charcoal text-ivory text-xs uppercase tracking-widest px-6 py-3 hover:bg-gold transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const inWishlist = isInWishlist(product._id);
              return (
                <div
                  key={product._id}
                  className="group bg-white border border-warm-border p-4 flex flex-col justify-between hover:shadow-luxury transition-all duration-300 relative"
                >
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-charcoal hover:text-gold transition-colors shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'text-red-500 fill-red-500' : ''}`} />
                  </button>

                  <div className="aspect-square bg-ivory-paper overflow-hidden relative mb-4 flex items-center justify-center">
                    <img
                      src={product.images && product.images[0] ? product.images[0] : '/assets/category_rings.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-charcoal/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="flex-1 bg-ivory text-charcoal text-[10px] font-semibold uppercase tracking-widest py-2 hover:bg-gold hover:text-white transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Quick View
                      </button>
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="bg-gold text-white p-2 hover:bg-gold-dark transition-colors"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Link to={`/product/${product.slug || product._id}`}>
                      <h3 className="font-serif font-bold text-base text-charcoal group-hover:text-gold transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-[11px] text-warm-gray">
                      {product.metal} • {product.stone}
                    </p>
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="font-serif font-bold text-sm text-charcoal">
                        {formatINR(product.discountPrice || product.price)}
                      </span>
                      {product.discountPrice && (
                        <span className="text-xs text-warm-gray line-through">
                          {formatINR(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-warm-border p-4 flex flex-col sm:flex-row items-center gap-6 hover:shadow-luxury transition-all"
              >
                <img
                  src={product.images && product.images[0] ? product.images[0] : '/assets/category_rings.jpg'}
                  alt={product.name}
                  className="w-32 h-32 object-cover bg-ivory-paper border border-warm-border flex-shrink-0"
                />
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="font-serif font-bold text-xl text-charcoal">{product.name}</h3>
                  <p className="text-xs text-warm-gray">{product.description}</p>
                  <span className="text-xs text-gold font-semibold uppercase tracking-widest block">
                    {product.metal} • {product.stone} • {product.specifications?.certification || 'BIS Hallmarked'}
                  </span>
                </div>
                <div className="text-center sm:text-right space-y-3">
                  <span className="font-serif font-bold text-xl text-charcoal block">
                    {formatINR(product.discountPrice || product.price)}
                  </span>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-charcoal text-ivory text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-gold transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Filter Sidebar Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex justify-start animate-fadeIn">
          <div className="bg-ivory w-full max-w-xs h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-warm-border mb-6">
                <h3 className="font-serif font-bold text-lg text-charcoal uppercase tracking-wider">Refine Selection</h3>
                <button onClick={() => setIsFilterDrawerOpen(false)} className="p-1">
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              {/* Price Filter */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gold">Budget Range</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min ₹"
                    value={minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    className="w-1/2 p-2 bg-white border border-warm-border text-xs focus:outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Max ₹"
                    value={maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="w-1/2 p-2 bg-white border border-warm-border text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Stone Filter */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">Gemstone</h4>
                {['Solitaire Diamond', 'Natural Diamond', 'Polki', 'Emerald', 'Sapphire'].map((stone) => (
                  <button
                    key={stone}
                    onClick={() => updateFilter('stone', selectedStone === stone ? '' : stone)}
                    className={`block w-full text-left text-xs py-1.5 px-2 ${
                      selectedStone === stone ? 'bg-gold text-white font-semibold' : 'text-charcoal hover:text-gold'
                    }`}
                  >
                    {stone}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                clearAllFilters();
                setIsFilterDrawerOpen(false);
              }}
              className="w-full bg-warm-border text-charcoal text-xs uppercase tracking-widest py-3 font-semibold hover:bg-charcoal hover:text-white transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      <Footer />
      <QuickViewModal />
      <CartDrawer />
    </div>
  );
}
