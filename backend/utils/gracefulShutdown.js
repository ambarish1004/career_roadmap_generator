const logger = require("../config/logger");

const gracefulShutdown = async (server, mongoose) => {
  try {
    logger.info("Closing server...");
    server.close(() => {
      logger.info("Server closed.");
      mongoose.connection.close(false, () => {
        logger.info("MongoDB connection closed.");
        process.exit(0);
      });
    });
  } catch (err) {
    logger.error("Error during shutdown", err);
    process.exit(1);
  }
};

module.exports = gracefulShutdown;
