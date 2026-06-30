const User = require("../models/User");
const Subject = require("../models/Subject");
const Exam = require("../models/Exam");
const HallTicket = require("../models/HallTicket");
const Mark = require("../models/Mark");

exports.getAdminDashboard = async (
  req,
  res
) => {
  try {

    const totalStudents =
      await User.countDocuments({
        role: "student",
      });

    const totalFaculty =
      await User.countDocuments({
        role: "faculty",
      });

    const totalSubjects =
      await Subject.countDocuments();

    const totalExams =
      await Exam.countDocuments();

    const totalHallTickets =
      await HallTicket.countDocuments();

    const totalMarks =
      await Mark.countDocuments();

    const approvedResults =
      await Mark.countDocuments({
        status: "approved",
      });

    const pendingResults =
      await Mark.countDocuments({
        status: "pending",
      });

    res.status(200).json({
      totalStudents,
      totalFaculty,
      totalSubjects,
      totalExams,
      totalHallTickets,
      totalMarks,
      approvedResults,
      pendingResults,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};