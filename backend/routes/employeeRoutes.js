const express = require("express");
const bcrypt = require("bcryptjs");

const Employee = require("../models/Employee");
const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// GET all employees (admin sees all, employee sees all for directory)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find().populate(
      "userId",
      "name email role"
    );
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET current employee's own record
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOne({ userId: req.user.id }).populate(
      "userId",
      "name email role"
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee profile not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE employee (admin only) — creates both User account + Employee profile
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, email, password, department, position, phone, joinDate, salary } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists",
      });
    }

    // Create User account
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "employee",
    });
    await user.save();

    // Create Employee profile linked to the User
    const employee = new Employee({
      userId: user._id,
      department,
      position,
      phone,
      joinDate,
      salary,
    });
    await employee.save();

    // Return populated employee
    const populatedEmployee = await Employee.findById(employee._id).populate(
      "userId",
      "name email role"
    );

    res.status(201).json({
      message: "Employee created successfully",
      employee: populatedEmployee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE employee profile (admin only)
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { department, position, phone, joinDate, salary } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { department, position, phone, joinDate, salary },
      { new: true }
    ).populate("userId", "name email role");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated",
      employee,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE employee + associated User, Attendance, Leave records (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Clean up all related data
    await Attendance.deleteMany({ employeeId: employee._id });
    await Leave.deleteMany({ employeeId: employee._id });
    await User.findByIdAndDelete(employee.userId);
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee and all related data deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;