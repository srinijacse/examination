const ActivityLog =
require("../models/ActivityLog");

const logActivity = async (
  userId,
  role,
  action
) => {
  try {

    await ActivityLog.create({
      user: userId,
      role,
      action,
    });

  } catch (error) {

    console.log(
      "Activity Log Error:",
      error.message
    );

  }
};

module.exports = logActivity;