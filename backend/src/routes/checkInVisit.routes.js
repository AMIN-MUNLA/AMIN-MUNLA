const express = require("express");

const checkInVisitController = require("../controllers/checkInVisit.controller");

const router = express.Router();

router.get("/", checkInVisitController.listCheckInVisits);
router.get("/:id", checkInVisitController.getCheckInVisitById);
router.post("/", checkInVisitController.createCheckInVisit);
router.put("/:id", checkInVisitController.updateCheckInVisit);
router.delete("/:id", checkInVisitController.deleteCheckInVisit);

module.exports = router;
