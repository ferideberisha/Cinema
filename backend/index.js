const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
app.use(cors());

const db = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(db)
  .then((result) =>
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
  )
  .catch((err) => console.log(err));