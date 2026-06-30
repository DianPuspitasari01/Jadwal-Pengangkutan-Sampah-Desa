const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models/db');

// Login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password diperlukan' });
    }

    const user = db.users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register
router.post('/register', (req, res) => {
  try {
    const { username, email, password, fullName, phone, address } = req.body;

    if (!username || !email || !password || !fullName) {
      return res.status(400).json({ message: 'Field yang diperlukan tidak lengkap' });
    }

    if (db.users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Username sudah terdaftar' });
    }

    if (db.users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const newUser = {
      id: db.nextIds.user++,
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      fullName,
      role: 'warga',
      phone: phone || '',
      address: address || '',
      createdAt: new Date()
    };

    db.users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        phone: newUser.phone,
        address: newUser.address
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
