import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { Box } from "@mui/system";
import axios from "../../../../../api/axios";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

export default function AddTheater() {
  const [theaterName, setTheaterName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      theaterName,
      description,
      address,
      status,
      operatingHours,
      creator: user.id,
    };
    try {
      await axios.post("/api/staff/theater", data).then((userData) => {
        setTheaterName("");
        setDescription("");
        setAddress("");
        setStatus("");
        setOperatingHours("");
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
            <TextField
              id="outlined-multiline-flexible"
              label="Address"
              fullWidth
              multiline
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Status"
              fullWidth
              multiline
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              helperText=" "
              maxRows={5}
              required
            />
            <TextField
              id="outlined-multiline-flexible"
              label="OperatingHours"
              fullWidth
              multiline
              value={operatingHours}
              onChange={(e) => setOperatingHours(e.target.value)}
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
