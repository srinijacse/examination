const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "published"
      ],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Exam",
  examSchema
);