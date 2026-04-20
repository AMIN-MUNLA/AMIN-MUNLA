const CheckInVisit = require("../models/checkInVisit.model");
const {
  VISIT_TYPES,
  joinAllowedValues,
} = require("../constants/checkInVisit.constants");

function parseDateQueryParam(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function toFixedNumber(value) {
  if (value === null || value === undefined) {
    return null;
  }
  return Number(value.toFixed(2));
}

exports.getMoodSummary = async (req, res, next) => {
  try {
    const { visitType, startDate, endDate } = req.query;
    const match = {};

    if (visitType) {
      if (!VISIT_TYPES.includes(visitType)) {
        return res.status(400).json({
          error: "Bad Request",
          message: `visitType must be one of: ${joinAllowedValues(VISIT_TYPES)}.`,
        });
      }
      match.visitType = visitType;
    }

    const parsedStartDate = parseDateQueryParam(startDate);
    const parsedEndDate = parseDateQueryParam(endDate);

    if (startDate && !parsedStartDate) {
      return res.status(400).json({
        error: "Bad Request",
        message: "startDate must be a valid date.",
      });
    }

    if (endDate && !parsedEndDate) {
      return res.status(400).json({
        error: "Bad Request",
        message: "endDate must be a valid date.",
      });
    }

    if (parsedStartDate && parsedEndDate && parsedStartDate > parsedEndDate) {
      return res.status(400).json({
        error: "Bad Request",
        message: "startDate cannot be after endDate.",
      });
    }

    if (parsedStartDate || parsedEndDate) {
      match.checkInDate = {};

      if (parsedStartDate) {
        match.checkInDate.$gte = parsedStartDate;
      }

      if (parsedEndDate) {
        match.checkInDate.$lte = parsedEndDate;
      }
    }

    const [summary] = await CheckInVisit.aggregate([
      { $match: match },
      {
        $facet: {
          overall: [
            {
              $group: {
                _id: null,
                totalVisits: { $sum: 1 },
                averageMood: { $avg: "$moodAfterVisit" },
                minMood: { $min: "$moodAfterVisit" },
                maxMood: { $max: "$moodAfterVisit" },
                followUpRequiredCount: {
                  $sum: { $cond: ["$followUpRequired", 1, 0] },
                },
              },
            },
          ],
          byVisitType: [
            {
              $group: {
                _id: "$visitType",
                count: { $sum: 1 },
                averageMood: { $avg: "$moodAfterVisit" },
              },
            },
            { $sort: { count: -1, _id: 1 } },
          ],
          bySupportLevel: [
            {
              $lookup: {
                from: "seniors",
                localField: "seniorId",
                foreignField: "_id",
                as: "senior",
              },
            },
            { $unwind: "$senior" },
            {
              $group: {
                _id: "$senior.supportLevel",
                count: { $sum: 1 },
                averageMood: { $avg: "$moodAfterVisit" },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
    ]);

    const overall = summary?.overall?.[0] || {
      totalVisits: 0,
      averageMood: null,
      minMood: null,
      maxMood: null,
      followUpRequiredCount: 0,
    };

    return res.status(200).json({
      filters: {
        visitType: visitType || null,
        startDate: startDate || null,
        endDate: endDate || null,
      },
      totals: {
        totalVisits: overall.totalVisits,
        followUpRequiredCount: overall.followUpRequiredCount,
      },
      mood: {
        average: toFixedNumber(overall.averageMood),
        min: overall.minMood,
        max: overall.maxMood,
      },
      byVisitType: (summary?.byVisitType || []).map((item) => ({
        visitType: item._id,
        count: item.count,
        averageMood: toFixedNumber(item.averageMood),
      })),
      bySupportLevel: (summary?.bySupportLevel || []).map((item) => ({
        supportLevel: item._id,
        count: item.count,
        averageMood: toFixedNumber(item.averageMood),
      })),
    });
  } catch (error) {
    return next(error);
  }
};
