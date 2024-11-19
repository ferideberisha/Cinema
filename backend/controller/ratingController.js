const mongoose = require("mongoose");
const User = require("../models/userModel");
const Movie = require("../models/movieApiModel");
const RatedBy = require("../models/ratingModel");

// POST /api/users/:userId/rating/:movieId
const addMovieRating = async (req, res) => {
  console.log("Inside the /api/users/:userId/rating/:movieId route");
  const { userId, movieId } = req.params;
  const { stars } = req.body;
  console.log("UserId:", userId);
  console.log("MovieId:", movieId);
  console.log("Stars:", stars);

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

    console.log("Updating the user's rating and the movie's ratings array");
    user.rating.push({
      movieId: movie._id,
      title: movie.title,
      stars: stars,
    });

    // Check if the user has already rated the movie
    const existingRatedBy = await RatedBy.findOne({
      "ratedByUser.user": userId,
      "ratedByUser.movie": movieId,
    });

    if (existingRatedBy) {
      console.log("User has already rated the movie.");
      return res
        .status(400)
        .json({ error: "User has already rated the movie." });
    }

    // Update the existing rating document or create a new one
    const rating = existingRatedBy || new RatedBy();
    rating.ratedByUser.push({
      user: userId,
      firstname: user.firstname,
      movie: movieId,
      title: movie.title,
      stars: stars,
    });

    // Save the rating document
    await rating.save();
    await user.save();

    console.log("Movie rating added successfully");

    res.status(200).json({
      message: "Movie rating added successfully.",
      movie: {
        _id: movie._id,
        title: movie.title,
        stars: stars,
      },
    });
  } catch (error) {
    console.log("An error occurred while adding the movie rating:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the movie rating." });
  }
};

// GET /api/users/:userId/rating/all
const getMovieRating = async (req, res) => {
  console.log("Inside the /api/users/:userId/rating/all route");
  const { userId } = req.params;
  console.log("UserId:", userId);

  try {
    // Find the user document and populate the rating field with movie details
    console.log("Fetching the user document and populating the rating field");
    const user = await User.findById(userId).populate({
      path: "rating",
      select: "title stars",
    });

    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ error: "User not found." });
    }

    // Extract the movie rating from the user's rating
    const rating = user.rating;

    if (!rating) {
      console.log("Movie rating not found.");
      return res.status(404).json({ error: "Movie rating not found." });
    }

    res.status(200).json({ rating });
  } catch (error) {
    console.error("Error retrieving movie rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/users/:userId/rating/:movieId
const deleteMovieRating = async (req, res) => {
  console.log("Inside the /api/users/:userId/rating/:movieId route");
  const { userId, movieId } = req.params;
  console.log("UserId:", userId);
  console.log("MovieId:", movieId);

  try {
    // Find the user document
    console.log("Fetching the user document");
    const user = await User.findById(userId);

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      console.log("Invalid movieId.");
      return res.status(400).json({ error: "Invalid movieId." });
    }

    // Find the movie rating for the user
    const ratingIndex = user.rating.findIndex(
      (r) => r.movieId.toString() === movieId
    );

    if (ratingIndex === -1) {
      console.log("Movie rating not found.");
      return res.status(404).json({ error: "Movie rating not found." });
    }

    // Remove the movie rating from the user's rating array
    user.rating.splice(ratingIndex, 1);

    // Find and delete the corresponding RatedBy document
    await RatedBy.findOneAndDelete({
      "ratedByUser.user": userId,
      "ratedByUser.movie": movieId,
    });

    // Save the updated user document
    console.log("Saving the updated user document");
    await user.save();

    console.log("Movie rating removed successfully");
    res.status(200).json({ message: "Movie rating removed successfully." });
  } catch (error) {
    console.log("An error occurred while removing the movie rating:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the movie rating." });
  }
};

// PUT /api/users/:userId/rating/:movieId
const updateMovieRating = async (req, res) => {
  console.log("Inside the /api/users/:userId/rating/:movieId route");
  const { userId, movieId } = req.params;
  const { stars } = req.body;
  console.log("UserId:", userId);
  console.log("MovieId:", movieId);
  console.log("Stars:", stars);

  try {
    // Find the user document
    console.log("Fetching the user document");
    const user = await User.findById(userId);

    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      console.log("Invalid movieId.");
      return res.status(400).json({ error: "Invalid movieId." });
    }

    // Find the movie rating for the user
    const rating = user.rating.find((r) => r.movieId.toString() === movieId);

    if (!rating) {
      console.log("Movie rating not found.");
      return res.status(404).json({ error: "Movie rating not found." });
    }

    console.log("Updating the movie rating");
    rating.stars = stars;

    // Find the corresponding RatedBy document
    const ratedBy = await RatedBy.findOne({
      "ratedByUser.user": userId,
      "ratedByUser.movie": movieId,
    });

    if (!ratedBy) {
      console.log("RatedBy document not found.");
      return res.status(404).json({ error: "RatedBy document not found." });
    }

    // Update the stars field in the RatedBy document
    const userRating = ratedBy.ratedByUser.find(
      (r) => r.user.toString() === userId && r.movie.toString() === movieId
    );
    userRating.stars = stars;

    // Save the updated user and RatedBy documents
    console.log("Saving the updated user and RatedBy documents");
    await user.save();
    await ratedBy.save();

    console.log("Movie rating updated successfully");
    res.status(200).json({ message: "Movie rating updated successfully." });
  } catch (error) {
    console.log("An error occurred while updating the movie rating:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the movie rating." });
  }
};

module.exports = {
  addMovieRating,
  getMovieRating,
  deleteMovieRating,
  updateMovieRating,
};
