const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  bio: { type: String },
  industries: [{ type: String }],
  skills: [{ type: String }],
  rating: { type: Number, default: 0 },
  availableSlots: [
    {
      day: { type: String },
      time: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Mentor", mentorSchema);
