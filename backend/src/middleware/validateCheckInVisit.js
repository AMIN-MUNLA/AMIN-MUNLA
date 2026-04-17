const mongoose = require("mongoose");

const allowedFields = [
  "seniorId",
  "companionId",
  "checkInDate",
  "visitType",
  "moodAfterVisit",
  "durationMinutes",
  "supportAction",
  "followUpRequired",
  "followUpDueDate",
  "notes",
];

const requiredCreateFields = [
  "seniorId",
  "companionId",
  "checkInDate",
  "visitType",
  "moodAfterVisit",
  "durationMinutes",
];

const visitTypeValues = ["call", "home_visit", "video_call"];
const supportActionValues = [
  "none",
  "medicine_reminder",
  "grocery_help",
  "appointment_booking",
  "emergency_contact",
];

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseDate(value) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function validateObjectId(value, fieldName, errors) {
  if (!mongoose.isValidObjectId(value)) {
    errors.push(`${fieldName} must be a valid ObjectId.`);
  }
}

function validatePayloadBody(body, requireAllFields) {
  const errors = [];

  if (!isPlainObject(body)) {
    return ["Request body must be a JSON object."];
  }

  const providedFields = Object.keys(body);
  const unknownFields = providedFields.filter(
    (field) => !allowedFields.includes(field)
  );

  if (unknownFields.length > 0) {
    errors.push(`Unknown fields: ${unknownFields.join(", ")}.`);
  }

  if (requireAllFields) {
    const missingFields = requiredCreateFields.filter((field) => !(field in body));
    if (missingFields.length > 0) {
      errors.push(`Missing required fields: ${missingFields.join(", ")}.`);
    }
  } else if (providedFields.length === 0) {
    errors.push("At least one field must be provided for update.");
  }

  if ("seniorId" in body) {
    validateObjectId(body.seniorId, "seniorId", errors);
  }

  if ("companionId" in body) {
    validateObjectId(body.companionId, "companionId", errors);
  }

  if ("checkInDate" in body) {
    const parsed = parseDate(body.checkInDate);
    if (!parsed) {
      errors.push("checkInDate must be a valid date.");
    } else if (parsed > new Date()) {
      errors.push("checkInDate cannot be in the future.");
    }
  }

  if ("visitType" in body && !visitTypeValues.includes(body.visitType)) {
    errors.push("visitType must be one of: call, home_visit, video_call.");
  }

  if ("moodAfterVisit" in body) {
    const mood = Number(body.moodAfterVisit);
    if (!Number.isInteger(mood) || mood < 1 || mood > 5) {
      errors.push("moodAfterVisit must be an integer between 1 and 5.");
    }
  }

  if ("durationMinutes" in body) {
    const duration = Number(body.durationMinutes);
    if (!Number.isInteger(duration) || duration < 5 || duration > 240) {
      errors.push("durationMinutes must be an integer between 5 and 240.");
    }
  }

  if (
    "supportAction" in body &&
    !supportActionValues.includes(body.supportAction)
  ) {
    errors.push(
      "supportAction must be one of: none, medicine_reminder, grocery_help, appointment_booking, emergency_contact."
    );
  }

  if (
    "followUpRequired" in body &&
    typeof body.followUpRequired !== "boolean"
  ) {
    errors.push("followUpRequired must be true or false.");
  }

  if ("followUpDueDate" in body && body.followUpDueDate !== null) {
    const parsedFollowUp = parseDate(body.followUpDueDate);
    if (!parsedFollowUp) {
      errors.push("followUpDueDate must be a valid date.");
    }
  }

  if ("notes" in body) {
    if (typeof body.notes !== "string") {
      errors.push("notes must be a string.");
    } else if (body.notes.length > 500) {
      errors.push("notes must be 500 characters or fewer.");
    }
  }

  if (body.followUpRequired === true && !("followUpDueDate" in body)) {
    errors.push("followUpDueDate is required when followUpRequired is true.");
  }

  return errors;
}

function buildValidationMiddleware(requireAllFields) {
  return (req, res, next) => {
    const errors = validatePayloadBody(req.body, requireAllFields);

    if (errors.length > 0) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Input validation failed.",
        details: errors,
      });
    }

    return next();
  };
}

exports.validateCreateCheckInVisit = buildValidationMiddleware(true);
exports.validateUpdateCheckInVisit = buildValidationMiddleware(false);
