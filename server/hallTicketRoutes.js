const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  generateHallTicket,
  getMyHallTicket
} =
require(
 "../controllers/hallTicketController"
);


// ADMIN GENERATES

router.post(
  "/generate",
  verifyToken,
  authorizeRoles("admin"),
  generateHallTicket
);


// STUDENT VIEWS

router.get(
  "/my",
  verifyToken,
  authorizeRoles("student"),
  getMyHallTicket
);

module.exports = router;