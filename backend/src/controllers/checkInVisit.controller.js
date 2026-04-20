function notImplemented(res, endpointName) {
  return res.status(501).json({
    error: "Not Implemented",
    message: `${endpointName} will be implemented during Days 3-5.`,
  });
}

exports.listCheckInVisits = (_req, res) => notImplemented(res, "GET /check-in-visits");

exports.getCheckInVisitById = (_req, res) =>
  notImplemented(res, "GET /check-in-visits/:id");

exports.createCheckInVisit = (_req, res) =>
  notImplemented(res, "POST /check-in-visits");

exports.updateCheckInVisit = (_req, res) =>
  notImplemented(res, "PUT /check-in-visits/:id");

exports.deleteCheckInVisit = (_req, res) =>
  notImplemented(res, "DELETE /check-in-visits/:id");
