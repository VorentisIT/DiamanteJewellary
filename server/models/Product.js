import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPrice: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    required: true,
    enum: ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Bridal', "Men's"]
  },
  collectionName: {
    type: String,
    default: 'Everyday Gold'
  },
  metal: {
    type: String,
    enum: ['18K Gold', '14K Gold', 'Rose Gold', 'White Gold', 'Platinum'],
    default: '18K Gold'
  },
  stone: {
    type: String,
    enum: ['Natural Diamond', 'Solitaire Diamond', 'Polki', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 'None'],
    default: 'Natural Diamond'
  },
  weight: {
    type: String,
    default: '4.5g'
  },
  sizes: {
    type: [String],
    default: ['6', '7', '8', '9', '10']
  },
  stock: {
    type: Number,
    default: 15
  },
  images: [{
    type: String,
    required: true
  }],
  rating: {
    type: Number,
    default: 4.9
  },
  reviewsCount: {
    type: Number,
    default: 12
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  specifications: {
    karatage: { type: String, default: '18K (750)' },
    diamondClarity: { type: String, default: 'VVS-VS' },
    diamondColor: { type: String, default: 'EF' },
    certification: { type: String, default: 'IGI & BIS Hallmarked' },
    warranty: { type: String, default: 'Lifetime Craftsmanship Warranty' }
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
