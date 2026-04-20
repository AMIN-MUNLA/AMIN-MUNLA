const express = require("express");

const companionController = require("../controllers/companion.controller");

const router = express.Router();

router.get("/", companionController.listCompanions);
router.get("/:id/check-ins", companionController.getCompanionCheckIns);

module.exports = router;
