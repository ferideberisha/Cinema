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

export default function EventsList() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [bar, setBar] = React.useState(false);
  const { user } = useAuthContext();

  const [id, setId] = useState("");
  const [eventsName, setEventsName] = useState("");
  const [description, setDescription] = useState("");
  const [dateRange, setDateRange] = useState([]);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const dateRangeArray = dateRange.map((dateString) => new Date(dateString));

    const data = {
      eventsName,
      description,
      dateRange: dateRangeArray,
      creator: user.id,
    };
    try {
      await api.put(`/api/staff/events/${id}`, data).then((userData) => {
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
      await api.get(`/api/staff/events/${id}`).then((staff) => {
        setId(id);
        setEventsName(staff.data.eventsName);
        setDescription(staff.data.description);
        setDateRange(staff.data.dateRange);
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
    await api.get(`/api/staff/events/all`).then((userData) => {
      setRecords(userData.data);
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const deleteEvent = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/api/staff/events/${id}`).then((userData) => {
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
        <h2 className="dashboard-title">View Events</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Event ID</TableCell>
                <TableCell align="center">Event Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Date Range</TableCell>
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
                    <TableCell align="center">{record.eventsName}</TableCell>
                    <TableCell align="center">{record.description}</TableCell>
                    <TableCell align="center">
                      {record.dateRange.map((date) => (
                        <div key={date}>
                          {new Date(date).toLocaleDateString()}
                        </div>
                      ))}
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
        <DialogTitle>{"Edit event"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
          >
            <div>
              <TextField
                label="Event Name"
                fullWidth
                multiline
                value={eventsName}
                onChange={(e) => setEventsName(e.target.value)}
                helperText=" "
                maxRows={5}
                required
              />
              <TextField
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
                label="Date Range"
                fullWidth
                multiline
                value={dateRange.join(",")}
                onChange={(e) => setDateRange(e.target.value.split(","))}
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
        <DialogTitle>{"Delete event"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button
            onClick={(e) => {
              deleteEvent(e, id);
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
