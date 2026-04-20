const express = require("express");

const seniorController = require("../controllers/senior.controller");

const router = express.Router();

router.get("/", seniorController.listSeniors);
router.get("/:id/check-ins", seniorController.getSeniorCheckIns);

module.exports = router;
