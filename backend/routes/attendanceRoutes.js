const express = require("express");

const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// MARK ATTENDANCE
router.post(
  "/mark",
  authMiddleware,
  async (req, res) => {
    try {

      const {
        employeeId,
        status,
      } = req.body;

      const attendance =
        new Attendance({
          employeeId,
          status,
          markedBy:
            req.user.id,
        });

      await attendance.save();

      res.status(201).json({
        message:
          "Attendance marked",

        attendance,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// GET ATTENDANCE
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      let attendance;

      const query = {};

      // TODAY FILTER
      if (
        req.query.date ===
        "today"
      ) {

        const today =
          new Date();

        today.setHours(
          0,
          0,
          0,
          0
        );

        const tomorrow =
          new Date(today);

        tomorrow.setDate(
          tomorrow.getDate() + 1
        );

        query.date = {
          $gte: today,
          $lt: tomorrow,
        };

        // ONLY PRESENT
        query.status =
          "present";
      }

      // ADMIN
      if (
        req.user.role ===
        "admin"
      ) {

        attendance =
          await Attendance.find(
            query
          )
            .populate({
              path:
                "employeeId",

              populate: {
                path:
                  "userId",

                select:
                  "name email role",
              },
            })
            .populate(
              "markedBy",
              "name"
            );

      } else {

        // EMPLOYEE
        const employee =
          await Employee.findOne({
            userId:
              req.user.id,
          });

        attendance =
          await Attendance.find({
            ...query,

            employeeId:
              employee._id,
          })
            .populate({
              path:
                "employeeId",

              populate: {
                path:
                  "userId",

                select:
                  "name email role",
              },
            })
            .populate(
              "markedBy",
              "name"
            );
      }

      res.status(200).json(
        attendance
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;