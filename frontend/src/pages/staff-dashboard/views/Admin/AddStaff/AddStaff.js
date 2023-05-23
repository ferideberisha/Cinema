import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { Box } from "@mui/system";
import api from "../../../../../api/axios";
import { useAuthContext } from "../../../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useQueryClient } from "react-query";

export default function AddStaff() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleAdminChange = (event) => {
    const newAdmin = event.target.value === "true";
    setIsAdmin(newAdmin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { firstname, lastname, email, password, isAdmin, id: user.id };
    try {
      await api.post("/api/staff/register", data).then((userData) => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setIsAdmin(false);
        console.log(userData);

        queryClient.invalidateQueries("staff");
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
        <h2 className="dashboard-title">New Staff</h2>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
        >
          <div>
            <TextField
              label="Firstname"
              id="firstname"
              fullWidth
              multiline
              maxRows={5}
              helperText={firstname?.message}
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={firstname ? true : false}
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <TextField
              label="Lastname"
              id="lastname"
              fullWidth
              multiline
              maxRows={5}
              helperText={lastname?.message}
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={lastname ? true : false}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              label="Email"
              id="email"
              fullWidth
              multiline
              maxRows={5}
              helperText={email?.message}
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={email ? true : false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              helperText={password?.message}
              InputLabelProps={{
                shrink: true,
              }}
              error={password ? true : false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <FormControl sx={{ m: 1, minWidth: 140 }}>
              <InputLabel id="admin-label">Is Admin?</InputLabel>
              <Select
                labelId="admin-label"
                id="admin"
                label="Is Admin?"
                required
                defaultValue={"false"}
                onChange={handleAdminChange}
              >
                <MenuItem value={"true"}>Yes</MenuItem>
                <MenuItem value={"false"}>No</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ mt: 5, mb: 5 }}
          >
            Add Staff
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
}
