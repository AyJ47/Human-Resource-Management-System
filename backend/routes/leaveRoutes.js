const express = require("express");

const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// APPLY LEAVE (employee)
router.post("/apply", authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.user.id,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee profile not found. Contact your admin.",
      });
    }

    const leave = new Leave({
      employeeId: employee._id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      reason: req.body.reason,
    });

    await leave.save();

    res.status(201).json({
      message: "Leave applied successfully",
      leave,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET LEAVES
router.get("/", authMiddleware, async (req, res) => {
  try {
    let leaves;
    const query = {};

    // STATUS FILTER
    if (req.query.status) {
      query.status = req.query.status;
    }

    // ADMIN sees all leaves
    if (req.user.role === "admin") {
      leaves = await Leave.find(query)
        .populate({
          path: "employeeId",
          populate: {
            path: "userId",
            select: "name email role",
          },
        })
        .sort({ createdAt: -1 });
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

      leaves = await Leave.find({
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
        .sort({ createdAt: -1 });
    }

    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// APPROVE / REJECT LEAVE (admin only)
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const leave = await Leave.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );

      if (!leave) {
        return res.status(404).json({ message: "Leave request not found" });
      }

      res.status(200).json({
        message: "Leave updated",
        leave,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;