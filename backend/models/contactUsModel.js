const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactUsSchema = new mongoose.Schema({
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
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  },
  archive: {
    type: Boolean,
    required: true,
  },
});

const ContactUs = new mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUs;
