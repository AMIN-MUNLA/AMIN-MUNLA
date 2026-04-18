const mongoose = require("mongoose");

const CheckInVisit = require("../models/checkInVisit.model");
const Senior = require("../models/senior.model");

exports.listSeniorCheckIns = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid senior id.",
      });
    }

    const senior = await Senior.findById(id)
      .select("fullName city supportLevel preferredContactTime")
      .lean();

    if (!senior) {
      return res.status(404).json({
        error: "Not Found",
        message: "Senior was not found.",
      });
    }

    const visits = await CheckInVisit.find({ seniorId: id })
      .sort({ checkInDate: -1 })
      .populate("companionId", "fullName relationshipType preferredLanguage")
      .lean();

    return res.status(200).json({
      senior,
      totalVisits: visits.length,
      visits,
    });
  } catch (error) {
    return next(error);
  }
};
