const mongoose = require("mongoose");

const companionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 80,
    },
    relationshipType: {
      type: String,
      enum: ["family", "volunteer", "caregiver", "neighbor"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^\+?[0-9\s-]{7,20}$/,
    },
    preferredLanguage: {
      type: String,
      enum: ["Swedish", "English", "Arabic"],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    maxWeeklyVisits: {
      type: Number,
      min: 1,
      max: 14,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Companion", companionSchema);
