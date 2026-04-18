const mongoose = require("mongoose");

const CheckInVisit = require("../models/checkInVisit.model");
const Companion = require("../models/companion.model");

exports.listCompanionCheckIns = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid companion id.",
      });
    }

    const companion = await Companion.findById(id)
      .select("fullName relationshipType preferredLanguage active")
      .lean();

    if (!companion) {
      return res.status(404).json({
        error: "Not Found",
        message: "Companion was not found.",
      });
    }

    const visits = await CheckInVisit.find({ companionId: id })
      .sort({ checkInDate: -1 })
      .populate("seniorId", "fullName city supportLevel")
      .lean();

    return res.status(200).json({
      companion,
      totalVisits: visits.length,
      visits,
    });
  } catch (error) {
    return next(error);
  }
};
