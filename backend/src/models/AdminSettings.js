const mongoose = require('mongoose');

const adminSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  value: mongoose.Schema.Types.Mixed,
  label: String,
  category: {
    type: String,
    enum: ['fees', 'batch', 'content', 'contact', 'seo'],
    default: 'content'
  }
}, { timestamps: true });

module.exports = mongoose.model('AdminSettings', adminSettingsSchema);
