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
import api from "../../../../../api/axios";
import { useState, useEffect } from "react";
import Notifybar from "../../../../../components/shared/Notifybar";
import { useAuthContext } from "../../../../../hooks/useAuthContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MovieList() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [bar, setBar] = React.useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [overview, setOverview] = useState("");
  const [original_language, setOriginalLanguage] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [image, setImage] = useState("");
  const { user } = useAuthContext();

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSubmit = async (e, id) => {
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
      await api.put(`/api/staff/movies-url/${id}`, data).then((userData) => {
        handleClose2();
        fetchData().catch(console.error);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const handleClickOpen = (e, id) => {
    setId(id);
    setOpen(true);
  };

  const handleClickOpen2 = async (e, id) => {
    console.log(id);
    try {
      await api.get(`/api/staff/movies-url/${id}`).then((staff) => {
        setTitle(staff.data.title);
        setOverview(staff.data.overview);
        setOriginalLanguage(staff.data.original_language);
        setReleaseDate(staff.data.release_date);
        setImage(staff.data.image);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
    setOpen2(true);
  };

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

  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    await api.get(`/api/staff/movies-url/all`).then((userData) => {
      setRecords(userData.data);
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const deleteMovie = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/api/staff/movies-url/${id}`).then((userData) => {
        handleClose();
        fetchData().catch(console.error);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
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
        <h2 className="dashboard-title">View Movies</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Movie ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Overview</TableCell>
                <TableCell align="center">Original Language</TableCell>
                <TableCell align="center">Release Date</TableCell>
                <TableCell align="center">Image</TableCell>
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
                    <TableCell align="center">{record?._id}</TableCell>
                    <TableCell align="center">{record.title}</TableCell>
                    <TableCell align="center">{record.overview}</TableCell>
                    <TableCell align="center">
                      {record.original_language}
                    </TableCell>
                    <TableCell align="center">{record.release_date}</TableCell>
                    <TableCell align="center">{record.image}</TableCell>
                    <TableCell align="center">
                      {record.operatingHours}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={(e) => {
                          handleClickOpen2(e, record._id);
                        }}
                        color="primary"
                        variant="outlined"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          handleClickOpen(e, record._id);
                        }}
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
        open={open2}
        keepMounted
        maxWidth="md"
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit movie"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
          >
            <div>
              <TextField
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
                onChange={(e) => setOriginalLanguage(e.target.value)}
                helperText=" "
                maxRows={5}
                required
              />
              <TextField
                id="outlined-multiline-flexible"
                label="release_date"
                fullWidth
                multiline
                value={release_date}
                onChange={(e) => setReleaseDate(e.target.value)}
                helperText=" "
                maxRows={5}
                required
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Image"
                fullWidth
                multiline
                value={image}
                onChange={(e) => setImage(e.target.value)}
                helperText=" "
                maxRows={5}
                required
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={handleClose2}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={(e) => {
              handleSubmit(e, id);
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete movie"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this movie?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button
            onClick={(e) => {
              deleteMovie(e, id);
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
