const express = require("express");
const router = express.Router();
const tmdb = require("../../api/tmdb");
const axios = require("axios");
const staffController = require("../../controller/staffController");

// staff auth routes
router.post("/register", staffController.staff_register);
router.post("/login", staffController.staff_login);

// staff routes
router.get("/all", staffController.staff_list);
router.get("/:id", staffController.staff_get);
router.put("/:id", staffController.staff_update);
router.delete("/:id", staffController.staff_delete);

// movie routes
router.post("/movies-url", staffController.movie_post);
router.delete("/movies-url/:id", staffController.movie_delete);
router.get("/movies-url/all", staffController.movie_list);
router.get("/movies-url/:id", staffController.movie_get);
router.put("/movies-url/:id", staffController.movie_update);

// theater routes
router.post("/theater", staffController.theater_post);
router.put("/theater/:id", staffController.theater_update);
router.delete("/theater/:id", staffController.theater_delete);
router.get("/theater/all", staffController.theater_list);
router.get("/theater/:id", staffController.theater_get);

// use routes
router.use("/contactus", require("./contactus/contactusRoute.js"));

module.exports = router;
