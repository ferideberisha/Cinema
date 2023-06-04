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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TheaterList() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [bar, setBar] = React.useState(false);

  const [id, setId] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [operatingHours, setOperatingHours] = useState("");

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    const data = {
      theaterName,
      description,
      address,
      status,
      operatingHours,
    };
    try {
      await api.put(`/api/staff/theater/${id}`, data).then((userData) => {
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
      await api.get(`/api/staff/theater/${id}`).then((staff) => {
        setId(id);
        setTheaterName(staff.data.theaterName);
        setDescription(staff.data.description);
        setAddress(staff.data.address);
        setStatus(staff.data.address);
        setOperatingHours(staff.data.operatingHours);
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
    await api.get(`/api/staff/theater/all`).then((userData) => {
      setRecords(userData.data);
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const deleteTheater = async (e, id) => {
    e.preventDefault();
    try {
      await api.delete(`/api/staff/theater/${id}`).then((userData) => {
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
        <h2 className="dashboard-title">View Theaters</h2>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Theater Name</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">OperatingHours</TableCell>
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
                    <TableCell align="center">{record.theaterName}</TableCell>
                    <TableCell align="center">{record.description}</TableCell>
                    <TableCell align="center">{record.address}</TableCell>
                    <TableCell align="center">{record.status}</TableCell>
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
        <DialogTitle>{"Edit theater"}</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" },
            }}
          >
            <div>
              <TextField
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
        <DialogTitle>{"Delete theater"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this theater?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button
            onClick={(e) => {
              deleteTheater(e, id);
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
