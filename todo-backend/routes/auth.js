const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const router = express.Router();

const SECRET_KEY = '1234567890';

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({ username, email, password: hashedPassword });

    // Exclude password in response
    const { password: _, ...safeUser } = user.toJSON();
    res.status(201).json({ message: 'User created successfully', user: safeUser });
  } catch (err) {
    console.error('Error during registration:', err.message || err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare hashed passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email }, // Payload
      SECRET_KEY,                                                  // Secret key
      { expiresIn: '1h' }                                          // Expiry time
    );

    // Send token and user data
    res.json({ 
      message: 'Login successful', 
      token, 
      user: { username: user.username, email: user.email } 
    });
  } catch (err) {
    console.error('Error during login:', err.message || err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
