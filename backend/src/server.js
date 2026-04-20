require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectToDatabase() {
  if (!MONGODB_URI) {
    console.warn(
      "[startup] MONGODB_URI is missing. Backend will run without DB connection on Day 1."
    );
    return;
  }

  await mongoose.connect(MONGODB_URI);
  console.log("[startup] Connected to MongoDB Atlas.");
}

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`[startup] API listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("[startup] Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
