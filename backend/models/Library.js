// backend/models/Library.js
const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  isbn: { type: String, unique: true },
  publishedYear: { type: Number },
  category: { type: String },
  available: { type: Boolean, default: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  addedAt: { type: Date, default: Date.now }
});

const Library = mongoose.model('Library', librarySchema);
module.exports = Library;