import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

export const getAdminAnalytics = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    const orders = await Order.find({});
    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    const pendingOrdersCount = orders.filter(o => o.orderStatus === 'pending' || o.orderStatus === 'confirmed').length;

    const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).select('name stock sku price images');

    // Sales trend chart mock data calculation
    const salesTrend = [
      { month: 'Jan', revenue: 450000, orders: 12 },
      { month: 'Feb', revenue: 680000, orders: 18 },
      { month: 'Mar', revenue: 920000, orders: 24 },
      { month: 'Apr', revenue: 1150000, orders: 29 },
      { month: 'May', revenue: 1420000, orders: 35 },
      { month: 'Jun', revenue: 1890000, orders: 42 }
    ];

    res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
      pendingOrdersCount,
      lowStockProducts,
      salesTrend
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
