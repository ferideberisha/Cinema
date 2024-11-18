const express = require("express");
const router = express.Router();
const {
  createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtime,
  deleteShowtime,
} = require("../../../controller/showController");

router.post("/add-show", createShowtime);
router.get("/get-show", getAllShowtimes);
router.get("/get-show-id/:id", getShowtimeById);
router.put("/update-show/:id", updateShowtime);
router.delete("/delete-show/:id", deleteShowtime);

module.exports = router;
