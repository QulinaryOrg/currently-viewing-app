const mongoose = require('mongoose');

var ViewersSchema = new mongoose.Schema({
  ip: String,
  country: String,
  region: String,
  city: String,
  loc: { type: String, coordinates: [Number] },
  online: Boolean
}, {
  timestamps: true
});

export const Viewers = mongoose.model('Viewers', ViewersSchema);
