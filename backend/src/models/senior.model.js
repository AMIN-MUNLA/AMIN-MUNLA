const mongoose = require("mongoose");

const seniorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 80,
    },
    age: {
      type: Number,
      required: true,
      min: 60,
      max: 110,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    contactPhone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    supportLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    preferredCheckInWindow: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Senior", seniorSchema);
