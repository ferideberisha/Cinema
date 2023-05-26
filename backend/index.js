const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const usersRoute = require("./routes/users/usersRoute");
const staffRoute = require("./routes/staff/staffRoute");
const Movie = require("./models/movieApiModel");
const axios = require("axios");
const tmdb = require("./api/tmdb");
const { MongoClient } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors());

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
        const db = client.db("cinema_app");
        const moviesCollection = db.collection("movies");

        // Fetch movies from TMDB API
        const currentDate = new Date().toISOString().split("T")[0];
        const nextYearDate = new Date(new Date().getFullYear() + 1, 0, 1)
          .toISOString()
          .split("T")[0];
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${currentDate}&primary_release_date.lte=${nextYearDate}`;
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
          } = movie;

          // Fetch movie details using movie ID
          const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
          const detailsResponse = await axios.get(movieDetailsUrl);
          const movieDetails = detailsResponse.data;

          // Extract runtime and status from movieDetails
          const { runtime, status } = movieDetails;

          // Check if movie already exists in the collection
          const existingMovie = await moviesCollection.findOne({ title });

          if (existingMovie) {
            // Update existing movie document
            await moviesCollection.updateOne(
              { _id: existingMovie._id },
              { $set: { release_date, genre_ids, runtime, status } }
            );
          } else {
            // Insert new movie document
            const movieDocument = {
              title,
              overview,
              genre_ids,
              original_language,
              release_date,
              runtime,
              status,
              poster_path,
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
    // Connect to the "cinema_app" database and retrieve the data
    const movies = await Movie.find();

    // Send the retrieved data as a response
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
