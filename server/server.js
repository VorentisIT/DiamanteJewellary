import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { seedProducts, seedCoupons } from './seed/seedData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose.set('bufferCommands', false);

app.use(cors());
app.use(express.json());

// In-Memory Data Store Fallback for instant standalone running
export let inMemoryProducts = [...seedProducts.map((p, idx) => ({ ...p, _id: `mem_prod_${idx + 1}` }))];
export let inMemoryOrders = [
  {
    _id: 'mem_order_1',
    orderNumber: 'AUR-984210',
    items: [
      {
        product: 'mem_prod_1',
        name: 'Celeste Diamond Ring',
        price: 48900,
        quantity: 1,
        selectedSize: '7',
        selectedMetal: '18K Gold',
        image: '/assets/category_rings.jpg'
      }
    ],
    shippingAddress: {
      fullName: 'Priya Sharma',
      street: '45 Lotus Boulevard, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400018',
      phone: '+91 99887 76655'
    },
    paymentMethod: 'UPI / Razorpay',
    paymentStatus: 'completed',
    trackingNumber: 'AUR-EX-887412',
    orderStatus: 'crafting',
    subtotal: 48900,
    discount: 0,
    shippingFee: 0,
    totalAmount: 48900,
    createdAt: new Date().toISOString(),
    timeline: [
      { status: 'pending', label: 'Order Placed', description: 'Order placed by Priya Sharma.', date: new Date(), isCompleted: true },
      { status: 'confirmed', label: 'Confirmed', description: 'Order verified by concierge team.', date: new Date(), isCompleted: true },
      { status: 'crafting', label: 'Crafting & Setting', description: 'Artisan currently setting diamonds.', date: new Date(), isCompleted: true },
      { status: 'quality_check', label: 'Quality & BIS Hallmark', description: 'Scheduled for inspection.', date: null, isCompleted: false },
      { status: 'shipped', label: 'Insured Shipping', description: 'Preparing courier pouch.', date: null, isCompleted: false },
      { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Pending dispatch.', date: null, isCompleted: false },
      { status: 'delivered', label: 'Delivered', description: 'Pending delivery.', date: null, isCompleted: false }
    ]
  }
];

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aurelia_jewellery';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log('MongoDB Connected Successfully to Atlas Cluster');
  } catch (err) {
    console.log('MongoDB Atlas connection fallback to in-memory store:', err.message);
  }
};
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'AURÉLIA Fine Jewellery', timestamp: new Date() });
});

// Serve frontend static assets in production if needed
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AURÉLIA Server running on port ${PORT}`);
});
