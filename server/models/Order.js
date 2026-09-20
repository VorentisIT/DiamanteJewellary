import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    quantity: Number,
    selectedSize: String,
    selectedMetal: String,
    image: String
  }],
  shippingAddress: {
    fullName: String,
    street: String,
    city: String,
    state: String,
    postalCode: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    default: 'Razorpay / UPI'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  trackingNumber: {
    type: String,
    default: 'AUR-EX-998241'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'crafting', 'quality_check', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'confirmed'
  },
  subtotal: Number,
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  totalAmount: Number,
  timeline: [{
    status: String,
    label: String,
    description: String,
    date: Date,
    isCompleted: Boolean
  }]
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
