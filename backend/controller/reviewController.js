const User = require("../models/userModel");
const Movie = require("../models/movieApiModel");
const Review = require("../models/reviewModel");

const addReview = async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const { comment } = req.body;

    // Validate the comment
    if (!comment) {
      return res.status(400).json({ error: "Comment is required." });
    }

    // Find the movie by ID
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Check if the user has already reviewed the movie
    const existingReview = await Review.findOne({
      "reviewedByUser.user": userId,
      "reviewedByUser.movie": movieId,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "User has already reviewed the movie." });
    }

    // Create a new review object or use existing review
    const review = existingReview || new Review();

    // Add the review to the user's reviewedBy array
    const userReview = {
      movieId: movie._id,
      title: movie.title,
      comment,
    };
    user.reviewedBy.push(userReview);
    await user.save();

    // Add the review to the review model
    const reviewedByUser = {
      user: user._id,
      firstname: user.firstname,
      movie: movie._id,
      title: movie.title,
      comment,
      createdAt: new Date(),
    };
    review.reviewedByUser.push(reviewedByUser);
    await review.save();

    res.status(201).json({ message: "Review added successfully.", review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getReviews = async (req, res) => {
  console.log("Inside the /api/users/:userId/reviews/:movieId route");
  const { userId, movieId } = req.params;
  console.log("UserId:", userId);
  console.log("MovieId:", movieId);

  try {
    // Find the user document and populate the reviewedBy field with movie details
    console.log(
      "Fetching the user document and populating the reviewedBy field"
    );
    const user = await User.findById(userId).populate({
      path: "reviewedBy",
      populate: {
        path: "movie",
        select: "title",
        match: { movie: movieId }, // Add the match condition to filter by movieId
      },
    });
    console.log("ID", movieId);

    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ error: "User not found." });
    }

    // Extract the reviews from the user's reviewedBy field
    const reviews = user.reviewedBy.filter((review) => review.movie !== null);

    if (reviews.length === 0) {
      console.log("Reviews not found.");
      return res.status(404).json({ error: "Reviews not found." });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteReview = async (req, res) => {
  console.log("Inside the DELETE /api/users/:userId/reviews/:movieId route");
  const { userId, movieId } = req.params;
  console.log("UserId:", userId);
  console.log("MovieId:", movieId);

  try {
    // Find the user document
    console.log("Fetching the user document");
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ error: "User not found." });
    }

    // Find the index of the review in the user's reviewedBy array
    console.log(
      "Finding the index of the review in the user's reviewedBy array"
    );
    const reviewIndex = user.reviewedBy.findIndex(
      (review) => review.movieId && review.movieId.toString() === movieId
    );

    if (reviewIndex === -1) {
      console.log("Review not found.");
      return res.status(404).json({ error: "Review not found." });
    }

    // Remove the review from the user's reviewedBy array
    console.log("Removing the review from the user's reviewedBy array");
    user.reviewedBy.splice(reviewIndex, 1);
    await user.save();

    // Delete the review document from the Review collection
    console.log("Deleting the review document");
    await Review.findOneAndDelete({ "reviewedByUser.movie": movieId });

    console.log("Review deleted successfully");
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addReview,
  getReviews,
  deleteReview,
};
