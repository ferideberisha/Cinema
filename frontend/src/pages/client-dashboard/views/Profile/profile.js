import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "./Profile.css";
import Avatar from "@mui/material/Avatar";

export default function Profile({ user }) {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <h2 className="dashboard-title">Profile</h2>
        <div className="profile-content">
          <Avatar alt={""} />
          <label>Name:</label>
          <label>Email:</label>
        </div>
      </Paper>
    </Grid>
  );
}
