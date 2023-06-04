const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  eventsName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateRange: {
    type: [Date],
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
  },
});

module.exports = mongoose.model("events", eventsSchema);
