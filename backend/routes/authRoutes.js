// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const speakeasy = require('speakeasy');
// const QRCode = require('qrcode');
// const { body, validationResult } = require('express-validator'); 
// const asyncHandler = require('express-async-handler');
// const User = require('../models/user'); // User model 
// const authenticate = require('../middleware/authenticate'); // Middleware to authenticate the user 
// const authorize = require('../middleware/authorize'); // Import the authorize middleware
// const router = express.Router();

// // Signup Route
// router.post(
//   '/signup',
//   [
//     body('name').notEmpty().withMessage('Name is required'),
//     body('email').isEmail().withMessage('Invalid email address'),
//     body('password')
//       .isLength({ min: 8 })
//       .withMessage('Password must be at least 8 characters'),
//   ],
//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { name, email, password } = req.body;
    
//     // Check if user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);
    
//     // Generate verification token
//     const verificationToken = crypto.randomBytes(32).toString('hex');

//     // Create user with verification token (but not verified yet)
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       emailVerificationToken: verificationToken,
//       isVerified: false,  // User will be unverified until they click the email link
//     });

//     await newUser.save();

//     // Generate Email Verification URL
//     const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
    
//     // Send verification email
//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       to: email,
//       subject: 'Verify Your Email',
//       text: `Click the link to verify your email: ${verificationUrl}`,
//     });

//     res.status(201).json({
//       message: 'Signup successful. Check your email for verification link.',
//     });
//   })
// );

// // Email Verification Route
// router.get('/verify-email/:token', asyncHandler(async (req, res) => {
//   const { token } = req.params;

//   const user = await User.findOne({ emailVerificationToken: token });

//   if (!user) {
//     return res.status(400).json({ message: 'Invalid or expired verification token' });
//   }

//   user.isVerified = true;
//   user.emailVerificationToken = undefined;
//   await user.save();

//   res.status(200).json({ message: 'Email verified successfully. You can now login.' });
// }));

// // Login Route with App-Based 2FA Verification
// router.post('/login', async (req, res) => {
//   const { email, password, twoFactorCode } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Check if user is verified
//     if (!user.isVerified) {
//       return res.status(403).json({ message: 'Please verify your email before logging in' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Check if 2FA is enabled
//     if (user.twoFactorEnabled) {
//       if (!twoFactorCode) {
//         return res.status(400).json({ message: 'Two-factor authentication code is required' });
//       }

//       const isVerified = speakeasy.totp.verify({
//         secret: user.twoFactorSecret,
//         encoding: 'base32',
//         token: twoFactorCode,
//       });

//       if (!isVerified) {
//         return res.status(401).json({ message: 'Invalid 2FA code' });
//       }
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, name: user.name, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Enable App-Based 2FA
// router.post('/enable-2fa', authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const secret = speakeasy.generateSecret({ name: `YourAppName (${user.email})` });

//     user.twoFactorSecret = secret.base32;
//     user.twoFactorEnabled = true;
//     await user.save();

//     const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

//     res.status(200).json({
//       message: '2FA enabled. Scan the QR code with your authenticator app.',
//       qrCodeUrl,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Send OTP for Email-Based 2FA
// router.post('/send-otp', authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const otp = crypto.randomInt(100000, 999999);
//     user.emailOtp = otp;
//     user.emailOtpExpires = Date.now() + 10 * 60 * 1000;
//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       to: user.email,
//       subject: 'Your One-Time Password',
//       text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
//     });

//     res.status(200).json({ message: 'OTP sent to your email.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Verify OTP for Email-Based 2FA
// router.post('/verify-otp', authenticate, async (req, res) => {
//   const { otp } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (user.emailOtp !== otp || user.emailOtpExpires < Date.now()) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     user.emailOtp = undefined;
//     user.emailOtpExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: 'OTP verified successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Forgot Password Route
// router.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const resetToken = crypto.randomBytes(32).toString('hex');
//     user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     user.resetPasswordExpires = Date.now() + 3600000;
//     await user.save();

//     const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
//     const message = `You requested a password reset. Click the link to reset your password: ${resetUrl}`;

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       to: user.email,
//       subject: 'Password Reset Request',
//       text: message,
//     });

//     res.status(200).json({ message: 'Password reset link sent' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Reset Password Route
// router.post('/reset-password/:token', async (req, res) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   try {
//     const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpires: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

//     user.password = await bcrypt.hash(password, 12);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Password reset successful' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Email Verification Route
// router.get('/verify-email/:token', async (req, res) => {
//   const { token } = req.params;
//   try {
//     const user = await User.findOne({ emailVerificationToken: token });
//     if (!user) return res.status(400).json({ message: 'Invalid token' });

//     user.isVerified = true;
//     user.emailVerificationToken = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Email verified successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// router.get('/admin/analytics', authenticate, authorize(['admin']), async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const activeUsers = await User.countDocuments({ isActive: true });
//     res.status(200).json({ totalUsers, activeUsers });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });


// module.exports = router;
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

const router = express.Router();

// ✅ Google Login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "http://localhost:5173/login"
}));

// ✅ Facebook Login
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "http://localhost:5173/login"
}));

// ✅ Apple Login
router.get("/apple", passport.authenticate("apple"));
router.get("/apple/callback", passport.authenticate("apple", {
  successRedirect: "http://localhost:5173/dashboard",
  failureRedirect: "http://localhost:5173/login"
}));

// ✅ Signup Route
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Create user with verification token
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      emailVerificationToken: verificationToken,
      isVerified: false,
    });

    await newUser.save();

    // Send verification email
    const verificationUrl = `${req.protocol}://${req.get("host")}/api/auth/verify-email/${verificationToken}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Verify Your Email",
      text: `Click the link to verify your email: ${verificationUrl}`,
    });

    res.status(201).json({ message: "Signup successful. Check your email for verification link." });
  })
);

// ✅ Email Verification Route
router.get("/verify-email/:token", asyncHandler(async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired verification token" });
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  res.status(200).json({ message: "Email verified successfully. You can now login." });
}));

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password, twoFactorCode } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.twoFactorEnabled) {
      if (!twoFactorCode) {
        return res.status(400).json({ message: "Two-factor authentication code is required" });
      }

      const isVerified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: "base32",
        token: twoFactorCode,
      });

      if (!isVerified) {
        return res.status(401).json({ message: "Invalid 2FA code" });
      }
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Forgot Password Route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    });

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;