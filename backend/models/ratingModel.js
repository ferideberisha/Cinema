const mongoose = require("mongoose");

const addRatingSchema = new mongoose.Schema({
  ratedByUser: [
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
      stars: Number,
    },
  ],
});

const RatedBy = mongoose.model("addRating", addRatingSchema);

module.exports = RatedBy;
