const mongoose = require("mongoose");

const Companion = require("../models/companion.model");
const CheckInVisit = require("../models/checkInVisit.model");
const ApiError = require("../utils/apiError");

function validateObjectId(value, fieldName) {
  if (!mongoose.isValidObjectId(value)) {
    return new ApiError(400, "Bad Request", `${fieldName} must be a valid ObjectId.`, [
      { field: fieldName, value },
    ]);
  }

  return null;
}

exports.listCompanions = async (_req, res, next) => {
  try {
    const companions = await Companion.find().sort({ fullName: 1 });
    return res.status(200).json(companions);
  } catch (error) {
    return next(error);
  }
};

exports.getCompanionCheckIns = async (req, res, next) => {
  try {
    const idError = validateObjectId(req.params.id, "id");
    if (idError) {
      return next(idError);
    }

    const companion = await Companion.findById(req.params.id);
    if (!companion) {
      return next(new ApiError(404, "Not Found", "Companion was not found.", null));
    }

    const visits = await CheckInVisit.find({ companionId: req.params.id })
      .sort({ checkInDate: -1 })
      .populate("seniorId", "fullName city supportLevel")
      .populate("companionId", "fullName relationshipType preferredLanguage");

    return res.status(200).json({
      companion,
      visits,
    });
  } catch (error) {
    return next(error);
  }
};
