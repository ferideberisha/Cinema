const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    original_language: {
      type: String,
      required: true,
    },
    release_date: {
      type: Date,
      required: true,
    },
    poster_path: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "Staff",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("movies", movieSchema);
