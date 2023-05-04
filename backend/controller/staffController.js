const Staff = require("../models/staffModel");
const Movie = require("../models/movieModel");

const staff_list = (req, res) => {
  Staff.find().then((staff) => res.json(staff));
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

module.exports = {
  staff_list,
  staff_get,
  staff_delete,
  staff_update,
  movie_list,
  movie_get,
  movie_delete,
  movie_post,
  movie_update,
};
