import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Fab from "@mui/material/Fab";
import Divider from "@mui/material/Divider";
import MessageSharpIcon from "@mui/icons-material/MessageSharp";
import TextField from "@mui/material/TextField";
import "./contactus.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";
import api from "../../api/axios";
// import { useAuthContext } from "../../hooks/useAuthContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  p: 0,
};

const fabStyle = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

export default function ContactUsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [read] = React.useState(false);
  const [archive] = React.useState(false);
  const [sentAlert, setSentAlert] = React.useState(false);

  const handleSentAlert = () => {
    setSentAlert(true);
  };

  const handleSentAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSentAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, message, read, archive };
    try {
      await api
        .post("/api/staff/contactus/sendmessage", data)
        .then((contactData) => {
          setName("");
          setEmail("");
          setMessage("");
          handleClose();
          handleSentAlert();
        });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  return (
    <div className="contactUs">
      <Fab
        color="primary"
        aria-label="add"
        style={fabStyle}
        onClick={() => setOpen(true)}
      >
        <MessageSharpIcon />
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            className="modalBox"
            component="form"
            onSubmit={handleSubmit}
          >
            <div className="leftContact">
              <h2>Contact</h2>
              <TextField
                required
                fullWidth
                id="name"
                label="Full Name"
                sx={{ paddingBottom: "5%" }}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <TextField
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                sx={{ paddingBottom: "5%" }}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={5}
                label="Message"
                fullWidth
                helperText=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ margin: 0 }}
              >
                SEND
              </Button>
            </div>
            <div className="rightContact">
              <div className="info" style={{ paddingTop: "10%" }}>
                <LocationOnIcon sx={{ fontSize: "50px", color: "white" }} />
                <h3>Pristina, Kosovo</h3>
              </div>
              <div className="info">
                <CallIcon sx={{ fontSize: "50px", color: "white" }} />
                <h3>+38338383838</h3>
              </div>
              <div className="info">
                <EmailIcon sx={{ fontSize: "50px", color: "white" }} />
                <h3>contact@hms.com</h3>
              </div>
              <Divider
                sx={{ width: "70%", marginLeft: "16%", marginTop: "5%" }}
              />
              <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                className="socialMediaList"
                sx={{ justifyContent: "center", marginTop: "7%" }}
              >
                <a style={{ margin: "0" }} href="https://twitter.com">
                  <TwitterIcon className="icon" />
                </a>
                <a href="https://facebook.com">
                  <FacebookIcon className="icon" />
                </a>
                <a href="https://instagram.com">
                  <InstagramIcon className="icon" />
                </a>
              </Stack>
            </div>
          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={sentAlert}
        autoHideDuration={4000}
        onClose={handleSentAlertClose}
      >
        <Alert
          onClose={handleSentAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Message Sent!
        </Alert>
      </Snackbar>
    </div>
  );
}
