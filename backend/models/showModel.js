const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true,
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theaters",
    required: true,
  },
  showtime: {
    type: Date,
    required: true,
  },
});

const Show = mongoose.model("Show", showSchema);

module.exports = Show;
