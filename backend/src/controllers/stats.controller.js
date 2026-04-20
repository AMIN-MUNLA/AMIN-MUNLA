const mongoose = require("mongoose");

const CheckInVisit = require("../models/checkInVisit.model");
const ApiError = require("../utils/apiError");
const { VISIT_TYPES } = require("../constants/checkInVisit.constants");

function validateObjectId(value, fieldName) {
  if (!mongoose.isValidObjectId(value)) {
    return new ApiError(400, "Bad Request", `${fieldName} must be a valid ObjectId.`, [
      { field: fieldName, value },
    ]);
  }

  return null;
}

exports.getMoodSummary = async (req, res, next) => {
  try {
    const { seniorId, visitType } = req.query;
    const filters = {};

    if (seniorId) {
      const seniorError = validateObjectId(seniorId, "seniorId");
      if (seniorError) {
        return next(seniorError);
      }
      filters.seniorId = seniorId;
    }

    if (visitType) {
      if (!VISIT_TYPES.includes(visitType)) {
        return next(
          new ApiError(
            400,
            "Bad Request",
            `visitType must be one of: ${VISIT_TYPES.join(", ")}.`,
            null
          )
        );
      }
      filters.visitType = visitType;
    }

    const visits = await CheckInVisit.find(filters).select(
      "moodAfterVisit medicationTaken visitType"
    );

    if (visits.length === 0) {
      return res.status(200).json({
        totalVisits: 0,
        avgMood: 0,
        minMood: null,
        maxMood: null,
        medicationTakenCount: 0,
        byVisitType: [],
      });
    }

    const moods = visits.map((visit) => visit.moodAfterVisit);
    const totalMood = moods.reduce((sum, value) => sum + value, 0);
    const medicationTakenCount = visits.filter((visit) => visit.medicationTaken).length;

    const byVisitType = VISIT_TYPES.map((type) => ({
      visitType: type,
      count: visits.filter((visit) => visit.visitType === type).length,
    }));

    return res.status(200).json({
      totalVisits: visits.length,
      avgMood: Number((totalMood / visits.length).toFixed(2)),
      minMood: Math.min(...moods),
      maxMood: Math.max(...moods),
      medicationTakenCount,
      byVisitType,
    });
  } catch (error) {
    return next(error);
  }
};
