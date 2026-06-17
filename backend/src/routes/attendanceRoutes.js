const express = require("express");
const router = express.Router();

const attendanceController =
require("../controllers/attendanceController");

const {
 verifyToken
} = require("../middleware/authMiddleware");

router.post(
 "/checkin",
 verifyToken,
 attendanceController.checkIn
);

router.post(
 "/checkout",
 verifyToken,
 attendanceController.checkOut
);

module.exports = router;