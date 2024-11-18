const mongoose = require("mongoose");
const User = require("../models/userModel");
const Movie = require("../models/movieApiModel");
const AddWatchlist = require("../models/watchlistModel");

// POST /api/users/:userId/watchlist/:movieId
const addToWatchlist = async (req, res) => {
  console.log("Inside the /api/users/:userId/watchlist/:movieId route");
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
      "Updating the user's watchlist and the movie's addedToWatchlist array"
    );
    user.watchlist.push({
      movieId: movie._id,
      title: movie.title,
      original_language: movie.original_language,
      release_date: movie.release_date,
      runtime: movie.runtime,
    });

    // Check if the movie has already been added to the user's watchlist
    const existingWatchlist = await AddWatchlist.findOne({
      "watchlater.user": userId,
      "watchlater.movie": movieId,
    });

    if (existingWatchlist) {
      console.log("Movie already added to watchlist.");
      return res
        .status(400)
        .json({ error: "Movie already added to watchlist." });
    }

    // Create a new AddWatchlist entry
    const watchlistEntry = new AddWatchlist({
      watchlater: {
        user: userId,
        firstname: user.firstname,
        movie: movieId,
        title: movie.title,
      },
    });

    // Save the watchlist entry
    await watchlistEntry.save();

    // Save the updated user document
    console.log("Saving the updated user document");
    await user.save();

    console.log("Movie added to watchlist successfully");
    res.status(200).json({
      message: "Movie added to watchlist successfully.",
      movie: {
        _id: movie._id,
        title: movie.title,
        original_language: movie.original_language,
        release_date: movie.release_date,
        runtime: movie.runtime,
      },
    });
  } catch (error) {
    console.log(
      "An error occurred while adding the movie to watchlist:",
      error
    );
    res.status(500).json({
      error: "An error occurred while adding the movie to watchlist.",
    });
  }
};

// GET /api/users/:userId/watchlist
const getWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by their ID and populate the watchlist field with movie details
    const user = await User.findById(userId).populate({
      path: "watchlist",
      select: "title original_language release_date runtime",
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Extract the movies from the user's watchlist
    const watchlist = user.watchlist;

    res.status(200).json({ watchlist });
  } catch (error) {
    console.error("Error retrieving watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /api/users/:userId/watchlist/:movieId
const removeWatchlist = async (req, res) => {
  console.log("Inside the DELETE /api/users/:userId/watchlist/:movieId route");
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
      "Removing the movie from user's watchlist and movie's addedToWatchlist array"
    );
    const userWatchlistIndex = user.watchlist.findIndex(
      (item) => item.movieId.toString() === movieId
    );
    if (userWatchlistIndex !== -1) {
      user.watchlist.splice(userWatchlistIndex, 1);
    }

    const movieWatchlistIndex = movie.addedToWatchlist.findIndex(
      (userId) => userId.toString() === userId
    );
    if (movieWatchlistIndex !== -1) {
      movie.addedToWatchlist.splice(movieWatchlistIndex, 1);
    }

    // Find and delete the specific document from the AddWatchlist collection
    console.log("Deleting the watchlist document");
    await AddWatchlist.deleteOne({
      "watchlater.user": userId,
      "watchlater.movie": movieId,
    });
    console.log("Watchlist document deleted successfully");

    // Save the updated user and movie documents
    console.log("Saving the updated user and movie documents");
    await user.save();
    await movie.save();

    console.log("Movie removed from watchlist successfully");
    res
      .status(200)
      .json({ message: "Movie removed from watchlist successfully." });
  } catch (error) {
    console.log(
      "An error occurred while removing the movie from watchlist:",
      error
    );
    res.status(500).json({
      error: "An error occurred while removing the movie from watchlist.",
    });
  }
};

// Export the controller functions
module.exports = {
  addToWatchlist,
  getWatchlist,
  removeWatchlist,
};
