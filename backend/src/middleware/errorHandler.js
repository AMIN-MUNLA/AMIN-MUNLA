function errorHandler(error, _req, res, _next) {
  if (res.headersSent) {
    return;
  }

  if (error.code === 11000) {
    return res.status(409).json({
      error: "Conflict",
      message: "A record with a unique field already exists.",
      details: error.keyValue || null,
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: error.message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      error: "Bad Request",
      message: `Invalid value for field '${error.path}'.`,
    });
  }

  return res.status(500).json({
    error: "Internal Server Error",
    message: "Unexpected server error.",
  });
}

module.exports = errorHandler;
