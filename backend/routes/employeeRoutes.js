const express = require("express");

const Employee = require("../models/Employee");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const employees =
        await Employee.find()
          .populate(
            "userId",
            "name email role"
          );

      res.status(200).json(
        employees
      );
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const employee =
        new Employee(
          req.body
        );

      await employee.save();

      res.status(201).json({
        message:
          "Employee created",
        employee,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const employee =
        await Employee.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json({
        message:
          "Employee updated",
        employee,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      await Employee.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        message:
          "Employee deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;