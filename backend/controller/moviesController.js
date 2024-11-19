// Import required dependencies and models
const Movie = require("../models/movieApiModel");

// GET /api/movies
const getAllMovies = async (req, res) => {
  try {
    const limit = 50;
    const movies = await Movie.find().limit(limit);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/movies/:id
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching movie" });
  }
};

// GET /api/movies/status/:status
const getMoviesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const movies = await Movie.find({ status });
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies by status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export the controller functions
module.exports = {
  getAllMovies,
  getMovieById,
  getMoviesByStatus,
};
