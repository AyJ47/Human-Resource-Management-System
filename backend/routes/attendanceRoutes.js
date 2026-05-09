const express = require("express");

const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// MARK ATTENDANCE
router.post("/mark", authMiddleware, async (req, res) => {
  try {
    const { employeeId, status } = req.body;

    // Prevent duplicate attendance for the same employee on the same day
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existing = await Attendance.findOne({
      employeeId,
      date: { $gte: today, $lt: tomorrow },
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked for today",
      });
    }

    const attendance = new Attendance({
      employeeId,
      status,
      markedBy: req.user.id,
    });

    await attendance.save();

    res.status(201).json({
      message: "Attendance marked",
      attendance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ATTENDANCE
router.get("/", authMiddleware, async (req, res) => {
  try {
    let attendance;
    const query = {};

    // TODAY FILTER — count all statuses for today, not just "present"
    if (req.query.date === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      query.date = {
        $gte: today,
        $lt: tomorrow,
      };
    }

    // ADMIN sees all attendance
    if (req.user.role === "admin") {
      attendance = await Attendance.find(query)
        .populate({
          path: "employeeId",
          populate: {
            path: "userId",
            select: "name email role",
          },
        })
        .populate("markedBy", "name")
        .sort({ date: -1 });
    } else {
      // EMPLOYEE sees only their own
      const employee = await Employee.findOne({
        userId: req.user.id,
      });

      if (!employee) {
        return res.status(404).json({
          message: "Employee profile not found",
        });
      }

      attendance = await Attendance.find({
        ...query,
        employeeId: employee._id,
      })
        .populate({
          path: "employeeId",
          populate: {
            path: "userId",
            select: "name email role",
          },
        })
        .populate("markedBy", "name")
        .sort({ date: -1 });
    }

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;