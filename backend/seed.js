const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('./models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/imirial');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existing) {
      console.log('Admin already exists. Skipping seed.');
      process.exit(0);
    }

    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@imirial.com',
      password: process.env.ADMIN_PASSWORD || 'Imirial@2024',
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log(`   Email: ${admin.email}`);
    console.log('   Password: (as set in .env)');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
};

seedAdmin();
