const Staff = require("../models/staffModel");
const Filma = require("../models/filmaModel");
const Theater = require("../models/theatersModel");
const Event = require("../models/eventsModel");
const axios = require("axios");
const tmdb = require("../api/tmdb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
          res.json({
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
        process.env.jwt_secret,
        { expiresIn: "1d" },
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

const theater_post = (req, res, next) => {
  const theater = new Theater({
    theaterName: req.body.theaterName,
    description: req.body.description,
    address: req.body.address,
    status: req.body.status,
    operatingHours: req.body.operatingHours,
    creator: req.body.creator,
  });

  theater
    .save(theater)
    .then(() => {
      res.status(200).json({
        theater,
        message: "Theater created",
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
    address: req.body.address,
    status: req.body.status,
    operatingHours: req.body.operatingHours,
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

const events_post = (req, res, next) => {
  const event = new Event({
    eventsName: req.body.eventsName,
    description: req.body.description,
    dateRange: req.body.dateRange,
    creator: req.body.creator,
  });

  event
    .save(event)
    .then(() => {
      res.status(200).json({
        event,
        message: "Event created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const events_list = (req, res) => {
  Event.find()
    .populate({ path: "creator", select: "firstname" })
    .then((event) => res.json(event));
};

const events_get = async (req, res) => {
  await Event.findById(req.params.id)
    .populate({ path: "creator", select: "firstname" })
    .then((event) => res.json(event));
};

const events_delete = async (req, res) => {
  await Event.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "theater deleted",
    });
  });
};

const events_update = async (req, res, next) => {
  const event = new Event({
    _id: req.params.id,
    eventsName: req.body.eventsName,
    description: req.body.description,
    dateRange: req.body.dateRange,
    creator: req.body.creator,
  });
  await Event.updateOne({ _id: req.params.id }, event)
    .then(() => {
      res.status(200).json({
        event,
        message: "event updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const filma_post = (req, res, next) => {
  const filma = new Filma({
    title: req.body.title,
    overview: req.body.overview,
    original_language: req.body.original_language,
    release_date: req.body.release_date,
    image: req.body.image,
  });

  filma
    .save(filma)
    .then(() => {
      res.status(200).json({
        filma,
        message: "Albanian movie created",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const filma_list = (req, res) => {
  Filma.find()
    .populate({ path: "creator", select: "firstname" })
    .then((filma) => {
      res.json(filma);
    });
};

const filma_get = async (req, res) => {
  await Filma.findById(req.params.id)
    .populate({ path: "creator", select: "firstname" })
    .then((filma) => res.json(filma));
};

const filma_delete = async (req, res) => {
  await Filma.deleteOne({ _id: req.params.id }).then(() => {
    res.status(200).json({
      message: "Albanian movie deleted",
    });
  });
};

const filma_update = async (req, res, next) => {
  const filma = new Filma({
    _id: req.params.id,
    title: req.body.title,
    overview: req.body.overview,
    original_language: req.body.original_language,
    release_date: req.body.release_date,
    image: req.body.image,
  });
  await Filma.updateOne({ _id: req.params.id }, filma)
    .then(() => {
      res.status(200).json({
        filma,
        message: "Albanian movie updated",
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
  theater_delete,
  theater_get,
  theater_list,
  theater_post,
  theater_update,
  events_delete,
  events_get,
  events_list,
  events_post,
  events_update,
  filma_list,
  filma_get,
  filma_delete,
  filma_post,
  filma_update,
};
