const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  roadmapId: { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap", required: true },
  contributorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  suggestion: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contribution", contributionSchema);
