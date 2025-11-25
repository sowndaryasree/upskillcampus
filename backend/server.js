console.log('server.js: STARTING');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

console.log('server.js: going to connect DB');
const app = express();

connectDB()
  .then(() => console.log('server.js: connectDB resolved'))
  .catch(err => console.error('server.js: connectDB rejected', err));

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/restaurants', require('./routes/restaurants'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/drivers', require('./routes/drivers'));

const PORT = process.env.PORT || 5000;
const HOST = '127.0.0.1';
app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));
console.log('server.js: LISTENING called');
