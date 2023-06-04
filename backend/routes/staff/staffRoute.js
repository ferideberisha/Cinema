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

// theater routes
router.post("/theater", staffController.theater_post);
router.put("/theater/:id", staffController.theater_update);
router.delete("/theater/:id", staffController.theater_delete);
router.get("/theater/all", staffController.theater_list);
router.get("/theater/:id", staffController.theater_get);

// event routes
router.post("/events", staffController.events_post);
router.put("/events/:id", staffController.events_update);
router.delete("/events/:id", staffController.events_delete);
router.get("/events/all", staffController.events_list);
router.get("/events/:id", staffController.events_get);

// movie routes
router.post("/movies-url", staffController.filma_post);
router.delete("/movies-url/:id", staffController.filma_delete);
router.get("/movies-url/all", staffController.filma_list);
router.get("/movies-url/:id", staffController.filma_get);
router.put("/movies-url/:id", staffController.filma_update);

// use routes
router.use("/contactus", require("./contactus/contactusRoute.js"));

module.exports = router;
