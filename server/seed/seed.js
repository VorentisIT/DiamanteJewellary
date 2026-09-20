import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Coupon from '../models/Coupon.js';
import Order from '../models/Order.js';
import { seedProducts, seedCoupons } from './seedData.js';

dotenv.config();

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB Atlas for Seeding...');

    await User.deleteMany({});
    await Product.deleteMany({});
    await Coupon.deleteMany({});
    await Order.deleteMany({});

    console.log('Cleared existing data.');

    // Create Admin User
    const adminUser = await User.create({
      name: 'AURÉLIA Admin',
      email: 'admin@gmail.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 98765 43210'
    });

    // Create Customer User
    const customerUser = await User.create({
      name: 'Priya Sharma',
      email: 'priya@example.com',
      password: 'customerpassword123',
      role: 'customer',
      phone: '+91 99887 76655',
      addresses: [{
        fullName: 'Priya Sharma',
        street: '45 Lotus Boulevard, Worli',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400018',
        country: 'India',
        isDefault: true
      }]
    });

    console.log('Users created: Admin (admin@gmail.com) & Customer (priya@example.com)');

    // Seed Products
    const createdProducts = await Product.insertMany(seedProducts);
    console.log(`${createdProducts.length} Products seeded.`);

    // Seed Coupons
    await Coupon.insertMany(seedCoupons);
    console.log('Coupons seeded.');

    // Seed Sample Order
    const now = new Date();
    await Order.create({
      orderNumber: 'AUR-984210',
      user: customerUser._id,
      items: [
        {
          product: createdProducts[0]._id,
          name: createdProducts[0].name,
          price: createdProducts[0].price,
          quantity: 1,
          selectedSize: '7',
          selectedMetal: '18K Gold',
          image: createdProducts[0].images[0]
        }
      ],
      shippingAddress: customerUser.addresses[0],
      paymentMethod: 'UPI / Razorpay',
      paymentStatus: 'completed',
      trackingNumber: 'AUR-EX-887412',
      orderStatus: 'crafting',
      subtotal: 48900,
      discount: 0,
      shippingFee: 0,
      totalAmount: 48900,
      timeline: [
        { status: 'pending', label: 'Order Placed', description: 'Order placed by Priya Sharma.', date: new Date(now.getTime() - 86400000), isCompleted: true },
        { status: 'confirmed', label: 'Confirmed', description: 'Order verified by concierge team.', date: new Date(now.getTime() - 72000000), isCompleted: true },
        { status: 'crafting', label: 'Crafting & Setting', description: 'Artisan currently setting diamonds.', date: now, isCompleted: true },
        { status: 'quality_check', label: 'Quality & BIS Hallmark', description: 'Scheduled for inspection.', date: null, isCompleted: false },
        { status: 'shipped', label: 'Insured Shipping', description: 'Preparing courier pouch.', date: null, isCompleted: false },
        { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Pending dispatch.', date: null, isCompleted: false },
        { status: 'delivered', label: 'Delivered', description: 'Pending delivery.', date: null, isCompleted: false }
      ]
    });

    console.log('Sample Order seeded.');
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
