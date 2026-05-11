const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  course: String,
  review: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  avatar: String,
  city: String,
  isApproved: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
