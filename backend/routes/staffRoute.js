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
  const { email, password } = req.body;
  try {
    const staff = await Staff.findOne({ email });
    if (!staff) {
      return res.send({
        success: false,
        message: "Staff does not exist!",
      });
    }

    bcrypt.compare(password, staff.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
    });

    const token = jwt.sign(
      { _id: staff._id },
      process.env.jwt_secret,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) throw err;

        res.json({
          token,
          user: {
            id: staff.id,
            firstname: staff.firstname,
            lastname: staff.lastname,
            email: staff.email,
            isAdmin: true,
          },
        });
      }
    );

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

// staff routes
router.get("/all", staffController.staff_list);
router.get("/:id", staffController.staff_get);
router.put("/:id", staffController.staff_update);
router.delete("/:id", staffController.staff_delete);

// movie routes
router.post("/movie", staffController.movie_post);
router.get("/movie/all", staffController.movie_list);
router.get("/movie/:id", staffController.movie_get);
router.delete("/movie/:id", staffController.movie_delete);
router.put("/movie/:id", staffController.movie_update);

module.exports = router;
