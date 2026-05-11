const mongoose = require('mongoose');

const batchSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  batchName: {
    type: String,
    required: true,
    trim: true
  },
  mode: {
    type: String,
    enum: ['online', 'offline', 'both'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  timing: {
    type: String,
    required: true
  },
  days: [String],
  totalSeats: {
    type: Number,
    default: 20
  },
  seatsLeft: {
    type: Number,
    default: 20
  },
  instructor: {
    type: String,
    default: 'Tosif Ahmed Mansuri'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isUpcoming: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Batch', batchSchema);
