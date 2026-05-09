const express = require("express");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const employeeRoutes = require("./routes/employeeRoutes");

const attendanceRoutes = require("./routes/attendanceRoutes");

const leaveRoutes = require("./routes/leaveRoutes");

dotenv.config();

const app = express();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/employees",
  employeeRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/leaves",
  leaveRoutes
);


// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB connected"
    );
  })
  .catch((err) => {
    console.log(
      "DB connection error:",
      err
    );
  });


// TEST ROUTE
app.get("/", (req, res) => {
  res.send(
    "HRMS Server Running"
  );
});


// SERVER
const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});