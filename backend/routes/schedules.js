const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Get all schedules
router.get('/', (req, res) => {
  try {
    const schedules = db.schedules.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get schedule by month
router.get('/month/:month/:year', (req, res) => {
  try {
    const { month, year } = req.params;
    const schedules = db.schedules.filter(s => {
      const parts = s.date.split('-');
      return parseInt(parts[1]) === parseInt(month) && parseInt(parts[0]) === parseInt(year);
    });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create schedule (admin only)
router.post('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const { area, date, time, description } = req.body;

    if (!area || !date || !time) {
      return res.status(400).json({ message: 'Area, tanggal, dan jam diperlukan' });
    }

    const newSchedule = {
      id: db.nextIds.schedule++,
      area,
      date,
      time,
      description: description || '',
      createdAt: new Date()
    };

    db.schedules.push(newSchedule);
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update schedule (admin only)
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const scheduleId = parseInt(req.params.id);
    const { area, date, time, description } = req.body;

    const schedule = db.schedules.find(s => s.id === scheduleId);
    if (!schedule) {
      return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    }

    if (area) schedule.area = area;
    if (date) schedule.date = date;
    if (time) schedule.time = time;
    if (description !== undefined) schedule.description = description;

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete schedule (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const scheduleId = parseInt(req.params.id);

    const scheduleIndex = db.schedules.findIndex(s => s.id === scheduleId);
    if (scheduleIndex === -1) {
      return res.status(404).json({ message: 'Jadwal tidak ditemukan' });
    }

    db.schedules.splice(scheduleIndex, 1);
    res.json({ message: 'Jadwal berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
