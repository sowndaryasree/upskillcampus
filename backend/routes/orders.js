// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Order = require('../models/Order');
const Driver = require('../models/Driver');
const User = require('../models/User');

// place order
router.post('/', auth, async (req, res) => {
  try {
    const { restaurantId, items, total, deliveryAddress } = req.body;
    if (!restaurantId || !items || items.length === 0) return res.status(400).json({ msg: 'Invalid order' });

    const order = new Order({
      customer: req.user.id,
      restaurant: restaurantId,
      items,
      total,
      deliveryAddress
    });
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// list orders for user
router.get('/', auth, async (req, res) => {
  try {
    // if driver => show assigned or available
    const u = await User.findById(req.user.id);
    if (u.role === 'driver') {
      const list = await Order.find({ driver: req.user.id }).populate('restaurant items.menuItem');
      return res.json(list);
    }
    // for customer
    const list = await Order.find({ customer: req.user.id }).populate('restaurant items.menuItem').sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// assign driver to order (admin/restaurant) - simple assign
router.put('/:id/assign/:driverId', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });
    order.driver = req.params.driverId;
    order.status = 'confirmed';
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// get order details
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItem').populate('driver', '-password');
    res.json(order);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
