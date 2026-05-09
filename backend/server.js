const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

const employeeRoutes = require(
    "./routes/employeeRoutes"
  );
  
  const attendanceRoutes = require(
    "./routes/attendanceRoutes"
  );
  
  const leaveRoutes = require(
    "./routes/leaveRoutes"
  );



dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

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

// Middleware

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });

// Basic Route
app.get("/", (req, res) => {
  res.send("HRMS Server Running");
});

// Server Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});