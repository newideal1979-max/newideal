const express = require('express');
const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const Payment = require('../models/Payment');
const Testimonial = require('../models/Testimonial');
const Batch = require('../models/Batch');
const AdminSettings = require('../models/AdminSettings');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.use(protect, adminOnly);

// GET /api/admin/dashboard - Main analytics
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const [
      totalStudents,
      totalEnrollments,
      activeEnrollments,
      totalPayments,
      monthlyRevenue,
      yearlyRevenue,
      pendingTestimonials,
      recentEnrollments,
      recentPayments,
      onlineEnrollments,
      offlineEnrollments
    ] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Enrollment.countDocuments(),
      Enrollment.countDocuments({ status: 'active' }),
      Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Payment.aggregate([
        { $match: { status: 'paid', paidAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Payment.aggregate([
        { $match: { status: 'paid', paidAt: { $gte: startOfYear } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Testimonial.countDocuments({ isApproved: false }),
      Enrollment.find()
        .populate('student', 'name email')
        .populate('course', 'title type')
        .sort({ createdAt: -1 })
        .limit(5),
      Payment.find({ status: 'paid' })
        .populate('student', 'name email')
        .populate('course', 'title')
        .sort({ paidAt: -1 })
        .limit(5),
      Enrollment.countDocuments({ mode: 'online' }),
      Enrollment.countDocuments({ mode: 'offline' })
    ]);

    // Monthly enrollment trend (last 6 months)
    const monthlyTrend = await Enrollment.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(now.getFullYear(), now.getMonth() - 5, 1) }
        }
      },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      success: true,
      stats: {
        totalStudents,
        totalEnrollments,
        activeEnrollments,
        totalRevenue: totalPayments[0]?.total || 0,
        monthlyRevenue: monthlyRevenue[0]?.total || 0,
        yearlyRevenue: yearlyRevenue[0]?.total || 0,
        pendingTestimonials,
        onlineEnrollments,
        offlineEnrollments
      },
      recentEnrollments,
      recentPayments,
      monthlyTrend
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/students
router.get('/students', async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    const query = { role: 'student' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await User.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({ success: true, students, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/payments
router.get('/payments', async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const payments = await Payment.find(query)
      .populate('student', 'name email phone')
      .populate('course', 'title type')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Payment.countDocuments(query);

    res.json({ success: true, payments, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await AdminSettings.find();
    const settingsMap = {};
    settings.forEach(s => { settingsMap[s.key] = s.value; });
    res.json({ success: true, settings: settingsMap });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/admin/settings
router.put('/settings', async (req, res) => {
  try {
    const { key, value, label, category } = req.body;
    const setting = await AdminSettings.findOneAndUpdate(
      { key },
      { value, label, category },
      { new: true, upsert: true }
    );
    res.json({ success: true, setting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/admin/testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ success: true, testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
