const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    likedMovies: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "movies",
        },
        title: String,
        original_language: String,
        release_date: Date,
        runtime: Number,
      },
    ],
    watchlist: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "movies",
        },
        title: String,
        original_language: String,
        release_date: Date,
        runtime: Number,
      },
    ],
    rating: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "movies",
        },
        title: String,
        stars: Number,
      },
    ],
    reviewedBy: [
      {
        movieId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "movies",
        },
        title: String,
        comment: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
