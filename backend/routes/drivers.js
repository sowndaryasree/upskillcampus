// backend/routes/drivers.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Driver = require('../models/Driver');

// driver update location
router.post('/update-location', auth, async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (!lat || !lng) return res.status(400).json({ msg: 'lat/lng required' });

    let d = await Driver.findOne({ user: req.user.id });
    if (!d) {
      d = new Driver({ user: req.user.id, lat, lng, available: true });
    } else {
      d.lat = lat; d.lng = lng; d.updatedAt = Date.now();
    }
    await d.save();
    res.json(d);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// get driver location by id
router.get('/:id/location', async (req, res) => {
  try {
    const d = await Driver.findOne({ user: req.params.id });
    if (!d) return res.status(404).json({ msg: 'Not found' });
    res.json({ lat: d.lat, lng: d.lng, available: d.available, updatedAt: d.updatedAt });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
