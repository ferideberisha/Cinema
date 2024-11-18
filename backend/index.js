const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const usersRoute = require("./routes/users/usersRoute");
const staffRoute = require("./routes/staff/staffRoute");
const moviesController = require("./controller/moviesController");
const favoriteController = require("./controller/favoriteController");
const watchlistController = require("./controller/watchlistController");
const ratingController = require("./controller/ratingController");
const reviewController = require("./controller/reviewController");
const authMiddleware = require("./middleware/authMiddleware");
const axios = require("axios");
const tmdb = require("./api/tmdb");
const { MongoClient } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const db = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(db)
  .then((result) => {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    const apiKey = tmdb.tmdbApiKey;

    async function fetchMovies() {
      try {
        await client.connect();
        const db = client.db("test");
        const moviesCollection = db.collection("movies");
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
        const response = await axios.get(url);
        const moviesData = response.data;
        const movies = moviesData.results;

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

          const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
          const detailsResponse = await axios.get(movieDetailsUrl);
          const movieDetails = detailsResponse.data;
          const { runtime, status } = movieDetails;

          const genreNames = await Promise.all(
            genre_ids.map(async (genreId) => {
              const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
              const genreResponse = await axios.get(genreUrl);
              const genres = genreResponse.data.genres;

              const genre = genres.find((g) => g.id === genreId);
              return genre ? genre.name : null;
            })
          );

          const filteredGenreNames = genreNames.filter(
            (genreName) => genreName !== null
          );

          const existingMovie = await moviesCollection.findOne({ title });

          if (existingMovie) {
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
        await client.close();
      }
    }
    fetchMovies().catch(console.error);
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
  })
  .catch((err) => console.log(err));

app.use("/api/users", usersRoute);
app.use("/api/staff", staffRoute);
app.get("/api/movies", moviesController.getAllMovies);
app.get("/api/movies/:id", moviesController.getMovieById);
app.get("/api/movies/status/:status", moviesController.getMoviesByStatus);

// routes for favorite
app.post(
  "/api/users/:userId/like/:movieId",
  authMiddleware,
  favoriteController.likeMovie
);
app.get(
  "/api/users/:userId/liked-movies",
  authMiddleware,
  favoriteController.getLikedMovies
);
app.delete(
  "/api/users/:userId/like/:movieId",
  authMiddleware,
  favoriteController.removeLike
);

// routes for watchlist
app.post(
  "/api/users/:userId/watchlist/:movieId",
  authMiddleware,
  watchlistController.addToWatchlist
);
app.get(
  "/api/users/:userId/watchlist",
  authMiddleware,
  watchlistController.getWatchlist
);
app.delete(
  "/api/users/:userId/watchlist/:movieId",
  authMiddleware,
  watchlistController.removeWatchlist
);

// routes for rating
app.post(
  "/api/users/:userId/rating/:movieId",
  authMiddleware,
  ratingController.addMovieRating
);
app.get(
  "/api/users/:userId/rating/all",
  authMiddleware,
  ratingController.getMovieRating
);
app.delete(
  "/api/users/:userId/rating/:movieId",
  authMiddleware,
  ratingController.deleteMovieRating
);
app.put(
  "/api/users/:userId/rating/:movieId",
  authMiddleware,
  ratingController.updateMovieRating
);

// routes for review
app.post(
  "/api/users/:userId/reviews/:movieId",
  authMiddleware,
  reviewController.addReview
);
app.get(
  "/api/users/:userId/reviews",
  authMiddleware,
  reviewController.getReviews
);
app.delete(
  "/api/users/:userId/reviews/:movieId",
  authMiddleware,
  reviewController.deleteReview
);
