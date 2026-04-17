const mongoose = require("mongoose");

const checkInVisitSchema = new mongoose.Schema(
  {
    seniorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Senior",
      required: true,
    },
    companionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Companion",
      required: true,
    },
    checkInDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "checkInDate cannot be in the future.",
      },
    },
    visitType: {
      type: String,
      enum: ["call", "home_visit", "video_call"],
      required: true,
    },
    moodAfterVisit: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    durationMinutes: {
      type: Number,
      min: 5,
      max: 240,
      required: true,
    },
    supportAction: {
      type: String,
      enum: [
        "none",
        "medicine_reminder",
        "grocery_help",
        "appointment_booking",
        "emergency_contact",
      ],
      default: "none",
    },
    followUpRequired: {
      type: Boolean,
      default: false,
    },
    followUpDueDate: {
      type: Date,
      validate: {
        validator: function validateFollowUpDueDate(value) {
          if (!this.followUpRequired) {
            return value === null || value === undefined;
          }
          return Boolean(value) && value >= this.checkInDate;
        },
        message:
          "followUpDueDate is required when followUpRequired is true and must be after checkInDate.",
      },
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CheckInVisit", checkInVisitSchema);
