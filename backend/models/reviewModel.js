const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewedByUser: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      firstname: String,
      movie: {
        type: Schema.Types.ObjectId,
        ref: "movies",
      },
      title: String,
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
