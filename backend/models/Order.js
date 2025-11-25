// backend/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
      qty: { type: Number, default: 1 },
      price: { type: Number }
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, enum: ['placed','confirmed','preparing','picked','delivered','cancelled'], default: 'placed' },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // assigned driver id
  deliveryAddress: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
