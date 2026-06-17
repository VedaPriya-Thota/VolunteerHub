const express = require("express");
const router = express.Router();

const appController =
require("../controllers/applicationController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  allowRoles
} = require("../middleware/roleMiddleware");

router.post(
  "/:eventId/apply",
  verifyToken,
  allowRoles("volunteer"),
  appController.applyForEvent
);

router.get(
  "/my-applications",
  verifyToken,
  appController.getMyApplications
);

router.put(
  "/:id/approve",
  verifyToken,
  allowRoles("admin"),
  appController.approveApplication
);

router.put(
  "/:id/reject",
  verifyToken,
  allowRoles("admin"),
  appController.rejectApplication
);

module.exports = router;