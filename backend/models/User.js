// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], required: true },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;