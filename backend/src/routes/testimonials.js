const express = require('express');
const Testimonial = require('../models/Testimonial');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// GET /api/testimonials - public (approved only)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true })
      .sort({ isFeatured: -1, order: 1 });
    res.json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/testimonials - student submit
router.post('/', protect, async (req, res) => {
  try {
    const { studentName, course, review, rating, city } = req.body;
    const testimonial = await Testimonial.create({
      studentName: studentName || req.user.name,
      course,
      review,
      rating,
      city: city || req.user.city,
      isApproved: false
    });
    res.status(201).json({ success: true, message: 'Testimonial submitted for review', testimonial });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH /api/testimonials/:id - admin approve/update
router.patch('/:id', protect, adminOnly, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, testimonial });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/testimonials/:id - admin
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
