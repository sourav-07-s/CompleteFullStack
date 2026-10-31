
const mongoose = require("mongoose");

let connectionPromise = null;

async function connectDb() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  // Reuse an existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Prevent multiple simultaneous connection attempts
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => {
        console.log("Database connected successfully");
        return mongoose.connection;
      })
      .catch((error) => {
        connectionPromise = null;
        console.error("Database connection failed:", error.message);
        throw error;
      });
  }

  return connectionPromise;
}

module.exports = connectDb;
