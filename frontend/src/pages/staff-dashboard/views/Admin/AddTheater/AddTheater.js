import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/system";
import api from "../../../../../api/axios";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

export default function AddTheater() {
  const [theaterName, setTheaterName] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { theaterName, description, creator: user.id };
    try {
      await api.post("/api/staff/theater", data).then((userData) => {
        setTheaterName("");
        setDescription("");
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
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
        <h2 className="dashboard-title">New Theater</h2>
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
              label="Theater Name"
              fullWidth
              multiline
              value={theaterName}
              onChange={(e) => setTheaterName(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              fullWidth
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Theater
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
