const mongoose = require("mongoose");

const filmaSchema = new mongoose.Schema(
  {
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
    image: {
      type: String,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "Staff",
    },
  },
  { timestamps: true }
);

const collectionName = "filma";

const Filma = new mongoose.model("Filma", filmaSchema, collectionName);
module.exports = Filma;
