const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user_register = (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user)
      return res
        .status(409)
        .json({ msg: "User with this email already exists" });

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) return res.status(400).json({ msg: "Invalid data" });

        newUser.password = hash;

        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            process.env.jwt_secret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  isAdmin: false,
                },
              });
            }
          );
        });
      });
    });
  });
};

const user_login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(409).json({ msg: "User does not exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

      jwt.sign(
        { id: user.id },
        process.env.jwt_secret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            token,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              isStaff: false,
            },
          });
        }
      );
    });
  });
};

module.exports = { user_register, user_login };
