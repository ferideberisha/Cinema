const messages = require("../models/contactUsModel");

const add_message = (req, res) => {
  const { firstname, lastname, email, message, read, archive } = req.body;
  console.log(req.body);

  const newMessage = new messages({
    firstname,
    lastname,
    email,
    message,
    read,
    archive,
  });
  newMessage
    .save(newMessage)
    .then(() => {
      res.status(200).json({
        newMessage,
        message: "Message sent",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const message_list = (req, res) => {
  messages
    .find()
    .select("-id")
    .then((message) => {
      res.json(message);
    });
};

const archive = (req, res) => {
  messages
    .updateOne({ _id: req.params.id }, { archive: true })
    .then((archived) => {
      res.status(200).json({
        message: "one test updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const read = (req, res) => {
  messages
    .updateOne({ _id: req.params.id }, { read: true })
    .then((read) => {
      res.status(200).json({
        message: "one test updated",
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
    });
};

const numberOfMessages = (req, res) => {
  messages.countDocuments({ read: false }).then((count) => res.json(count));
};

module.exports = {
  add_message,
  message_list,
  archive,
  read,
  numberOfMessages,
};
