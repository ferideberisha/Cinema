const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Filma = require("../models/filmaModel");

const user_register = (req, res) => {
  console.log("Inside USER_REGISTER");
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
          res.json({
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
  console.log("Inside USER_LOGIN");
  const { email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(409).json({ msg: "User does not exist" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

      console.log("JWT Secret:", process.env.jwt_secret);

      jwt.sign(
        { id: user.id },
        process.env.jwt_secret,
        { expiresIn: 31536000 },
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

// const getLikedMovies = async (req, res) => {
//   try {
//     console.log("req.user:", req.user);

//     const user = await User.findById(req.user._id).populate("likedMovies");
//     console.log("User:", user);

//     if (user) {
//       // Return a test response
//       res.json({ message: "Liked movies retrieved successfully" });
//       // Or return the actual liked movies
//       // res.json(user.likedMovies);
//     } else {
//       res.status(404);
//       throw new Error("User not found");
//     }
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

// const addLikedMovie = async (req, res) => {
//   const { movieId } = req.body;
//   console.log("Inside addLikedMovie");
//   console.log("Movie ID:", movieId);

//   try {
//     const user = await User.findById(req.user._id).populate("likedMovies");
//     console.log("User:", user);

//     // Check if the movie is already liked by the user
//     if (user.likedMovies.some((likedMovie) => likedMovie._id.equals(movieId))) {
//       res.status(400);
//       throw new Error("Movie already liked");
//     }

//     // Add the movie to the user's likedMovies array
//     user.likedMovies.push(movieId);
//     await user.save();

//     // Update the likedBy field in the movie document
//     const movie = await Movie.findById(movieId);
//     if (!movie) {
//       res.status(404);
//       throw new Error("Movie not found");
//     }
//     movie.likedBy.push(user._id);
//     await movie.save();

//     res.status(201).json({ message: "Movie added to liked movies" });
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(400).json({ message: error.message });
//   }
// };
// const deleteLikedMovies = async (req, res) => {
//   const movieId = req.params.movieId;
//   console.log("Inside deleteLikedMovies");
//   console.log("Movie ID:", movieId);

//   try {
//     const user = await User.findById(req.user._id);
//     console.log("User:", user);

//     if (!user) {
//       res.status(404);
//       throw new Error("User not found");
//     }

//     // Find the index of the movie in the likedMovies array
//     const movieIndex = user.likedMovies.indexOf(movieId);

//     // If the movie is not found in the likedMovies array
//     if (movieIndex === -1) {
//       res.status(400);
//       throw new Error("Movie not found in liked movies");
//     }

//     // Remove the movie from the likedMovies array
//     user.likedMovies.splice(movieIndex, 1);
//     await user.save();

//     res.json({ message: "Movie removed from liked movies" });
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(400).json({ message: error.message });
//   }
// };

module.exports = {
  user_register,
  user_login,
  user_get,
  user_list,
  user_delete,
  user_update,
  // getLikedMovies,
  // addLikedMovie,
  // deleteLikedMovies,
};
