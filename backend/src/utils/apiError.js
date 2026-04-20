class ApiError extends Error {
  constructor(status, error, message, details = null) {
    super(message);
    this.status = status;
    this.error = error;
    this.details = details;
  }
}

module.exports = ApiError;
