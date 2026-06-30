const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  getLogs,
} =
require(
 "../controllers/activityController"
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getLogs
);

module.exports = router;