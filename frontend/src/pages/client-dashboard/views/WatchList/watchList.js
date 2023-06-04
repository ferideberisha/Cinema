import Grid from "@mui/material/Grid";
import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import axios from "../../../../api/axios";
import { useState, useEffect } from "react";
import Notifybar from "../../../../components/shared/Notifybar";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WatchList(props) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [bar, setBar] = React.useState(false);

  const { user } = useAuthContext();
  const item = props.item;
  const [movieId, setMovieId] = useState("");
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/users/${user.id}/watchlist`);
      const watchlist = response.data.watchlist;
      setRecords(watchlist);
      console.log("Watchlist movies", watchlist);
    } catch (error) {
      console.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const showBar = () => {
    setBar(true);
  };

  const hideBar = () => {
    setBar(false);
  };

  const handleClickOpen = (movieId) => {
    console.log("Movie ID:", movieId);
    setOpen(true);
    setMovieId(movieId);
  };

  const deleteFromWatchList = async (e, movieId) => {
    console.log("User ID:", user.id);
    // console.log("Movie ID:", movieId);

    try {
      await axios.delete(`/api/users/${user.id}/watchlist/${movieId}`);
      handleClose();
      fetchData(); // Refresh the movie list after deletion
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

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
        <h2 className="dashboard-title">View WatchList Movies</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Original Language</TableCell>
                <TableCell align="center">Release Date</TableCell>
                <TableCell align="center">Runtime</TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records.map((record, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{record?.title}</TableCell>
                    <TableCell align="center">
                      {record?.original_language}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(record?.release_date).toLocaleDateString(
                        "en-US"
                      )}
                    </TableCell>
                    <TableCell align="center">{record?.runtime}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleClickOpen(record.movieId)}
                        color="primary"
                        variant="outlined"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Notifybar
          open={bar}
          onClose={hideBar}
          severity={severity}
          message={message}
        />
      </Paper>

      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Remove favorite movie"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to remove this movie from watchlist?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button
            onClick={(e) => {
              deleteFromWatchList(e, movieId);
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
