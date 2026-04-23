require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : "";

function isPlaceholderMongoUri(uri) {
  return /<[^>]+>/.test(uri);
}

async function connectToDatabase() {
  if (!MONGODB_URI || isPlaceholderMongoUri(MONGODB_URI)) {
    console.warn(
      "[startup] MONGODB_URI is missing or placeholder. Data endpoints will return 503 until DB is configured."
    );
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
    console.log("[startup] Connected to MongoDB Atlas.");
  } catch (error) {
    console.warn(`[startup] MongoDB connection failed: ${error.message}`);
    console.warn("[startup] API will still start; data endpoints will return 503.");
  }
}

async function startServer() {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`[startup] API listening on http://localhost:${PORT}`);
  });
}

startServer();
