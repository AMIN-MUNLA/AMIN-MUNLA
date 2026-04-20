const express = require("express");

const checkInVisitRoutes = require("./checkInVisit.routes");
const seniorRoutes = require("./seniors.routes");
const companionRoutes = require("./companions.routes");
const statsRoutes = require("./stats.routes");

const router = express.Router();

router.use("/check-in-visits", checkInVisitRoutes);
router.use("/seniors", seniorRoutes);
router.use("/companions", companionRoutes);
router.use("/stats", statsRoutes);

module.exports = router;
