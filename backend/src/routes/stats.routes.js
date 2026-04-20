const express = require("express");

const statsController = require("../controllers/stats.controller");

const router = express.Router();

router.get("/mood-summary", statsController.getMoodSummary);

module.exports = router;
