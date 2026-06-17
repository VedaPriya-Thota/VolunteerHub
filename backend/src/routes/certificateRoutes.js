const express = require("express");

const router = express.Router();

const certificateController =
require(
 "../controllers/certificateController"
);

const {
 verifyToken
} = require(
 "../middleware/authMiddleware"
);

router.post(
 "/generate",
 verifyToken,
 certificateController
 .generateCertificate
);

module.exports = router;