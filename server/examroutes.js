const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  createSubject,
  createExam,
  createTimetable,
  getTimetable
}
=
require("../controllers/examController");


// CREATE SUBJECT

router.post(
  "/subject",
  verifyToken,
  authorizeRoles("admin"),
  createSubject
);


// CREATE EXAM

router.post(
  "/exam",
  verifyToken,
  authorizeRoles("admin"),
  createExam
);


// CREATE TIMETABLE

router.post(
  "/timetable",
  verifyToken,
  authorizeRoles("admin"),
  createTimetable
);


// VIEW TIMETABLE

router.get(
  "/timetable",
  verifyToken,
  getTimetable
);

module.exports = router;