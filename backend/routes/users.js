const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcryptjs');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all users (admin only)
router.get('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const users = db.users.map(u => ({
      id: u.id,
      username: u.username,
      email: u.email,
      fullName: u.fullName,
      role: u.role,
      phone: u.phone,
      address: u.address,
      createdAt: u.createdAt
    }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user profile
router.get('/profile', authMiddleware, (req, res) => {
  try {
    const user = db.users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      phone: user.phone,
      address: user.address,
      createdAt: user.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user (admin for others, users for themselves)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { fullName, phone, address, email } = req.body;

    // Check if user is updating self or is admin
    if (req.user.id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Tidak diizinkan mengubah data user lain' });
    }

    const user = db.users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    if (fullName) user.fullName = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (email && email !== user.email) {
      if (db.users.find(u => u.email === email && u.id !== userId)) {
        return res.status(400).json({ message: 'Email sudah digunakan' });
      }
      user.email = email;
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      phone: user.phone,
      address: user.address
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    if (userId === 1) {
      return res.status(400).json({ message: 'Tidak dapat menghapus admin' });
    }

    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    db.users.splice(userIndex, 1);
    res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user stats (admin only)
router.get('/stats', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const totalUsers = db.users.filter(u => u.role === 'warga').length;
    const totalReports = db.reports.length;
    const totalSchedules = db.schedules.length;
    const reportsProcessing = db.reports.filter(r => r.status === 'diproses').length;
    const reportsCompleted = db.reports.filter(r => r.status === 'selesai').length;

    res.json({
      totalUsers,
      totalReports,
      totalSchedules,
      reportsProcessing,
      reportsCompleted
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
