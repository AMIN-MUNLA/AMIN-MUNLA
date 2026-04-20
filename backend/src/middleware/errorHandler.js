function buildValidationDetails(validationError) {
  return Object.values(validationError.errors).map((fieldError) => ({
    field: fieldError.path,
    message: fieldError.message,
  }));
}

function errorHandler(err, _req, res, _next) {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Bad Request",
      message: "Validation failed.",
      details: buildValidationDetails(err),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Bad Request",
      message: `Invalid value for field '${err.path}'.`,
      details: [{ field: err.path, value: err.value }],
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      error: "Conflict",
      message: "Duplicate value violates a unique constraint.",
      details: err.keyValue || null,
    });
  }

  if (err.status && err.error && err.message) {
    return res.status(err.status).json({
      error: err.error,
      message: err.message,
      details: err.details || null,
    });
  }

  return res.status(500).json({
    error: "Internal Server Error",
    message: "Unexpected server error.",
    details: null,
  });
}

module.exports = errorHandler;
