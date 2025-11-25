// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token') || req.header('authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // if token includes "Bearer " remove it
    const raw = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decoded = jwt.verify(raw, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
