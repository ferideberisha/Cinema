const express = require("express");
const router = express.Router();
const User = require("../../models/staffModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middleware/authMiddleware");
const userController = require("../../controller/userController");

router.post("/register", userController.user_register);
router.post("/login", userController.user_login);

// get user details by id
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
