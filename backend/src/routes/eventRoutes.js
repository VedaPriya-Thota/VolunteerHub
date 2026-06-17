const express = require("express");
const router = express.Router();

const eventController = require("../controllers/eventController");

const {
  verifyToken
} = require("../middleware/authMiddleware");

const {
  allowRoles
} = require("../middleware/roleMiddleware");

router.post(
  "/",
  verifyToken,
  allowRoles("admin"),
  eventController.createEvent
);

router.get("/", eventController.getAllEvents);

router.get("/:id", eventController.getEvent);

router.delete(
  "/:id",
  verifyToken,
  allowRoles("admin"),
  eventController.deleteEvent
);

module.exports = router;