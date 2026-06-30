const mongoose = require("mongoose");

const hallTicketSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["generated"],
      default: "generated",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "HallTicket",
  hallTicketSchema
);