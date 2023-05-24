const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateUserToken = (userId) => {
  const userToken = jwt.sign(
    { id: userId, role: "user" },
    process.env.USER_JWT_SECRET,
    { expiresIn: "1h" }
  );
  return userToken;
};

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
          const userToken = generateUserToken(user.id); // Generate a user token

          res.json({
            token: userToken,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              isAdmin: false,
            },
          });
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
        process.env.USER_JWT_SECRET,
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

const user_get = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .select("-password")
    .then((user) => res.json(user));
};

const user_list = (req, res) => {
  User.find()
    .select("-id,-password")
    .then((user) => res.json(user));
};

const user_delete = (req, res) => {
  const id = req.params.id;
  User.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "user deleted",
    });
  });
};

const user_update = (req, res, next) => {
  const user = new User({
    _id: req.params.id,
    firstname: req.body.firstname,
    email: req.body.email,
  });
  User.updateOne({ _id: req.params.id }, user)
    .then((savedUser) => {
      res.status(200).json({
        user,
        message: "one user updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

module.exports = {
  user_register,
  user_login,
  user_get,
  user_list,
  user_delete,
  user_update,
};
