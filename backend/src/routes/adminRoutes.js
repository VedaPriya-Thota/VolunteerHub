const express = require("express");
const router = express.Router();

const adminController =
require("../controllers/adminController");

const {
 verifyToken
} = require("../middleware/authMiddleware");

const {
 allowRoles
} = require("../middleware/roleMiddleware");

router.get(
 "/stats",
 verifyToken,
 allowRoles("admin"),
 adminController.getStats
);

router.get(
 "/applications",
 verifyToken,
 allowRoles("admin"),
 adminController.getApplications
);

module.exports = router;