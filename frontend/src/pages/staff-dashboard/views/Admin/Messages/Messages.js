import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionActions from "@mui/material/AccordionActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";
import api from "../../../../../api/axios";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Messages() {
  const [expanded, setExpanded] = React.useState(false);
  const [archFilter, setArchFilter] = React.useState(false);
  const [archivedAlert, setArchivedAlert] = React.useState(false);

  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : false);
    read(id);
  };

  const read = async (id) => {
    try {
      await api.put(`api/staff/contactus/read/${id}`).then((read) => {
        fetchData().catch(console.error);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const archived = async (e, id) => {
    e.preventDefault();
    try {
      await api.put(`api/staff/contactus/${id}`).then((archived) => {
        fetchData().catch(console.error);
        handleArchivedAlert();
        setExpanded(false);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };

  const [records, setRecords] = useState([]);
  const fetchData = async () => {
    await api.get(`api/staff/contactus/all`).then((messageData) => {
      setRecords(messageData.data);
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const archFil = (event) => {
    if (event.target.checked) {
      setArchFilter(true);
    } else {
      setArchFilter(false);
    }
  };

  const handleArchivedAlert = () => {
    setArchivedAlert(true);
  };

  const handleArchivedAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setArchivedAlert(false);
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: "auto",
        minWidth: "1129px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 className="dashboard-title">Messages</h2>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onClick={(e) => archFil(e)} />}
            label="Show archived"
          />
        </FormGroup>
      </div>
      {records &&
        [...records]
          .reverse()
          .filter((record) => record.archive === archFilter)
          .map((record, index) => (
            <div key={index}>
              <Accordion
                expanded={expanded === record._id}
                onChange={handleChange(record._id)}
                square={true}
              >
                <AccordionSummary
                  sx={{
                    borderBottom: "1px solid #A9A9A9",
                    backgroundColor: "#141414",
                    fontWeight: "fontWeightBold",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography
                    sx={{
                      width: "33%",
                      flexShrink: 0,
                      fontWeight: record.read ? 100 : 700,
                      color: "#fff",
                    }}
                  >
                    {record.name}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      width: "33%",
                      fontWeight: record.read ? 100 : 700,
                    }}
                  >
                    {record.email}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#fff",
                      fontWeight: record.read ? 100 : 700,
                    }}
                  >
                    {record.message.slice(0, 10) + "..."}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{record.message}</Typography>
                </AccordionDetails>
                <AccordionActions sx={{ borderBottom: "1px solid #A9A9A9" }}>
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      archived(e, record._id);
                    }}
                    sx={{ display: record.archive ? "none" : "block" }}
                  >
                    Archive
                  </Button>
                </AccordionActions>
              </Accordion>
              <Snackbar
                open={archivedAlert}
                autoHideDuration={4000}
                onClose={handleArchivedAlertClose}
              >
                <Alert
                  onClose={handleArchivedAlertClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Message Archived!
                </Alert>
              </Snackbar>
            </div>
          ))}
    </Paper>
  );
}
