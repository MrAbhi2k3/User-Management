const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    const adminEmail = 'admin@manage.in';
    const adminPassword = 'Admin@321';
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
      process.exit(0);
    }

    const admin = new User({
      name: 'Admin User',
      email: adminEmail,
      password: adminPassword,
      role: 'admin'
    });

    await admin.save();
    
    console.log('Admin user created successfully!', '\n Email:', adminEmail, '\n Password:', adminPassword);

    console.log('\nPlease change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();
