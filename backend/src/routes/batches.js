const express = require('express');
const Batch = require('../models/Batch');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/batches - public
router.get('/', async (req, res) => {
  try {
    const { courseId, mode } = req.query;
    const query = { isActive: true };
    if (courseId) query.course = courseId;
    if (mode) query.mode = { $in: [mode, 'both'] };

    const batches = await Batch.find(query)
      .populate('course', 'title type')
      .sort({ startDate: 1 });
    res.json({ success: true, batches });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/batches - admin
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const batch = await Batch.create(req.body);
    res.status(201).json({ success: true, batch });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH /api/batches/:id - admin
router.patch('/:id', protect, adminOnly, async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, batch });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/batches/:id - admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Batch.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Batch deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
