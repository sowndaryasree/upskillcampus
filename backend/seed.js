const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('seed: connected to DB');

  // create owner user if not exists
  let owner = await User.findOne({ email: 'owner.demo@example.com' });
  if (!owner) {
    owner = await User.create({ name:'Owner Demo', email:'owner.demo@example.com', password: 'seedpassword', role:'restaurant' });
    console.log('seed: owner created');
  } else {
    console.log('seed: owner exists');
  }

  // create restaurants
  const r1 = await Restaurant.create({ owner: owner._id, name:'Tasty Bite', description:'Demo foods', address:'Demo street' });
  const r2 = await Restaurant.create({ name:'Quick Bites', description:'Fast food', address:'Demo lane' });
  console.log('seed: restaurants created');

  // create menu items
  await MenuItem.create({ restaurant: r1._id, name:'Paneer Butter Masala', description:'Creamy', price:150 });
  await MenuItem.create({ restaurant: r1._id, name:'Veg Fried Rice', description:'Simple', price:120 });
  await MenuItem.create({ restaurant: r2._id, name:'Burger', description:'Juicy', price:99 });
  await MenuItem.create({ restaurant: r2._id, name:'Fries', description:'Crispy', price:59 });
  console.log('seed: menu items created');

  process.exit(0);
}

run().catch(e => { console.error('seed error', e); process.exit(1); });
