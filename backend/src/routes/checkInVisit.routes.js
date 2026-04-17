const express = require("express");

const checkInVisitController = require("../controllers/checkInVisit.controller");
const {
  validateCreateCheckInVisit,
  validateUpdateCheckInVisit,
} = require("../middleware/validateCheckInVisit");

const router = express.Router();

router.get("/", checkInVisitController.listCheckInVisits);
router.get("/:id", checkInVisitController.getCheckInVisitById);
router.post("/", validateCreateCheckInVisit, checkInVisitController.createCheckInVisit);
router.put("/:id", validateUpdateCheckInVisit, checkInVisitController.updateCheckInVisit);
router.delete("/:id", checkInVisitController.deleteCheckInVisit);

module.exports = router;
