// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { });
    console.log('config/db: connected to MongoDB');
  } catch (err) {
    console.error('config/db: connection error', err);
    process.exit(1);
  }
};

module.exports = connectDB;
