const mongoose = require("mongoose");

const addedToWatchlistSchema = new mongoose.Schema({
  watchlater: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      firstname: String,
      movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
      },
      title: String,
    },
  ],
});

const collectionName = "watchlist";

const AddWatchlist = mongoose.model(
  "watchlist",
  addedToWatchlistSchema,
  collectionName
);
module.exports = AddWatchlist;
