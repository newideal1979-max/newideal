const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true
  },
  subtitle: String,
  description: String,
  type: {
    type: String,
    enum: ['mens', 'womens'],
    required: true
  },
  fees: {
    type: Number,
    required: true,
    default: 10000
  },
  duration: {
    type: String,
    default: '3 Months'
  },
  curriculum: [{
    level: String,
    title: String,
    topics: [String]
  }],
  skills: [String],
  image: String,
  badge: {
    type: String,
    default: 'Popular'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  enrollmentCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
