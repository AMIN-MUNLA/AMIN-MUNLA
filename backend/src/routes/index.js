const express = require("express");

const checkInVisitRoutes = require("./checkInVisit.routes");

const router = express.Router();

router.use("/check-in-visits", checkInVisitRoutes);

module.exports = router;
