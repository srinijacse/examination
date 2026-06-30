const ActivityLog =
require("../models/ActivityLog");

exports.getLogs = async (
  req,
  res
) => {
  try {

    const logs =
      await ActivityLog.find()
      .populate(
        "user",
        "name email role"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(logs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};