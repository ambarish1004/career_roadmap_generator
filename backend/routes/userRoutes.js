const express = require('express');
const User = require('../models/user');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const upload = require('../middleware/upload');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  const { name, email, password } = req.body;
  const updatedData = { name, email, updatedAt: Date.now() };

  if (password) {
    updatedData.password = password;
  }

  try {
    const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true }).select('-password');
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete user profile
router.delete('/profile', authenticate, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/profile/picture', authenticate, upload.single('profilePicture'), async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { profilePicture: req.file.path, updatedAt: Date.now() },
        { new: true }
      ).select('-password');
      res.status(200).json({ message: 'Profile picture updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  router.post('/enable-2fa', async (req, res) => {
    try {
      const user = await User.findById(req.user.id); // Ensure the user is authenticated
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const secret = speakeasy.generateSecret({
        name: `YourAppName (${user.email})`,
      });
  
      user.twoFactorSecret = secret.base32; // Save the secret in the database
      await user.save();
  
      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
  
      res.status(200).json({
        message: '2FA enabled. Scan the QR code with your authenticator app.',
        qrCodeUrl,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  router.post('/login', async (req, res) => {
  const { email, password, twoFactorCode } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      if (!twoFactorCode) {
        return res
          .status(400)
          .json({ message: 'Two-factor authentication code is required' });
      }

      const isVerified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: twoFactorCode,
      });

      if (!isVerified) {
        return res.status(401).json({ message: 'Invalid 2FA code' });
      }
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



module.exports = router;
