import Coupon from '../models/Coupon.js';

export const validateCoupon = async (req, res) => {
  try {
    const { code, cartAmount } = req.body;
    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or expired coupon code' });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ message: 'Coupon code has expired' });
    }

    if (cartAmount && cartAmount < coupon.minOrderValue) {
      return res.status(400).json({
        message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue.toLocaleString('en-IN')}`
      });
    }

    res.json({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      minOrderValue: coupon.minOrderValue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCoupon = async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    const createdCoupon = await coupon.save();
    res.status(201).json(createdCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
