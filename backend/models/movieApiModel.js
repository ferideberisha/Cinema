const mongoose = require("mongoose");

const movieApiSchema = new mongoose.Schema({
  title: String,
  overview: String,
  genre_ids: [Number],
  original_language: String,
  release_date: Date,
  runtime: Number,
  status: String,
  poster_path: String,
});

mongoose.model("Movie", movieApiSchema);
