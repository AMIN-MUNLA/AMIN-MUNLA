const mongoose = require("mongoose");

const CheckInVisit = require("../models/checkInVisit.model");
const Companion = require("../models/companion.model");
const Senior = require("../models/senior.model");

const visitTypeValues = ["call", "home_visit", "video_call"];

function parseBooleanQuery(value) {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return null;
}

function populateQuery(query) {
  return query
    .populate("seniorId", "fullName city supportLevel")
    .populate("companionId", "fullName relationshipType preferredLanguage");
}

async function ensureReferenceExists(Model, id, entityLabel, fieldName) {
  if (!mongoose.isValidObjectId(id)) {
    return {
      status: 400,
      error: "Bad Request",
      message: `${fieldName} must be a valid ObjectId.`,
    };
  }

  const exists = await Model.exists({ _id: id });
  if (!exists) {
    return {
      status: 404,
      error: "Not Found",
      message: `${entityLabel} was not found for ${fieldName}.`,
    };
  }

  return null;
}

async function validateReferencesFromBody(body) {
  if (Object.prototype.hasOwnProperty.call(body, "seniorId")) {
    const seniorError = await ensureReferenceExists(
      Senior,
      body.seniorId,
      "Senior",
      "seniorId"
    );
    if (seniorError) {
      return seniorError;
    }
  }

  if (Object.prototype.hasOwnProperty.call(body, "companionId")) {
    const companionError = await ensureReferenceExists(
      Companion,
      body.companionId,
      "Companion",
      "companionId"
    );
    if (companionError) {
      return companionError;
    }
  }

  return null;
}

exports.listCheckInVisits = async (req, res, next) => {
  try {
    const filters = {};
    const { seniorId, companionId, visitType, followUpRequired, minMood, maxMood } =
      req.query;

    if (seniorId) {
      if (!mongoose.isValidObjectId(seniorId)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Invalid seniorId query value.",
        });
      }
      filters.seniorId = seniorId;
    }

    if (companionId) {
      if (!mongoose.isValidObjectId(companionId)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Invalid companionId query value.",
        });
      }
      filters.companionId = companionId;
    }

    if (visitType) {
      if (!visitTypeValues.includes(visitType)) {
        return res.status(400).json({
          error: "Bad Request",
          message: "visitType must be one of: call, home_visit, video_call.",
        });
      }
      filters.visitType = visitType;
    }

    if (followUpRequired !== undefined) {
      const parsed = parseBooleanQuery(followUpRequired);
      if (parsed === null) {
        return res.status(400).json({
          error: "Bad Request",
          message: "followUpRequired must be 'true' or 'false'.",
        });
      }
      filters.followUpRequired = parsed;
    }

    if (minMood !== undefined || maxMood !== undefined) {
      const moodFilter = {};
      if (minMood !== undefined) {
        const parsedMin = Number(minMood);
        if (!Number.isFinite(parsedMin)) {
          return res.status(400).json({
            error: "Bad Request",
            message: "minMood must be numeric.",
          });
        }
        moodFilter.$gte = parsedMin;
      }

      if (maxMood !== undefined) {
        const parsedMax = Number(maxMood);
        if (!Number.isFinite(parsedMax)) {
          return res.status(400).json({
            error: "Bad Request",
            message: "maxMood must be numeric.",
          });
        }
        moodFilter.$lte = parsedMax;
      }
      filters.moodAfterVisit = moodFilter;
    }

    const visits = await populateQuery(
      CheckInVisit.find(filters).sort({ checkInDate: -1 })
    );

    return res.status(200).json(visits);
  } catch (error) {
    return next(error);
  }
};

exports.getCheckInVisitById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid check-in visit id.",
      });
    }

    const visit = await populateQuery(CheckInVisit.findById(id));
    if (!visit) {
      return res.status(404).json({
        error: "Not Found",
        message: "Check-in visit was not found.",
      });
    }

    return res.status(200).json(visit);
  } catch (error) {
    return next(error);
  }
};

exports.createCheckInVisit = async (req, res, next) => {
  try {
    const referenceError = await validateReferencesFromBody(req.body);
    if (referenceError) {
      return res.status(referenceError.status).json({
        error: referenceError.error,
        message: referenceError.message,
      });
    }

    const visit = await CheckInVisit.create(req.body);
    const populatedVisit = await populateQuery(CheckInVisit.findById(visit._id));
    return res.status(201).json(populatedVisit);
  } catch (error) {
    return next(error);
  }
};

exports.updateCheckInVisit = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid check-in visit id.",
      });
    }

    const referenceError = await validateReferencesFromBody(req.body);
    if (referenceError) {
      return res.status(referenceError.status).json({
        error: referenceError.error,
        message: referenceError.message,
      });
    }

    const updatedVisit = await populateQuery(
      CheckInVisit.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      })
    );

    if (!updatedVisit) {
      return res.status(404).json({
        error: "Not Found",
        message: "Check-in visit was not found.",
      });
    }

    return res.status(200).json(updatedVisit);
  } catch (error) {
    return next(error);
  }
};

exports.deleteCheckInVisit = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid check-in visit id.",
      });
    }

    const deletedVisit = await CheckInVisit.findByIdAndDelete(id);
    if (!deletedVisit) {
      return res.status(404).json({
        error: "Not Found",
        message: "Check-in visit was not found.",
      });
    }

    return res.status(200).json({
      message: "Check-in visit deleted successfully.",
      deletedId: deletedVisit._id,
    });
  } catch (error) {
    return next(error);
  }
};
