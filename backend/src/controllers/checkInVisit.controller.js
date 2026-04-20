const mongoose = require("mongoose");

const CheckInVisit = require("../models/checkInVisit.model");
const Senior = require("../models/senior.model");
const Companion = require("../models/companion.model");
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

function parseBooleanQuery(value, fieldName) {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  throw new ApiError(400, "Bad Request", `${fieldName} must be 'true' or 'false'.`, null);
}

function populateVisitQuery(query) {
  return query
    .populate("seniorId", "fullName city supportLevel")
    .populate("companionId", "fullName relationshipType preferredLanguage");
}

async function ensureReferenceExists(Model, id, fieldName, label) {
  const idError = validateObjectId(id, fieldName);
  if (idError) {
    throw idError;
  }

  const exists = await Model.exists({ _id: id });
  if (!exists) {
    throw new ApiError(404, "Not Found", `${label} was not found for ${fieldName}.`, null);
  }
}

function buildFiltersFromQuery(query) {
  const filters = {};

  if (query.seniorId) {
    filters.seniorId = query.seniorId;
  }

  if (query.companionId) {
    filters.companionId = query.companionId;
  }

  if (query.visitType) {
    if (!VISIT_TYPES.includes(query.visitType)) {
      throw new ApiError(
        400,
        "Bad Request",
        `visitType must be one of: ${VISIT_TYPES.join(", ")}.`,
        null
      );
    }
    filters.visitType = query.visitType;
  }

  if (query.medicationTaken !== undefined) {
    filters.medicationTaken = parseBooleanQuery(query.medicationTaken, "medicationTaken");
  }

  return filters;
}

exports.listCheckInVisits = async (req, res, next) => {
  try {
    if (req.query.seniorId) {
      const seniorError = validateObjectId(req.query.seniorId, "seniorId");
      if (seniorError) {
        return next(seniorError);
      }
    }

    if (req.query.companionId) {
      const companionError = validateObjectId(req.query.companionId, "companionId");
      if (companionError) {
        return next(companionError);
      }
    }

    const filters = buildFiltersFromQuery(req.query);
    const visits = await populateVisitQuery(
      CheckInVisit.find(filters).sort({ checkInDate: -1 })
    );

    return res.status(200).json(visits);
  } catch (error) {
    return next(error);
  }
};

exports.getCheckInVisitById = async (req, res, next) => {
  try {
    const idError = validateObjectId(req.params.id, "id");
    if (idError) {
      return next(idError);
    }

    const visit = await populateVisitQuery(CheckInVisit.findById(req.params.id));
    if (!visit) {
      return next(new ApiError(404, "Not Found", "Check-in visit was not found.", null));
    }

    return res.status(200).json(visit);
  } catch (error) {
    return next(error);
  }
};

exports.createCheckInVisit = async (req, res, next) => {
  try {
    await ensureReferenceExists(Senior, req.body.seniorId, "seniorId", "Senior");
    await ensureReferenceExists(Companion, req.body.companionId, "companionId", "Companion");

    const createdVisit = await CheckInVisit.create(req.body);
    const populatedVisit = await populateVisitQuery(CheckInVisit.findById(createdVisit._id));

    return res.status(201).json(populatedVisit);
  } catch (error) {
    return next(error);
  }
};

exports.updateCheckInVisit = async (req, res, next) => {
  try {
    const idError = validateObjectId(req.params.id, "id");
    if (idError) {
      return next(idError);
    }

    if (req.body.seniorId !== undefined) {
      await ensureReferenceExists(Senior, req.body.seniorId, "seniorId", "Senior");
    }

    if (req.body.companionId !== undefined) {
      await ensureReferenceExists(Companion, req.body.companionId, "companionId", "Companion");
    }

    const updatedVisit = await populateVisitQuery(
      CheckInVisit.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
    );

    if (!updatedVisit) {
      return next(new ApiError(404, "Not Found", "Check-in visit was not found.", null));
    }

    return res.status(200).json(updatedVisit);
  } catch (error) {
    return next(error);
  }
};

exports.deleteCheckInVisit = async (req, res, next) => {
  try {
    const idError = validateObjectId(req.params.id, "id");
    if (idError) {
      return next(idError);
    }

    const deletedVisit = await CheckInVisit.findByIdAndDelete(req.params.id);
    if (!deletedVisit) {
      return next(new ApiError(404, "Not Found", "Check-in visit was not found.", null));
    }

    return res.status(200).json({
      message: "Check-in visit deleted successfully.",
      deletedId: deletedVisit._id,
    });
  } catch (error) {
    return next(error);
  }
};
