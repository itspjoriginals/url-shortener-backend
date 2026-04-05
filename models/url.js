const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  redirectURL: { type: String, required: true },

  visitHistory: [{
    timestamp: Number,
    ip: String,
    userAgent: String,
  }],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }

}, { timestamps: true });

module.exports = mongoose.model("url", urlSchema);