const express = require("express");

const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// APPLY LEAVE
router.post(
  "/apply",
  authMiddleware,
  async (req, res) => {
    try {

      const employee =
        await Employee.findOne({
          userId:
            req.user.id,
        });

      const leave =
        new Leave({
          employeeId:
            employee._id,

          startDate:
            req.body.startDate,

          endDate:
            req.body.endDate,

          reason:
            req.body.reason,
        });

      await leave.save();

      res.status(201).json({
        message:
          "Leave applied successfully",

        leave,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// GET LEAVES
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {

      let leaves;

      const query = {};

      // STATUS FILTER
      if (
        req.query.status
      ) {
        query.status =
          req.query.status;
      }

      // ADMIN
      if (
        req.user.role ===
        "admin"
      ) {

        leaves =
          await Leave.find(
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
            });

      } else {

        // EMPLOYEE
        const employee =
          await Employee.findOne({
            userId:
              req.user.id,
          });

        leaves =
          await Leave.find({
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
            });
      }

      res.status(200).json(
        leaves
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);


// APPROVE / REJECT LEAVE
router.patch(
  "/:id/status",

  authMiddleware,

  adminMiddleware,

  async (req, res) => {
    try {

      const leave =
        await Leave.findByIdAndUpdate(
          req.params.id,

          {
            status:
              req.body.status,
          },

          {
            new: true,
          }
        );

      res.status(200).json({
        message:
          "Leave updated",

        leave,
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