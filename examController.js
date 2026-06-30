const Subject = require("../models/Subject");
const Exam = require("../models/Exam");
const Timetable = require("../models/Timetable");

exports.createSubject = async (req,res) => {

  try {

    const subject = await Subject.create(
      req.body
    );

    res.status(201).json(subject);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};

exports.createExam = async (req,res)=>{

  try{

    const exam = await Exam.create(
      req.body
    );

    res.status(201).json(exam);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};

exports.createTimetable = async (req,res)=>{

  try{

    const timetable =
      await Timetable.create(
        req.body
      );

    res.status(201).json(timetable);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};

exports.getTimetable = async (req,res)=>{

  try{

    const timetable =
      await Timetable.find()
      .populate("exam")
      .populate("subject");

    res.status(200).json(
      timetable
    );

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};