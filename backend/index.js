const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const path = require("path");
const usersRoute = require("./routes/usersRoute");
const staffRoute = require("./routes/staffRoute");

const app = express();

app.use(express.json());

app.use(cors());

const db = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

app.use("/api/users", usersRoute);
app.use("/api/staff", staffRoute);

mongoose
  .connect(db)
  .then((result) =>
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
  )
  .catch((err) => console.log(err));
