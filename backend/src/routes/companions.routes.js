const express = require("express");

const companionController = require("../controllers/companion.controller");

const router = express.Router();

router.get("/:id/check-ins", companionController.listCompanionCheckIns);

module.exports = router;
