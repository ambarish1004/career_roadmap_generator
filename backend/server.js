require("dotenv").config();

const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const logger = require("./config/logger");
const errorHandler = require("./middleware/errorHandler");
const gracefulShutdown = require("./utils/gracefulShutdown");
const roadmapRoutes = require("./routes/roadmapRoutes");
const generateRoadmap = require("./utils/generateRoadmap");

const userInput = "Full-Stack Developer";
generateRoadmap(userInput)
  .then((roadmap) => console.log(roadmap))
  .catch((error) => console.error(error.message));

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

// Health-Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "Healthy",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/roadmaps", roadmapRoutes);
// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", () => gracefulShutdown(server, mongoose));
process.on("SIGTERM", () => gracefulShutdown(server, mongoose));
