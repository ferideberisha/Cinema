import Grid from "@mui/material/Grid";
import * as React from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/ModeEditOutline";
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
import FormControl from "@mui/material/FormControl";
import {
  DataGrid,
  GridToolbarQuickFilter,
  gridClasses,
} from "@mui/x-data-grid";
import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StaffList() {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("Firstname is required")
      .min(3, "Firstname must be at least 3 characters")
      .max(50, "Firstname must not exceed 50 characters"),
    lastname: Yup.string()
      .required("Lastname is required")
      .min(3, "Lastname must be at least 3 characters")
      .max(50, "Lastname must not exceed 50 characters"),
    email: Yup.string().required("Email is required").email("Invalid Email."),
  });

  const navigate = useNavigate();

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <AppBar
          position="static"
          style={{ background: "transparent" }}
          variant="dense"
        >
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <GridToolbarQuickFilter />
              <GridToolbarColumnsButton />
              <GridToolbarFilterButton />
              <GridToolbarDensitySelector />
              <GridToolbarExport />
              <Button onClick={handleClickOpen} startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <Button onClick={handleClickOpen2} startIcon={<EditIcon />}>
                Edit
              </Button>
            </div>
            <div>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  float="right"
                  onClick={newClicked}
                  startIcon={<AddIcon />}
                >
                  New
                </Button>
              </Link>
            </div>
          </Toolbar>
        </AppBar>
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", minWidth: 190, flex: 1 },
    { field: "firstname", headerName: "Firstname", width: 200 },
    { field: "lastname", headerName: "Lastname", width: 200 },
    { field: "isAdmin", headerName: "Admin", type: "boolean", width: 120 },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
  ];

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [bar, setBar] = React.useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [id, setId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [selectionModel, setSelectionModel] = useState([]);

  const handleClickOpen = (e) => {
    if (selectionModel[0] === undefined || selectionModel === null) {
      handleClickOpen3();
    } else {
      setId(selectionModel[0]);
      setOpen(true);
    }
  };

  const newClicked = (e) => {
    navigate("/staff/dashboard/add-staff");
  };

  const handleClickOpen3 = (e) => {
    setOpen3(true);
  };

  const handleClickOpen2 = async (e) => {
    if (selectionModel[0] === undefined || selectionModel === null) {
      handleClickOpen3();
    } else {
      try {
        await api.get(`/api/staff/${selectionModel[0]}`).then((staff) => {
          setValue("firstname", staff.data.firstname);
          setValue("lastname", staff.data.lastname);
          setValue("email", staff.data.email);
          setIsAdmin(staff.data.isAdmin);
        });
      } catch (err) {
        console.log(`Error : ${err.message}`);
      }
      setOpen2(true);
    }
  };

  const handleClose = () => {
    if (open) {
      setOpen(false);
    } else if (open2) {
      setOpen2(false);
    } else if (open3) {
      setOpen3(false);
    }
    if (selectionModel[0] !== undefined || selectionModel !== null) {
      setSelectionModel([]);
    }
  };

  const handleClose2 = () => {
    setOpen2(false);
    if (selectionModel[0] !== undefined || selectionModel !== null) {
      setSelectionModel([]);
    }
  };

  const showBar = () => {
    setBar(true);
  };

  const hideBar = () => {
    setBar(false);
  };

  // const { user } = useAuthContext();
  const [records, setRecords] = useState([]);
  // const id = user.id;
  const fetchData = async () => {
    await api.get(`/api/staff/all`).then((userData) => {
      setRecords(userData.data);
    });
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const deletestaff = async (e) => {
    e.preventDefault();
    try {
      await api.delete(`/api/staff/${selectionModel[0]}`).then((userData) => {
        setMessage("Deleted Successfully!");
        setSeverity("success");
        showBar();
        handleClose();
        fetchData().catch(console.error);
      });
    } catch (err) {
      setMessage("Delete Failed!");
      setSeverity("error");
      showBar();
      console.log(`Error : ${err.message}`);
    }
  };

  const onSubmit = async (data) => {
    data.isAdmin = isAdmin;
    try {
      await api
        .put(`/api/staff/${selectionModel[0]}`, data)
        .then((userData) => {
          handleClose2();
          fetchData().catch(console.error);
        });
      setMessage("Updated Successfully!");
      setSeverity("success");
      showBar();
    } catch (err) {
      setMessage("Updated Failed!");
      setSeverity("error");
      showBar();
      console.log(`Error : ${err.message}`);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          height: "auto",
        }}
      >
        <div style={{ height: 600, width: "100%" }}>
          <StripedDataGrid
            components={{ Toolbar: CustomToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            onCellDoubleClick={(params, event) => {
              handleClickOpen2();
            }}
            rows={records.map((record) => {
              return {
                id: record._id,
                firstname: record.firstname,
                lastname: record.lastname,
                isAdmin: record.isAdmin,
                email: record.email,
              };
            })}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[25, 50, 100]}
            pagination
            checkboxSelection
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            selectionModel={selectionModel}
            hideFooterSelectedRowCount
            onSelectionModelChange={(selection) => {
              if (selection.length > 1) {
                const selectionSet = new Set(selectionModel);
                const result = selection.filter((s) => !selectionSet.has(s));

                setSelectionModel(result);
              } else {
                setSelectionModel(selection);
              }
            }}
          />
        </div>
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
        <DialogTitle>{"Edit staff"}</DialogTitle>
        <DialogContent>
          <Grid item xs={12} md={12} lg={12}>
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
                  fullWidth
                  multiline
                  maxRows={5}
                  helperText={errors.firstname?.message}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("firstname")}
                  error={errors.firstname ? true : false}
                />
                <TextField
                  label="Lastname"
                  fullWidth
                  multiline
                  maxRows={5}
                  helperText={errors.lastname?.message}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("lastname")}
                  error={errors.lastname ? true : false}
                />
                <TextField
                  label="Email"
                  fullWidth
                  multiline
                  maxRows={5}
                  helperText={errors.email?.message}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("email")}
                  error={errors.email ? true : false}
                />
                <FormControl sx={{ m: 1, minWidth: 140 }}>
                  <FormControlLabel
                    control={<Checkbox checked={!!isAdmin} />}
                    onChange={(event, value) => {
                      setIsAdmin(value);
                    }}
                    label="This employee is an Administrator"
                  />
                </FormControl>
              </div>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={handleClose2}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
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
        <DialogTitle>{"Delete staff"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this staff?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button
            onClick={(e) => {
              deletestaff(e, id);
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open3}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            You must select an item
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            To proceed with this action you must select an item.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
