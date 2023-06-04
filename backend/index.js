const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const usersRoute = require("./routes/users/usersRoute");
const staffRoute = require("./routes/staff/staffRoute");
const Movie = require("./models/movieApiModel");
const User = require("./models/userModel");
const LikedBy = require("./models/likedByModel");
const AddWatchlist = require("./models/watchlistModel");
const RatedBy = require("./models/ratingModel");
const Review = require("./models/reviewModel");
const axios = require("axios");
const tmdb = require("./api/tmdb");
const authMiddleware = require("./middleware/authMiddleware");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const db = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(db)
  .then((result) => {
    // Set up MongoDB connection
    const uri = process.env.MONGO_URI; // Use your own MONGO_URI here
    const client = new MongoClient(uri);

    // Fetch and store movies from TMDB API
    const apiKey = tmdb.tmdbApiKey;

    async function fetchMovies() {
      try {
        // Connect to MongoDB
        await client.connect();
        const db = client.db("test");
        const moviesCollection = db.collection("movies");

        // Fetch movies from TMDB API
        const currentDate = new Date(new Date().getFullYear(), 0, 1)
          .toISOString()
          .split("T")[0];
        const nextYearDate = new Date(new Date().getFullYear() + 1, 0, 1)
          .toISOString()
          .split("T")[0];

        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
        const response = await axios.get(url);
        const moviesData = response.data;
        const movies = moviesData.results;

        // Update or insert movies into MongoDB
        for (const movie of movies) {
          const {
            id,
            title,
            overview,
            genre_ids,
            original_language,
            release_date,
            poster_path,
            backdrop_path,
          } = movie;

          // Fetch movie details using movie ID
          const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
          const detailsResponse = await axios.get(movieDetailsUrl);
          const movieDetails = detailsResponse.data;

          // Extract runtime and status from movieDetails
          const { runtime, status } = movieDetails;

          // Convert genre IDs to genre names
          const genreNames = await Promise.all(
            genre_ids.map(async (genreId) => {
              // Fetch genre details using genre ID
              const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
              const genreResponse = await axios.get(genreUrl);
              const genres = genreResponse.data.genres;

              const genre = genres.find((g) => g.id === genreId);
              return genre ? genre.name : null;
            })
          );

          // Remove null values from the genre names array
          const filteredGenreNames = genreNames.filter(
            (genreName) => genreName !== null
          );

          // Check if movie already exists in the collection
          const existingMovie = await moviesCollection.findOne({ title });

          if (existingMovie) {
            // Update existing movie document
            await moviesCollection.updateOne(
              { _id: existingMovie._id },
              {
                $set: {
                  release_date,
                  genre_ids: filteredGenreNames.join(", "),
                  runtime,
                  status,
                  backdrop_path,
                },
              }
            );
          } else {
            // Insert new movie document
            const movieDocument = {
              title,
              overview,
              genre_ids: filteredGenreNames.join(", "),
              original_language,
              release_date,
              runtime,
              status,
              poster_path,
              backdrop_path,
              likedBy: [],
              addedToWatchlist: [],
              addedRating: [],
              addedReview: [],
            };
            await moviesCollection.insertOne(movieDocument);
          }
        }

        console.log("Movies successfully fetched and updated in MongoDB.");
      } catch (error) {
        console.error("Error fetching and updating movies:", error);
      } finally {
        // Close the MongoDB connection
        await client.close();
      }
    }

    // Call fetchMovies function to fetch and update movies when the server starts
    fetchMovies().catch(console.error);

    // Start the server
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
  })
  .catch((err) => console.log(err));

app.use("/api/users", usersRoute);
app.use("/api/staff", staffRoute);

app.get("/api/movies", async (req, res) => {
  try {
    const limit = 50;
    const movies = await Movie.find().limit(limit);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching movie" });
  }
});

app.get("/api/movies/:id/poster/:path", async (req, res) => {
  const imagePath = req.params.path;
  console.log("Searching for movie with poster_path:", imagePath);

  try {
    // Find the movie document based on the imagePath
    const movie = await Movie.findOne({
      poster_path: new RegExp(imagePath, "i"),
    });
    console.log("Found movie:", movie);

    const imageData = movie.poster_path;
    res.set("Content-Type", "image/jpeg");
    res.send(imageData);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/movies/:id/backdrop/:path", async (req, res) => {
  const backdropPath = req.params.path;
  console.log("Searching for movie with backdrop_path:", backdropPath);

  try {
    // Find the movie document based on the backdropPath
    const movie = await Movie.findOne({
      backdrop_path: new RegExp(backdropPath, "i"),
    });
    console.log("Found movie:", movie);

    const backdropData = movie.backdrop_path;
    res.set("Content-Type", "image/jpeg");
    res.send(backdropData);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/movies/status/:status", async (req, res) => {
  try {
    const { status } = req.params;
    const movies = await Movie.find({ status });
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies by status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(
  "/api/users/:userId/like/:movieId",
  authMiddleware,
  async (req, res) => {
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
  }
);

app.get("/api/users/:userId/liked-movies", authMiddleware, async (req, res) => {
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
});

app.delete(
  "/api/users/:userId/like/:movieId",
  authMiddleware,
  async (req, res) => {
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
  }
);

app.post(
  "/api/users/:userId/watchlist/:movieId",
  authMiddleware,
  async (req, res) => {
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
  }
);

app.get("/api/users/:userId/watchlist", authMiddleware, async (req, res) => {
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
});

app.delete(
  "/api/users/:userId/watchlist/:movieId",
  authMiddleware,
  async (req, res) => {
    console.log(
      "Inside the DELETE /api/users/:userId/watchlist/:movieId route"
    );
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
      // Find and delete the specific document from the likedBy collection
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
  }
);

//rating
app.post(
  "/api/users/:userId/rating/:movieId",
  authMiddleware,
  async (req, res) => {
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
  }
);

// Get movie rating
app.get("/api/users/:userId/rating/all", authMiddleware, async (req, res) => {
  console.log("Inside the /api/users/:userId/rating route");
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
    const rating = user.rating[0];

    if (!rating) {
      console.log("Movie rating not found.");
      return res.status(404).json({ error: "Movie rating not found." });
    }

    res.status(200).json({ rating });
  } catch (error) {
    console.error("Error retrieving movie rating:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete movie rating
app.delete(
  "/api/users/:userId/rating/:movieId",
  authMiddleware,
  async (req, res) => {
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
  }
);

// Update movie rating
app.put(
  "/api/users/:userId/rating/:movieId",
  authMiddleware,
  async (req, res) => {
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

      // Save the updated user document
      console.log("Saving the updated user document");
      await user.save();

      console.log("Movie rating updated successfully");
      res.status(200).json({ message: "Movie rating updated successfully." });
    } catch (error) {
      console.log("An error occurred while updating the movie rating:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the movie rating." });
    }
  }
);

//review

app.post(
  "/api/users/:userId/reviews/:movieId",
  authMiddleware,
  async (req, res) => {
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
  }
);

app.get(
  "/api/users/:userId/reviews/:movieId",
  authMiddleware,
  async (req, res) => {
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
  }
);

app.delete(
  "/api/users/:userId/reviews/:movieId",
  authMiddleware,
  async (req, res) => {
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
  }
);
