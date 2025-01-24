const express = require('express');
const Contribution = require('../models/contribution');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Add a new contribution
router.post('/', authenticate, async (req, res) => {
  const { roadmapId, suggestion } = req.body;

  if (!roadmapId || !suggestion) {
    return res.status(400).json({ message: "Roadmap ID and suggestion are required" });
  }

  try {
    const newContribution = new Contribution({
      roadmapId,
      contributorId: req.user.id,
      suggestion,
    });

    await newContribution.save();
    res.status(201).json({ message: "Contribution added successfully", contribution: newContribution });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch all contributions for a roadmap
router.get('/:roadmapId', authenticate, async (req, res) => {
  const { roadmapId } = req.params;

  try {
    const contributions = await Contribution.find({ roadmapId }).populate('contributorId', 'name email');
    res.status(200).json({ contributions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
