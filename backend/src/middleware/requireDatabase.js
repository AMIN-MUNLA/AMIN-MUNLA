const mongoose = require("mongoose");

function requireDatabase(req, res, next) {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  const rawUri = process.env.MONGODB_URI ? process.env.MONGODB_URI.trim() : "";
  const hasPlaceholder = /<[^>]+>/.test(rawUri);
  const hasUri = Boolean(rawUri) && !hasPlaceholder;

  return res.status(503).json({
    error: "Service Unavailable",
    message: hasUri
      ? "Database is not connected. Check your MongoDB Atlas connection."
      : "Database is not configured. Add MONGODB_URI in backend/.env.",
    details: hasUri ? null : [{ field: "MONGODB_URI", value: null }],
  });
}

module.exports = requireDatabase;
