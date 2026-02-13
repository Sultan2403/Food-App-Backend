const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_KEY);
    console.log("✅ DB Connected!");
  } catch (error) {
    console.log("❌ DB Connection failed");
    console.error(error, error.message);
    process.exit(1);
  }
}

module.exports = connectDB;
