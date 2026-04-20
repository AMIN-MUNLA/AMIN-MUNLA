const mongoose = require("mongoose");

const Senior = require("../models/senior.model");
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

exports.listSeniors = async (_req, res, next) => {
  try {
    const seniors = await Senior.find().sort({ fullName: 1 });
    return res.status(200).json(seniors);
  } catch (error) {
    return next(error);
  }
};

exports.getSeniorCheckIns = async (req, res, next) => {
  try {
    const idError = validateObjectId(req.params.id, "id");
    if (idError) {
      return next(idError);
    }

    const senior = await Senior.findById(req.params.id);
    if (!senior) {
      return next(new ApiError(404, "Not Found", "Senior was not found.", null));
    }

    const visits = await CheckInVisit.find({ seniorId: req.params.id })
      .sort({ checkInDate: -1 })
      .populate("seniorId", "fullName city supportLevel")
      .populate("companionId", "fullName relationshipType preferredLanguage");

    return res.status(200).json({
      senior,
      visits,
    });
  } catch (error) {
    return next(error);
  }
};
