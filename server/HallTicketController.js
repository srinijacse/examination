const HallTicket = require("../models/HallTicket");
const User = require("../models/User");
const Exam = require("../models/Exam");
const Timetable = require("../models/Timetable");
const logActivity =
require("../utils/logActivity");

exports.generateHallTicket = async (
  req,
  res
) => {
  try {

    const { studentId, examId } =
      req.body;

    const student =
      await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const exam =
      await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found",
      });
    }

    const existing =
      await HallTicket.findOne({
        student: studentId,
        exam: examId,
      });

    if (existing) {
      return res.status(400).json({
        message:
          "Hall Ticket already exists",
      });
    }

    const hallTicket =
      await HallTicket.create({
        student: studentId,
        exam: examId,
      });

    res.status(201).json({
      message:
        "Hall Ticket Generated",
      hallTicket,
    });

    // Log the hall ticket generation activity
    await logActivity(req.user.id, req.user.role, "Generate Hall Ticket");

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getMyHallTicket = async (
  req,
  res
) => {
  try {

    const hallTickets =
      await HallTicket.find({
        student: req.user.id,
      })
        .populate(
            "student",
            "-password"
            )
        .populate("exam");

    res.status(200).json(
      hallTickets
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

