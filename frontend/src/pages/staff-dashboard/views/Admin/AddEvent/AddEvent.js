import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/system";
import axios from "../../../../../api/axios";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

export default function AddEvent() {
  const [eventsName, setEventsName] = useState("");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dateRangeArray = dateRange.map((dateString) => new Date(dateString));

    const data = {
      eventsName,
      description,
      dateRange: dateRangeArray,
      creator: user.id,
    };

    try {
      await axios.post("/api/staff/events", data);
      setEventsName("");
      setDescription("");
      setDateRange([]);
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
        <h2 className="dashboard-title">New Event</h2>
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
              label="Events Name"
              fullWidth
              multiline
              value={eventsName}
              onChange={(e) => setEventsName(e.target.value)}
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

            <TextField
              id="outlined-multiline-flexible"
              label="dateRange"
              fullWidth
              multiline
              value={dateRange.join(",")}
              onChange={(e) => setDateRange(e.target.value.split(","))}
              helperText=" "
              maxRows={5}
              required
            />
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 0, mb: 5 }}>
            Add Event
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
