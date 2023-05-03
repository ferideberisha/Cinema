const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const Staff = require("../models/staffModel");
const staffController = require("../controller/staffController");

router.post("/register", async (req, res) => {
  try {
    const staffExists = await Staff.findOne({ email: req.body.email });
    if (staffExists) {
      return res.send({
        success: false,
        message: "Staff already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newStaff = new Staff(req.body);
    await newStaff.save();
    res.send({ success: true, message: "Staff created successfully!" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const staff = await Staff.findOne({ email: req.body.email });
    if (!staff) {
      return res.send({
        success: false,
        message: "Staff does not exist!",
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password!",
      });
    }

    const token = jwt.sign({ _id: admin._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    res.send({
      success: true,
      message: "Staff logged in successfully!",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/all", staffController.staff_list);
router.get("/:id", staffController.staff_get);
router.put("/:id", staffController.staff_update);
router.delete("/:id", staffController.staff_delete);

module.exports = router;
