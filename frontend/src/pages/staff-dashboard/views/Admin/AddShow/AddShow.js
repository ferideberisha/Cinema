import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { DateTimePicker, TimePicker } from "@mui/lab";
import axios from "../../../../../api/axios";

const AddShowtimeForm = () => {
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");

  useEffect(() => {
    // Fetch movies from the backend API
    axios
      .get("/api/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        // Display an error message to the user
        alert(
          "An error occurred while fetching movies. Please try again later."
        );
      });

    // Fetch theaters from the backend API
    axios
      .get("/api/staff/theater/all")
      .then((response) => {
        setTheaters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching theaters:", error);
        // Display an error message to the user
        alert(
          "An error occurred while fetching theaters. Please try again later."
        );
      });
  }, []);

  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value);
  };

  const handleTheaterChange = (event) => {
    setSelectedTheater(event.target.value);
  };

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedMovieId = movies.find(
      (movie) => movie.title === selectedMovie
    )?._id;
    const selectedTheaterId = theaters.find(
      (theater) => theater.theaterName === selectedTheater
    )?._id;

    if (!selectedMovieId || !selectedTheaterId) {
      console.log("Invalid movie or theater selection");
      return;
    }

    const data = {
      movieId: selectedMovieId,
      theaterId: selectedTheaterId,
      showtime: selectedDateTime,
    };

    try {
      await axios.post("/api/staff/shows/add-show", data);
      setSelectedMovie("");
      setSelectedTheater("");
      setSelectedDateTime("");
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }

    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginLeft: "3rem", marginTop: "4.5rem" }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h6">Add Showtime</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Movie</InputLabel>
            <Select value={selectedMovie} onChange={handleMovieChange} required>
              <MenuItem value="" disabled>
                Select a movie
              </MenuItem>
              {movies.map((movie) => (
                <MenuItem key={movie.id} value={movie.title}>
                  {movie.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Theater</InputLabel>
            <Select
              value={selectedTheater}
              onChange={handleTheaterChange}
              required
            >
              <MenuItem value="" disabled>
                Select a theater
              </MenuItem>
              {theaters.map((theater) => (
                <MenuItem key={theater.id} value={theater.theaterName}>
                  {theater.theaterName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            sx={{ mb: 4 }}
            id="datetime-local"
            fullWidth
            type="datetime-local"
            label="Select Timing"
            InputLabelProps={{
              shrink: true,
            }}
            value={selectedDateTime}
            onChange={handleDateTimeChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Showtime
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddShowtimeForm;
