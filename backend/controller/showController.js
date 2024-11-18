const Show = require("../models/showModel");

const createShowtime = async (req, res) => {
  try {
    // Extract showtime data from request body
    const { movieId, theaterId, showtime } = req.body;

    // Create a new showtime record
    const show = new Show({
      movie: movieId,
      theater: theaterId,
      showtime,
    });

    // Save the showtime to the database
    const savedShow = await show.save();

    res.status(201).json(savedShow);
  } catch (error) {
    console.error("Error creating showtime:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllShowtimes = async (req, res) => {
  try {
    // Retrieve all showtime records
    const shows = await Show.find().populate("movie").populate("theater");
    res.json(shows);
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getShowtimeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the showtime record by ID
    const show = await Show.findById(id).populate("movie").populate("theater");

    if (!show) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    res.json(show);
  } catch (error) {
    console.error("Error fetching showtime:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateShowtime = async (req, res) => {
  try {
    const { id } = req.params;
    const { movieId, theaterId, showtime } = req.body;

    // Find the showtime record by ID and update its fields
    const updatedShow = await Show.findByIdAndUpdate(
      id,
      {
        movie: movieId,
        theater: theaterId,
        showtime,
      },
      { new: true }
    );

    if (!updatedShow) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    res.json(updatedShow);
  } catch (error) {
    console.error("Error updating showtime:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteShowtime = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the showtime record by ID
    await Show.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting showtime:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createShowtime,
  getAllShowtimes,
  getShowtimeById,
  updateShowtime,
  deleteShowtime,
};
