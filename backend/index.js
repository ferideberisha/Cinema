const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const usersRoute = require("./routes/usersRoute");
const path = require("path");

const app = express();

app.use(express.json());
app.use("/api/users", usersRoute);

app.use(cors());

const db = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Serve static assets from the build directory
app.use(express.static(path.join(__dirname, "client", "build")));

// Define the catch-all route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

mongoose
  .connect(db)
  .then((result) =>
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
  )
  .catch((err) => console.log(err));
