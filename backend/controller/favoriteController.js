const mongoose = require("mongoose");
const User = require("../models/userModel");
const Movie = require("../models/movieApiModel");
const LikedBy = require("../models/likedByModel");

// POST /api/users/:userId/like/:movieId
const likeMovie = async (req, res) => {
  console.log("Inside the /api/users/:userId/like/:movieId route");
  const { userId, movieId } = req.params;
  console.log("UserId:", userId);
  console.log("MovieId:", movieId);

  try {
    // Find the user and movie documents
    console.log("Fetching the user and movie documents");
    const user = await User.findById(userId);

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      console.log("Invalid movieId.");
      return res.status(400).json({ error: "Invalid movieId." });
    }

    // Find the movie document
    const movie = await Movie.findById(movieId);

    // Check if the movie document exists
    if (!movie) {
      console.log("Movie not found.");
      return res.status(404).json({ error: "Movie not found." });
    }

    console.log("Updating the user's likes and the movie's likedBy array");
    user.likedMovies.push({
      movieId: movie._id,
      title: movie.title,
      original_language: movie.original_language,
      release_date: movie.release_date,
      runtime: movie.runtime,
    });

    // Check if the user has already liked the movie
    const existingLikedBy = await LikedBy.findOne({
      user: userId,
      movie: movieId,
    });

    if (existingLikedBy) {
      console.log("User has already liked the movie.");
      return res
        .status(400)
        .json({ error: "User has already liked the movie." });
    }

    // Create a new LikedBy entry
    const likedBy = new LikedBy({
      likedByUser: [
        {
          user: userId,
          firstname: user.firstname,
          movie: movieId,
          title: movie.title,
        },
      ],
    });

    // Save the likedBy entry
    await likedBy.save();

    // Save the updated user document
    console.log("Saving the updated user document");
    await user.save();

    console.log("Movie liked successfully");
    res.status(200).json({
      message: "Movie liked successfully.",
      movie: {
        _id: movie._id,
        title: movie.title,
        original_language: movie.original_language,
        release_date: movie.release_date,
        runtime: movie.runtime,
      },
    });
  } catch (error) {
    console.log("An error occurred while liking the movie:", error);
    res
      .status(500)
      .json({ error: "An error occurred while liking the movie." });
  }
};

// GET /api/users/:userId/liked-movies
const getLikedMovies = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by their ID and populate the likedMovies field with movie details
    const user = await User.findById(userId).populate({
      path: "likedMovies",
      select: "title original_language release_date runtime",
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Extract the liked movies from the user document
    const likedMovies = user.likedMovies;

    res.status(200).json({ likedMovies });
  } catch (error) {
    console.error("Error retrieving liked movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/users/:userId/like/:movieId
const removeLike = async (req, res) => {
  console.log("Inside the DELETE /api/users/:userId/like/:movieId route");
  const { userId, movieId } = req.params;
  console.log("UserId:", userId);
  console.log("MovieId:", movieId);

  try {
    // Find the user and movie documents
    console.log("Fetching the user and movie documents");
    const user = await User.findById(userId);

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      console.log("Invalid movieId.");
      return res.status(400).json({ error: "Invalid movieId." });
    }

    // Find the movie document
    const movie = await Movie.findById(movieId);

    // Check if the movie document exists
    if (!movie) {
      console.log("Movie not found.");
      return res.status(404).json({ error: "Movie not found." });
    }

    console.log(
      "Removing the like from user's likedMovies array and movie's likedBy array"
    );

    // Remove the movieId from the user's likedMovies array
    const userLikeIndex = user.likedMovies.findIndex(
      (like) => like.movieId.toString() === movieId
    );
    if (userLikeIndex !== -1) {
      user.likedMovies.splice(userLikeIndex, 1);
    }

    // Remove the userId from the movie's likedBy array
    const movieLikeIndex = movie.likedBy.findIndex(
      (likedBy) => likedBy.user.toString() === userId
    );
    if (movieLikeIndex !== -1) {
      movie.likedBy.splice(movieLikeIndex, 1);
    }

    // Find and delete the specific document from the likedBy collection
    console.log("Deleting the likedBy document");
    await LikedBy.deleteOne({
      "likedByUser.user": userId,
      "likedByUser.movie": movieId,
    });
    console.log("LikedBy document deleted successfully");

    // Save the updated user and movie documents
    console.log("Saving the updated user and movie documents");
    await user.save();
    await movie.save();

    console.log("Like removed successfully");
    res.status(200).json({ message: "Like removed successfully." });
  } catch (error) {
    console.log("An error occurred while removing the like:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the like." });
  }
};

module.exports = { likeMovie, getLikedMovies, removeLike };
