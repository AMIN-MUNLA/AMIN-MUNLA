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
      unique: true,
      match: /^\+?[0-9\s-]{7,20}$/,
    },
    supportLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    preferredContactTime: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },
    mobilityLevel: {
      type: String,
      enum: ["independent", "assisted", "limited"],
      required: true,
    },
    medicalNotes: {
      type: String,
      trim: true,
      maxlength: 300,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Senior", seniorSchema);
