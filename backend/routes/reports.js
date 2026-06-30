const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all reports (warga sees their own, admin sees all)
router.get('/', authMiddleware, (req, res) => {
  try {
    let reports = db.reports;

    if (req.user.role === 'warga') {
      reports = reports.filter(r => r.userId === req.user.id);
    }

    reports = reports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get report by id
router.get('/:id', authMiddleware, (req, res) => {
  try {
    const report = db.reports.find(r => r.id === parseInt(req.params.id));
    if (!report) {
      return res.status(404).json({ message: 'Laporan tidak ditemukan' });
    }

    // Check permission
    if (req.user.role === 'warga' && report.userId !== req.user.id) {
      return res.status(403).json({ message: 'Tidak diizinkan melihat laporan ini' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create report (warga)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, description, location, image } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ message: 'Judul, deskripsi, dan lokasi diperlukan' });
    }

    const user = db.users.find(u => u.id === req.user.id);

    const newReport = {
      id: db.nextIds.report++,
      userId: req.user.id,
      userName: user.fullName,
      title,
      description,
      location,
      image: image || 'https://via.placeholder.com/400x300?text=Laporan+Sampah',
      status: 'menunggu',
      createdAt: new Date()
    };

    db.reports.push(newReport);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update report status (admin only)
router.put('/:id/status', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const reportId = parseInt(req.params.id);
    const { status } = req.body;

    if (!['menunggu', 'diproses', 'selesai'].includes(status)) {
      return res.status(400).json({ message: 'Status tidak valid' });
    }

    const report = db.reports.find(r => r.id === reportId);
    if (!report) {
      return res.status(404).json({ message: 'Laporan tidak ditemukan' });
    }

    report.status = status;
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete report (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const reportId = parseInt(req.params.id);

    const reportIndex = db.reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) {
      return res.status(404).json({ message: 'Laporan tidak ditemukan' });
    }

    db.reports.splice(reportIndex, 1);
    res.json({ message: 'Laporan berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
