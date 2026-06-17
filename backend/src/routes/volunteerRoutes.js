const express = require("express");
const router = express.Router();

const volunteerController =
require("../controllers/volunteerController");

const {
  verifyToken,
} = require("../middleware/authMiddleware");

router.get(
  "/profile",
  verifyToken,
  volunteerController.getProfile
);

router.put(
  "/profile",
  verifyToken,
  volunteerController.updateProfile
);

module.exports = router;