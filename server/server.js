const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();


// Middleware

app.use(cors());

app.use(express.json());


// MongoDB Connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

  const helmet = require("helmet");

app.use(helmet());

const rateLimit =
require("express-rate-limit");

const loginLimiter =
rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message:
    "Too many login attempts",
});
app.use("/api/auth/login", loginLimiter);


// Routes

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.use(
  "/api/exams",
  require("./routes/examRoutes")
);

app.use(
  "/api/hall-tickets",
  require("./routes/hallTicketRoutes")
);

app.use(
  "/api/marks",
  require("./routes/marksRoutes")
);

app.use(
  "/api/logs",
  require("./routes/activityRoutes")
);

// Home Route

app.get("/", (req, res) => {
  res.send("Examination Management System API Running");
});


// Server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});

