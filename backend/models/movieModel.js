const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
  },
});

const collectionName = "movie";

const Movie = new mongoose.model("Movie", movieSchema, collectionName);
module.exports = Movie;
