const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const Batch = require('../models/Batch');
const { protect } = require('../middleware/auth');

const router = express.Router();

const getRazorpay = () => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payments/create-order
router.post('/create-order', protect, async (req, res) => {
  try {
    const { courseId, batchId, mode } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const batch = await Batch.findById(batchId);
    if (!batch || !batch.isActive) {
      return res.status(404).json({ success: false, message: 'Batch not found or inactive' });
    }

    if (batch.seatsLeft <= 0) {
      return res.status(400).json({ success: false, message: 'No seats available in this batch' });
    }

    const receipt = `receipt_${req.user._id}_${Date.now()}`;
    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount: course.fees * 100,
      currency: 'INR',
      receipt,
      notes: {
        courseId: courseId.toString(),
        batchId: batchId.toString(),
        userId: req.user._id.toString(),
        mode
      }
    });

    const payment = await Payment.create({
      student: req.user._id,
      course: courseId,
      razorpayOrderId: order.id,
      amount: course.fees,
      mode,
      receipt
    });

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      paymentId: payment._id,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/payments/verify
router.post('/verify', protect, async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, courseId, batchId, mode, paymentDbId } = req.body;

    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      await Payment.findByIdAndUpdate(paymentDbId, { status: 'failed' });
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Update payment record
    await Payment.findByIdAndUpdate(paymentDbId, {
      razorpayPaymentId,
      razorpaySignature,
      status: 'paid',
      paidAt: new Date()
    });

    // Create enrollment
    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
      batch: batchId,
      mode,
      status: 'active',
      paymentStatus: 'paid',
      paymentId: paymentDbId
    });

    // Update payment with enrollment ref
    await Payment.findByIdAndUpdate(paymentDbId, { enrollment: enrollment._id });

    // Decrease seats
    await Batch.findByIdAndUpdate(batchId, { $inc: { seatsLeft: -1 } });
    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    res.json({ success: true, message: 'Payment verified and enrollment confirmed!', enrollment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/payments/my-payments
router.get('/my-payments', protect, async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.user._id })
      .populate('course', 'title type')
      .sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
