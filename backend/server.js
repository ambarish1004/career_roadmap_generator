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
const path = require("path");
const userInput = "Full-Stack Developer";

// Generate roadmap
generateRoadmap(userInput)
  .then((roadmap) => console.log(roadmap))
  .catch((error) => console.error(error.message));

// Initialize express app
const app = express();  // <-- Move this line here, before using app

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));  // <-- Now this is after the initialization of `app`

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
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


// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'", "https://trustedcdn.example.com"],
//         styleSrc: ["'self'", "https://trustedcdn.example.com"],
//         connectSrc: ["'self'", "https://api.example.com"],
//         imgSrc: ["'self'", "data:", "https://trustedimages.com"],
//         frameAncestors: ["'none'"],
//       },
//     },
//   })
// );



// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-eval'"], // ✅ Allow eval()
//         styleSrc: ["'self'", "https://trustedcdn.example.com", "'unsafe-inline'"], // ✅ Allow inline styles
//         imgSrc: ["'self'", "data:"], // ✅ Allow images & base64
//       },
//     },
//   })
// );

// app.use(
//   helmet({
//     contentSecurityPolicy: false // Removed CSP restrictions
//   })
// );


// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-eval'"], // ✅ Allows eval()
//         styleSrc: ["'self'", "'unsafe-inline'"], // ✅ Allows inline styles
//         imgSrc: ["'self'", "data:"],
//       },
//     },
//   })
// );





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
