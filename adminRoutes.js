const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const {
  createStudent,
  createFaculty,
  getAllUsers,
} = require("../controllers/adminController");


// CREATE STUDENT

router.post(
  "/create-student",
  verifyToken,
  authorizeRoles("admin"),
  validateStudent,
  createStudent
);


// CREATE FACULTY

router.post(
  "/create-faculty",
  verifyToken,
  authorizeRoles("admin"),
  validateStudent,
  createFaculty
);


// VIEW ALL USERS

router.get(
  "/users",
  verifyToken,
  authorizeRoles("admin"),
  getAllUsers
);

module.exports = router;