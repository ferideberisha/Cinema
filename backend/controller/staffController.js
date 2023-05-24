const Staff = require("../models/staffModel");
const Movie = require("../models/movieModel");
const Theater = require("../models/theatersModel");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateStaffToken = (staffId) => {
  const staffToken = jwt.sign(
    { id: staffId, role: "staff" },
    process.env.STAFF_JWT_SECRET,
    { expiresIn: "1h" }
  );
  return staffToken;
};

const staff_register = (req, res) => {
  const { firstname, lastname, email, password, isAdmin } = req.body;
  Staff.findOne({ email }).then((staff) => {
    if (staff) return res.status(409).json({ msg: "Email already registered" });

    const newStaff = new Staff({
      firstname,
      lastname,
      email,
      password,
      isAdmin,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newStaff.password, salt, (err, hash) => {
        if (err)
          return res.status(400).json({ msg: "Invalid password received" });

        newStaff.password = hash;

        newStaff.save().then((staff) => {
          const staffToken = generateStaffToken(staff.id); // Generate a staff token

          res.json({
            token: staffToken,
            user: {
              id: staff.id,
              firstname: staff.firstname,
              lastname: staff.lastname,
              email: staff.email,
              isStaff: true,
            },
          });
        });
      });
    });
  });
};

const staff_login = (req, res) => {
  const { email, password } = req.body;

  Staff.findOne({ email }).then((staff) => {
    if (!staff)
      return res.status(409).json({ msg: "staff member does not exist" });

    bcrypt.compare(password, staff.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

      jwt.sign(
        { id: staff.id },
        process.env.STAFF_JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }

          res.json({
            token,
            user: {
              id: staff.id,
              firstname: staff.firstname,
              lastname: staff.lastname,
              email: staff.email,
              isAdmin: staff.isAdmin,
              isStaff: true,
            },
          });
        }
      );
    });
  });
};
const staff_list = (req, res) => {
  Staff.find()
    .select("-password")
    .then((staff) => res.json(staff));
};

const staff_get = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Staff.findById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const staff_delete = (req, res) => {
  const id = req.params.id;

  Staff.deleteOne({ _id: req.params.id }).then((result) => {
    res.status(200).json({
      message: "Staff deleted",
    });
  });
};

const staff_update = (req, res, next) => {
  const staff = new Staff({
    _id: req.params.id,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin,
  });
  Staff.updateOne({ _id: req.params.id }, staff)
    .then(() => {
      res.status(200).json({
        staff,
        message: "One staff member updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const movie_post = (req, res, next) => {
  const movie = new Movie({
    movieName: req.body.movieName,
    description: req.body.description,
    creator: req.body.creator,
  });

  movie
    .save(movie)
    .then(() => {
      res.status(200).json({
        movie,
        message: "movie created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const movie_list = (req, res) => {
  Movie.find()
    .populate({ path: "creator", select: "name" })
    .then((movie) => {
      res.json(department);
    });
};

const movie_get = async (req, res) => {
  await Movie.findById(req.params.id)
    .populate({ path: "creator", select: "name" })
    .then((movie) => res.json(movie));
};

const movie_delete = async (req, res) => {
  await Movie.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Movie deleted",
    });
  });
};

const movie_update = async (req, res, next) => {
  const movie = new Movie({
    _id: req.params.id,
    movieName: req.body.movieName,
    description: req.body.description,
    creator: req.body.creator,
  });
  await Movie.updateOne({ _id: req.params.id }, movie)
    .then(() => {
      res.status(200).json({
        movie,
        message: "movie updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const theater_post = (req, res, next) => {
  const theater = new Theater({
    theaterName: req.body.theaterName,
    description: req.body.description,
    creator: req.body.creator,
  });
  theater
    .save(theater)
    .then(() => {
      res.status(200).json({
        theater,
        message: "theater created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const theater_list = (req, res) => {
  Theater.find()
    .populate({ path: "creator", select: "firstname" })
    .then((theater) => res.json(theater));
};

const theater_get = async (req, res) => {
  await Theater.findById(req.params.id)
    .populate({ path: "creator", select: "firstname" })
    .then((theater) => res.json(theater));
};

const theater_delete = async (req, res) => {
  await Theater.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "theater deleted",
    });
  });
};

const theater_update = async (req, res, next) => {
  const theater = new Theater({
    _id: req.params.id,
    theaterName: req.body.theaterName,
    description: req.body.description,
    creator: req.body.creator,
  });
  await Theater.updateOne({ _id: req.params.id }, theater)
    .then(() => {
      res.status(200).json({
        theater,
        message: "theater updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

module.exports = {
  staff_register,
  staff_login,
  staff_list,
  staff_get,
  staff_delete,
  staff_update,
  movie_list,
  movie_get,
  movie_delete,
  movie_post,
  movie_update,
  theater_delete,
  theater_get,
  theater_list,
  theater_post,
  theater_update,
};
