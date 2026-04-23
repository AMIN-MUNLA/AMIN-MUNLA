const express = require("express");

const checkInVisitRoutes = require("./checkInVisit.routes");
const seniorRoutes = require("./seniors.routes");
const companionRoutes = require("./companions.routes");
const statsRoutes = require("./stats.routes");
const requireDatabase = require("../middleware/requireDatabase");

const router = express.Router();

router.use("/check-in-visits", requireDatabase, checkInVisitRoutes);
router.use("/seniors", requireDatabase, seniorRoutes);
router.use("/companions", requireDatabase, companionRoutes);
router.use("/stats", requireDatabase, statsRoutes);

module.exports = router;
