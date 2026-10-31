
const mongoose = require("mongoose");

let connectionPromise = null;

async function connectDb() {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is missing");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
      })
      .then(() => {
        console.log("MongoDB connected successfully");
        return mongoose.connection;
      })
      .catch((error) => {
        connectionPromise = null;
        console.error("MongoDB connection failed:", error.message);
        throw error;
      });
  }

  return connectionPromise;
}

mongoose.connection.on("disconnected", () => {
  connectionPromise = null;
});

module.exports = connectDb;
