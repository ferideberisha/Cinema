import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/system";
import axios from "../../../../../api/axios";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [original_language, setOriginalLanguage] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [image, setImage] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      overview,
      original_language,
      release_date,
      image,
      creator: user.id,
    };

    try {
      await axios.post("/api/staff/movies-url", data);
      setTitle("");
      setOverview("");
      setOriginalLanguage("");
      setReleaseDate("");
      setImage("");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        className="title"
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">New Movie</h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
        >
          <div>
            <TextField
              id="outlined-multiline-flexible"
              label="Movie Name"
              fullWidth
              multiline
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Overview"
              fullWidth
              multiline
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />

            <TextField
              id="outlined-multiline-flexible"
              label="original_language"
              fullWidth
              multiline
              value={original_language}
              onChange={(e) => original_language(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="image"
              fullWidth
              multiline
              value={image}
              onChange={(e) => image(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Movie
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
