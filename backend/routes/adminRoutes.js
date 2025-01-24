const express = require('express');
const User = require('../models/user');
const authenticate = require('../middleware/authenticate');
const adminMiddleware = require('../middleware/adminMiddleware');
const authorize = require('../middleware/authorize'); // Importing the new middleware

const router = express.Router();

// Get all users (admin only)
router.get('/users', authenticate, adminMiddleware, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const users = await User.find()
      .select('-password')
      .skip((page - 1) * limit)
      .limit(limit);
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers, users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user role (admin only)
router.put('/users/:id/role', authenticate, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    res.status(200).json({ message: 'User role updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/users/:id', authenticate, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin analytics route
router.get('/admin/analytics', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    res.status(200).json({ totalUsers, activeUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Additional Admin-only route for getting all users without pagination
router.get('/analytics/users', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;