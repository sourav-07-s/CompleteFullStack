
const express = require("express");
const cookieParser = require("cookie-parser");

const Authrouter = require("./routes/auth.route");
const adminrouter = require("./routes/admin.route");
const dbConnect = require("./db/db");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// API health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MusicFy API is running 🎵",
  });
});

// Connect to MongoDB before handling API requests
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    console.error("Database connection error:", error.message);

    return res.status(503).json({
      success: false,
      message: "Database connection unavailable",
    });
  }
});

// Authentication routes
app.use("/api/auth", Authrouter);

// Admin and music routes
app.use("/api/admin", adminrouter);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Server error:", error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

module.exports = app;
