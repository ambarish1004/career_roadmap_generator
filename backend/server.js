require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");  // ✅ Import Passport.js
require("./config/passport");  // ✅ Load Passport strategies

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const logger = require("./config/logger");
const errorHandler = require("./middleware/errorHandler");
const gracefulShutdown = require("./utils/gracefulShutdown");
const roadmapRoutes = require("./routes/roadmapRoutes");
const generateRoadmap = require("./utils/generateRoadmap");
const path = require("path");
const cors = require("cors");

const userInput = "Full-Stack Developer";

// ✅ Initialize Express app
const app = express();

// ✅ CORS Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Serve static files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Session Middleware (Required for Passport.js)
app.use(session({
  secret: process.env.SESSION_SECRET || "your_secret_key",
  resave: false,
  saveUninitialized: true
}));

// ✅ Initialize Passport.js for OAuth Authentication
app.use(passport.initialize());
app.use(passport.session());

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "https://trustedcdn.example.com"],
      },
    },
  })
);

// ✅ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// ✅ Health-Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "Healthy",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/roadmaps", roadmapRoutes);

// ✅ Error Handling Middleware
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// ✅ Graceful Shutdown
process.on("SIGINT", () => gracefulShutdown(server, mongoose));
process.on("SIGTERM", () => gracefulShutdown(server, mongoose));
