const express = require('express');
const Enrollment = require('../models/Enrollment');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/enrollments/my-enrollments
router.get('/my-enrollments', protect, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate('course', 'title type fees duration skills')
      .populate('batch', 'batchName startDate endDate timing days instructor mode')
      .sort({ createdAt: -1 });
    res.json({ success: true, enrollments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/enrollments - admin only
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, mode } = req.query;
    const query = {};
    if (status) query.status = status;
    if (mode) query.mode = mode;

    const enrollments = await Enrollment.find(query)
      .populate('student', 'name email phone')
      .populate('course', 'title type')
      .populate('batch', 'batchName startDate timing')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Enrollment.countDocuments(query);

    res.json({ success: true, enrollments, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
