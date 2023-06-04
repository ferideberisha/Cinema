const mongoose = require("mongoose");

const movieApiSchema = new mongoose.Schema({
  title: String,
  overview: String,
  genre_ids: String,
  original_language: String,
  release_date: Date,
  runtime: Number,
  status: String,
  poster_path: String,
  backdrop_path: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  addedToWatchlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  addedRating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  addedReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

module.exports = mongoose.model("movies", movieApiSchema);
