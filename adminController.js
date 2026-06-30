const User = require("../models/User");
const bcrypt = require("bcryptjs");
const logActivity =
require("../utils/logActivity");


// CREATE STUDENT

exports.createStudent = async (req, res) => {
  try {
    const { name, email, branch, year } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const defaultPassword = "Student@123";

    const hashedPassword = await bcrypt.hash(
      defaultPassword,
      10
    );

    const student = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "student",
      branch,
      year,
    });

    res.status(201).json({
      message: "Student created successfully",
      student,
      defaultPassword,
    });
    // Log the student creation activity
    await logActivity(student._id, student.role, "Create Student");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// CREATE FACULTY

exports.createFaculty = async (req, res) => {
  try {
    const { name, email, department } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const defaultPassword = "Faculty@123";

    const hashedPassword = await bcrypt.hash(
      defaultPassword,
      10
    );

    const faculty = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "faculty",
      department,
    });

    res.status(201).json({
      message: "Faculty created successfully",
      faculty,
      defaultPassword,
    });
    // Log the faculty creation activity
    await logActivity(faculty._id, faculty.role, "Create Faculty");
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL USERS

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};