const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  steps: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      resources: [{ type: String }],
      duration: { type: String },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isPublic: { type: Boolean, default: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Roadmap", roadmapSchema);
