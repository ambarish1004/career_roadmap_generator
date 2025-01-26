const express = require("express");
const Roadmap = require("../models/roadmap");
const authenticate = require("../middleware/authenticate");
const generateRoadmap = require("../utils/generateRoadmap");

const router = express.Router();

// Generate Roadmap (AI-powered)
router.post("/generate", authenticate, async (req, res) => {
  const { goal, skills, interests } = req.body;

  if (!goal) {
    return res.status(400).json({ message: "Career goal is required" });
  }

  try {
    const userInput = `Career Goal: ${goal}. Skills: ${skills || "none"}. Interests: ${interests || "none"}.`;
    const generatedText = await generateRoadmap(userInput);

    const newRoadmap = new Roadmap({
      title: goal,
      description: generatedText,
      createdBy: req.user.id,
      steps: [], // Optional: Parse the AI-generated text into steps
      isPublic: true,
    });

    await newRoadmap.save();
    res.status(201).json({ message: "Roadmap generated successfully", roadmap: newRoadmap });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate roadmap", error: error.message });
  }
});

// Create a new roadmap (Manual Entry)
router.post("/", authenticate, async (req, res) => {
  const { title, description, steps, isPublic } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const newRoadmap = new Roadmap({
      title,
      description,
      steps,
      createdBy: req.user.id,
      isPublic,
    });

    await newRoadmap.save();
    res.status(201).json({ message: "Roadmap created successfully", roadmap: newRoadmap });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch all roadmaps
router.get("/", authenticate, async (req, res) => {
  try {
    const roadmaps = await Roadmap.find().populate("createdBy", "name email");
    res.status(200).json({ roadmaps });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Fetch a specific roadmap
router.get("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const roadmap = await Roadmap.findById(id).populate("createdBy", "name email");
    if (!roadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    res.status(200).json({ roadmap });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update a roadmap
router.put("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { title, description, steps, isPublic } = req.body;

  try {
    const updatedRoadmap = await Roadmap.findByIdAndUpdate(
      id,
      { title, description, steps, isPublic, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedRoadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    res.status(200).json({ message: "Roadmap updated successfully", roadmap: updatedRoadmap });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Delete a roadmap
router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRoadmap = await Roadmap.findByIdAndDelete(id);

    if (!deletedRoadmap) {
      return res.status(404).json({ message: "Roadmap not found" });
    }

    res.status(200).json({ message: "Roadmap deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
