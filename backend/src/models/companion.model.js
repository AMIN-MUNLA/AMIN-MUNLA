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
      maxlength: 30,
    },
    preferredLanguage: {
      type: String,
      enum: ["Swedish", "English", "Arabic"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Companion", companionSchema);
