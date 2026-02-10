const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://mahialamazads_db_user:QXw8LwB7tW4jbhHY@taskmanagement.a5wtpyd.mongodb.net/?appName=taskmanagement");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // stop the app if DB connection fails
  }
}

module.exports = connectDB;