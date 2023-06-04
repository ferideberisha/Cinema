const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  theaterName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  operatingHours: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
  },
});

module.exports = mongoose.model("theaters", theaterSchema);
