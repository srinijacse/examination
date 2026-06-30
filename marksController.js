const Mark = require("../models/Mark");
const User = require("../models/User");
const Subject = require("../models/Subject");
const Exam = require("../models/Exam");
const logActivity =
require("../utils/logActivity");

exports.addMarks = async (req, res) => {
  try {

    const {
      studentId,
      subjectId,
      examId,
      marksObtained
    } = req.body;

    const mark = await Mark.create({
      student: studentId,
      subject: subjectId,
      exam: examId,
      marksObtained,
      enteredBy: req.user.id,
    });

    res.status(201).json({
      message: "Marks added successfully",
      mark,
    });

    // Log the marks addition activity
    await logActivity(req.user.id, req.user.role, "Add Marks");

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.approveMarks = async (req, res) => {
  try {

    const mark = await Mark.findById(
      req.params.id
    );

    if (!mark) {
      return res.status(404).json({
        message: "Mark record not found",
      });
    }

    mark.status = "approved";

    await mark.save();

    res.status(200).json({
      message: "Marks approved",
      mark,
    });

    // Log the marks approval activity
    await logActivity(req.user.id, req.user.role, "Approve Marks");

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

exports.getMyResults = async (
  req,
  res
) => {
  try {

    const results =
      await Mark.find({
        student: req.user.id,
        status: "approved",
      })
        .populate(
          "subject",
          "subjectCode subjectName"
        )
        .populate(
          "exam",
          "examName"
        );

    res.status(200).json(results);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
