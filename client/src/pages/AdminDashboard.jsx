import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Package,
  Tag,
  BarChart2,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search
} from 'lucide-react';
import { formatINR } from '../store/ShopContext';
import { seedProducts } from '../../../server/seed/seedData.js';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // overview | products | orders | coupons
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    price: '',
    discountPrice: '',
    category: 'Rings',
    metal: '18K Gold',
    stone: 'Solitaire Diamond',
    stock: 15,
    images: '/assets/category_rings.jpg',
    description: ''
  });

  useEffect(() => {
    // Fetch analytics
    fetch('/api/admin/analytics')
      .then((res) => res.json())
      .then((data) => setAnalytics(data))
      .catch(() => {
        setAnalytics({
          totalRevenue: 2845000,
          totalOrders: 42,
          totalProducts: 10,
          totalCustomers: 28,
          pendingOrdersCount: 5,
          salesTrend: [
            { month: 'Jan', revenue: 450000 },
            { month: 'Feb', revenue: 680000 },
            { month: 'Mar', revenue: 920000 },
            { month: 'Apr', revenue: 1150000 },
            { month: 'May', revenue: 1420000 },
            { month: 'Jun', revenue: 1890000 }
          ]
        });
      });

    // Fetch Products
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProducts(data);
        else setProducts(seedProducts.map((p, i) => ({ ...p, _id: `mem_prod_${i + 1}` })));
      })
      .catch(() => setProducts(seedProducts.map((p, i) => ({ ...p, _id: `mem_prod_${i + 1}` }))));

    // Fetch Orders
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setOrders(data);
        else setOrders([
          {
            _id: 'mem_order_1',
            orderNumber: 'AUR-984210',
            user: { name: 'Priya Sharma', email: 'priya@example.com' },
            totalAmount: 48900,
            orderStatus: 'crafting',
            createdAt: new Date().toISOString()
          }
        ]);
      })
      .catch(() => setOrders([
        {
          _id: 'mem_order_1',
          orderNumber: 'AUR-984210',
          user: { name: 'Priya Sharma', email: 'priya@example.com' },
          totalAmount: 48900,
          orderStatus: 'crafting',
          createdAt: new Date().toISOString()
        }
      ]));
  }, []);

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...productForm,
      price: Number(productForm.price),
      discountPrice: productForm.discountPrice ? Number(productForm.discountPrice) : null,
      stock: Number(productForm.stock),
      images: [productForm.images],
      slug: productForm.name.toLowerCase().replace(/\s+/g, '-')
    };

    if (editingProduct) {
      setProducts(products.map((p) => (p._id === editingProduct._id ? { ...p, ...payload } : p)));
    } else {
      setProducts([{ ...payload, _id: `mem_prod_${Date.now()}` }, ...products]);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o)));
  };

  return (
    <div className="min-h-screen bg-charcoal text-ivory flex flex-col font-sans">
      
      {/* Admin Top Navbar */}
      <header className="bg-charcoal-deep border-b border-charcoal-light py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-serif text-xl font-bold tracking-widest text-ivory">
            AURÉLIA <span className="text-gold text-xs uppercase font-sans tracking-widest">ADMIN PORTAL</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-warm-gray">Logged in as: <strong className="text-gold">admin@gmail.com</strong></span>
          <Link to="/" className="text-xs text-ivory hover:text-gold border border-charcoal-light px-3 py-1.5">
            View Live Boutique →
          </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Admin Sidebar Navigation */}
        <aside className="w-64 bg-charcoal-deep border-r border-charcoal-light p-6 space-y-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 p-3 text-xs font-semibold uppercase tracking-widest text-left rounded ${
              activeTab === 'overview' ? 'bg-gold text-charcoal' : 'text-warm-gray hover:text-ivory'
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Revenue Overview
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 p-3 text-xs font-semibold uppercase tracking-widest text-left rounded ${
              activeTab === 'products' ? 'bg-gold text-charcoal' : 'text-warm-gray hover:text-ivory'
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 p-3 text-xs font-semibold uppercase tracking-widest text-left rounded ${
              activeTab === 'orders' ? 'bg-gold text-charcoal' : 'text-warm-gray hover:text-ivory'
            }`}
          >
            <Package className="w-4 h-4" /> Order Manager ({orders.length})
          </button>
        </aside>

        {/* Main Admin View Container */}
        <main className="flex-1 p-8 overflow-y-auto bg-charcoal">
          
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Analytics Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-charcoal-light border border-charcoal-muted p-6 rounded space-y-2">
                  <div className="flex justify-between items-center text-gold">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Total Revenue</span>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-ivory block">
                    {formatINR(analytics?.totalRevenue || 2845000)}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">+18.4% from last month</span>
                </div>

                <div className="bg-charcoal-light border border-charcoal-muted p-6 rounded space-y-2">
                  <div className="flex justify-between items-center text-gold">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Total Orders</span>
                    <Package className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-ivory block">
                    {analytics?.totalOrders || 42}
                  </span>
                  <span className="text-[11px] text-warm-gray">5 Orders pending crafting</span>
                </div>

                <div className="bg-charcoal-light border border-charcoal-muted p-6 rounded space-y-2">
                  <div className="flex justify-between items-center text-gold">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Catalog Products</span>
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-ivory block">
                    {products.length}
                  </span>
                  <span className="text-[11px] text-warm-gray">6 Categories active</span>
                </div>

                <div className="bg-charcoal-light border border-charcoal-muted p-6 rounded space-y-2">
                  <div className="flex justify-between items-center text-gold">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Customers</span>
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="font-serif text-3xl font-bold text-ivory block">
                    {analytics?.totalCustomers || 28}
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">+4 New this week</span>
                </div>
              </div>

              {/* Sales Chart Bar */}
              <div className="bg-charcoal-light border border-charcoal-muted p-6 rounded space-y-4">
                <h3 className="font-serif font-bold text-lg text-ivory">Monthly Sales Trend (INR)</h3>
                <div className="h-48 flex items-end justify-between gap-4 pt-8">
                  {(analytics?.salesTrend || []).map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full bg-gold rounded-t transition-all duration-500 hover:bg-gold-accent"
                        style={{ height: `${(bar.revenue / 2000000) * 100}%` }}
                      ></div>
                      <span className="text-xs text-warm-gray font-mono">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-serif text-2xl font-bold text-ivory">Product Management</h2>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({
                      name: '',
                      sku: `AUR-NEW-${Math.floor(100 + Math.random() * 900)}`,
                      price: '55000',
                      discountPrice: '',
                      category: 'Rings',
                      metal: '18K Gold',
                      stone: 'Solitaire Diamond',
                      stock: 10,
                      images: '/assets/category_rings.jpg',
                      description: 'New luxury diamond product creation.'
                    });
                    setIsProductModalOpen(true);
                  }}
                  className="bg-gold text-charcoal text-xs font-bold uppercase tracking-widest px-4 py-2.5 flex items-center gap-2 hover:bg-gold-accent"
                >
                  <Plus className="w-4 h-4" /> Add New Jewellery Product
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-charcoal-light border border-charcoal-muted overflow-x-auto">
                <table className="w-full text-left text-xs text-ivory">
                  <thead className="bg-charcoal-deep text-gold uppercase tracking-wider font-semibold border-b border-charcoal-muted">
                    <tr>
                      <th className="p-4">Item</th>
                      <th className="p-4">SKU</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Metal / Stone</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-muted">
                    {products.map((p) => (
                      <tr key={p._id} className="hover:bg-charcoal/50">
                        <td className="p-4 flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover border" />
                          <span className="font-bold">{p.name}</span>
                        </td>
                        <td className="p-4 font-mono text-warm-gray">{p.sku}</td>
                        <td className="p-4">{p.category}</td>
                        <td className="p-4 text-warm-gray">{p.metal} • {p.stone}</td>
                        <td className="p-4 font-serif font-bold text-gold">{formatINR(p.price)}</td>
                        <td className="p-4 font-semibold">{p.stock}</td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setEditingProduct(p);
                              setProductForm({
                                name: p.name,
                                sku: p.sku,
                                price: p.price,
                                discountPrice: p.discountPrice || '',
                                category: p.category,
                                metal: p.metal,
                                stone: p.stone,
                                stock: p.stock,
                                images: p.images[0],
                                description: p.description
                              });
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 text-gold hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setProducts(products.filter((item) => item._id !== p._id))}
                            className="p-1.5 text-red-400 hover:text-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold text-ivory">Order Status & Fulfillment Manager</h2>
              
              <div className="bg-charcoal-light border border-charcoal-muted overflow-x-auto">
                <table className="w-full text-left text-xs text-ivory">
                  <thead className="bg-charcoal-deep text-gold uppercase tracking-wider font-semibold border-b border-charcoal-muted">
                    <tr>
                      <th className="p-4">Order #</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Fulfillment Status</th>
                      <th className="p-4 text-right">Update Order Stage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal-muted">
                    {orders.map((o) => (
                      <tr key={o._id}>
                        <td className="p-4 font-bold font-mono text-gold">{o.orderNumber}</td>
                        <td className="p-4">{o.user?.name || 'Priya Sharma'}</td>
                        <td className="p-4 font-serif font-bold">{formatINR(o.totalAmount)}</td>
                        <td className="p-4 uppercase font-bold text-gold">{o.orderStatus}</td>
                        <td className="p-4 text-right">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                            className="bg-charcoal border border-charcoal-muted text-xs p-1.5 text-ivory focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="crafting">Crafting & Setting</option>
                            <option value="quality_check">Quality & BIS Hallmark</option>
                            <option value="shipped">Shipped</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Add / Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-charcoal-light border border-charcoal-muted max-w-lg w-full p-6 space-y-4 rounded">
            <h3 className="font-serif text-xl font-bold text-gold">
              {editingProduct ? 'Edit Product' : 'Add New Jewellery Item'}
            </h3>
            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block text-warm-gray mb-1">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  required
                  className="w-full p-2 bg-charcoal border border-charcoal-muted text-ivory"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-warm-gray mb-1">SKU</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    required
                    className="w-full p-2 bg-charcoal border border-charcoal-muted text-ivory"
                  />
                </div>
                <div>
                  <label className="block text-warm-gray mb-1">Price (INR)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    required
                    className="w-full p-2 bg-charcoal border border-charcoal-muted text-ivory"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-warm-gray mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full p-2 bg-charcoal border border-charcoal-muted text-ivory"
                  >
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Bridal">Bridal</option>
                    <option value="Men's">Men's</option>
                  </select>
                </div>

                <div>
                  <label className="block text-warm-gray mb-1">Metal</label>
                  <select
                    value={productForm.metal}
                    onChange={(e) => setProductForm({ ...productForm, metal: e.target.value })}
                    className="w-full p-2 bg-charcoal border border-charcoal-muted text-ivory"
                  >
                    <option value="18K Gold">18K Gold</option>
                    <option value="Rose Gold">Rose Gold</option>
                    <option value="White Gold">White Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-charcoal border border-charcoal-muted text-warm-gray uppercase"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-gold text-charcoal font-bold uppercase">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
