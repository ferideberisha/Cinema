const mongoose = require("mongoose");

const likedBySchema = new mongoose.Schema({
  likedByUser: [
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

const collectionName = "likedBy";
const LikedBy = mongoose.model("likedBy", likedBySchema, collectionName);
module.exports = LikedBy;
