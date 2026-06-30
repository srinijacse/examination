const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  addMarks,
  approveMarks,
  getMyResults,
} =
require("../controllers/marksController");

const {
  validateMark,
} = require("../middleware/validation");


// FACULTY ENTERS MARKS

router.post(
  "/add",
  verifyToken,
  authorizeRoles("faculty"),
  validateMark,
  addMarks
);


// ADMIN APPROVES

router.put(
  "/approve/:id",
  verifyToken,
  authorizeRoles("admin"),
  approveMarks
);


// STUDENT VIEWS RESULT

router.get(
  "/my-results",
  verifyToken,
  authorizeRoles("student"),
  getMyResults
);

module.exports = router;