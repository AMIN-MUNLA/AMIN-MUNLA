const mongoose = require("mongoose");
const { VISIT_TYPES } = require("../constants/checkInVisit.constants");

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
      enum: VISIT_TYPES,
      required: true,
    },
    moodAfterVisit: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    medicationTaken: {
      type: Boolean,
      required: true,
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
