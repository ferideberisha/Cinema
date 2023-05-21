import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import StaffRoutes from "./routes/staff.route";

// Import the necessary views/components for the movie ticket booking app admin dashboard
import UserList from "./views/UserList/UserList";
import AddMovie from "./views/AddMovie/AddMovie";
import AddShow from "./views/AddShow/AddShow";
import AddTheater from "./views/AddTheater/AddTheater";
import DeleteMovie from "./views/DeleteMovie/DeleteMovie";
import EditMovie from "./views/EditMovie/EditMovie";
import MovieList from "./views/MovieList/MovieList";
import ShowList from "./views/ShowList/ShowList";
import EditTheater from "./views/EditTheater/EditTheater";
import DeleteTheater from "./views/DeleteTheater/DeleteTheater";

const drawerWidth = 220;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();
  const [option, setOption] = React.useState(props.option);

  const handleRouteChange = (view) => {
    setOption(view);
    navigate("/staff/dashboard" + view);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <StaffRoutes handleRouteChange={handleRouteChange} />
        </Drawer>

        <Box
          style={{ height: "calc(100vh - 6rem)" }}
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Container maxWidth="xl" sx={{ mx: 0, mt: 2, mb: 0 }}>
            <Grid container spacing={3}>
              {/* Add the necessary conditions for rendering the desired components */}
              {option === "/add-movie" && <AddMovie />}
              {option === "/edit-movie" && <EditMovie />}
              {option === "/delete-movie" && <DeleteMovie />}
              {option === "/users" && <UserList />}
              {option === "/add-theater" && <AddTheater />}
              {option === "/edit-theater" && <EditTheater />}
              {option === "/delete-theater" && <DeleteTheater />}
              {option === "/add-show" && <AddShow />}
              {option === "/show-list" && <ShowList />}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function StaffDashboard(props) {
  return <DashboardContent option={props.option} />;
}
