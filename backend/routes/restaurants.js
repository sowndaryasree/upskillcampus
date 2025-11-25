// backend/routes/restaurants.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

// list restaurants
router.get('/', async (req, res) => {
  const list = await Restaurant.find().lean();
  res.json(list);
});

// create restaurant (owner user)
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, address } = req.body;
    // only restaurant role or admin can create (optional)
    const r = new Restaurant({ owner: req.user.id, name, description, address });
    await r.save();
    res.json(r);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// get restaurant menu (by restaurant id)
router.get('/:id/menu', async (req, res) => {
  try {
    const items = await MenuItem.find({ restaurant: req.params.id }).lean();
    res.json(items);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// add menu item
router.post('/:id/menu', auth, async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const menu = new MenuItem({ restaurant: req.params.id, name, description, price });
    await menu.save();
    res.json(menu);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
