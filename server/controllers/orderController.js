import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, discount, shippingFee, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    const orderNumber = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = 'AUR-EX-' + Math.floor(100000 + Math.random() * 900000);

    const now = new Date();
    const initialTimeline = [
      { status: 'pending', label: 'Order Placed', description: 'Your order has been placed successfully.', date: now, isCompleted: true },
      { status: 'confirmed', label: 'Confirmed', description: 'Order confirmed & sent to artisan studio.', date: new Date(now.getTime() + 1000 * 60 * 30), isCompleted: true },
      { status: 'crafting', label: 'Crafting & Setting', description: 'Master goldsmith setting gemstones.', date: null, isCompleted: false },
      { status: 'quality_check', label: 'Quality & BIS Hallmark', description: 'IGI Diamond & BIS Hallmarking inspection.', date: null, isCompleted: false },
      { status: 'shipped', label: 'Insured Shipping', description: 'Handed to premium courier partner.', date: null, isCompleted: false },
      { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Valuable delivery associate en route.', date: null, isCompleted: false },
      { status: 'delivered', label: 'Delivered', description: 'Hand delivered to your doorstep.', date: null, isCompleted: false }
    ];

    const order = new Order({
      orderNumber,
      user: req.user ? req.user._id : req.body.userId,
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'completed',
      trackingNumber,
      orderStatus: 'confirmed',
      subtotal,
      discount: discount || 0,
      shippingFee: shippingFee || 0,
      totalAmount,
      timeline: initialTimeline
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, trackingNumber } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      if (orderStatus) order.orderStatus = orderStatus;
      if (trackingNumber) order.trackingNumber = trackingNumber;

      const statusOrderKeys = ['pending', 'confirmed', 'crafting', 'quality_check', 'shipped', 'out_for_delivery', 'delivered'];
      const currentIndex = statusOrderKeys.indexOf(order.orderStatus);

      order.timeline.forEach((step, idx) => {
        if (idx <= currentIndex) {
          step.isCompleted = true;
          if (!step.date) step.date = new Date();
        }
      });

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
