const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const authorizeRoles =
require("../middleware/roleMiddleware");

const {
  getAdminDashboard
} = require("../controllers/dashboardController");

router.get(
    "/student",
    verifyToken,
    authorizeRoles("student"),
    (req,res)=>{
        res.json({
            message:"Student Dashboard"
        });
    }
);

router.get(
    "/faculty",
    verifyToken,
    authorizeRoles("faculty"),
    (req,res)=>{
        res.json({
            message:"Faculty Dashboard"
        });
    }
);

router.get(
    "/admin",
    verifyToken,
    authorizeRoles("admin"),
    getAdminDashboard
);

module.exports = router;