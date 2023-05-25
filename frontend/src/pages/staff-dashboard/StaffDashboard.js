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
import { useAuthContext } from "../../hooks/useAuthContext";

// Import the necessary views/components for the movie ticket booking app admin dashboard
import Profile from "./views/Profile/Profile";
import AddMovie from "./views/Admin/AddMovie/AddMovie";
import AddTheater from "./views/Admin/AddTheater/AddTheater";
import AddShow from "./views/Admin/AddShow/AddShow";
import AddStaff from "./views/Admin/AddStaff/AddStaff";
import StaffList from "./views/Admin/StaffList/StaffList";
import UserList from "./views/Admin/UserList/UserList";
import ShowList from "./views/Admin/ShowList/ShowList";
import Messages from "./views/Admin/Messages/Messages";
import TheaterList from "./views/Admin/TheaterList/TheaterList";

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

const mdTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#28282B",
    },
  },
});

function DashboardContent(props) {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const { user } = useAuthContext();

  const navigate = useNavigate();
  const [option, setOption] = React.useState(props.option);

  const handleRouteChange = (view) => {
    setOption(view);
    navigate("/staff/dashboard" + view);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", marginTop: "5.5rem" }}>
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
              {option === "" && <Profile />}
              {user.isAdmin && option === "/add-movie" && <AddMovie />}
              {user.isAdmin && option === "/add-show" && <AddShow />}
              {user.isAdmin && option === "/add-staff" && <AddStaff />}
              {user.isAdmin && option === "/view-staff" && <StaffList />}
              {user.isAdmin && option === "/add-theater" && <AddTheater />}
              {user.isAdmin && option === "/view-theaters" && <TheaterList />}
              {user.isAdmin && option === "/view-users" && <UserList />}
              {user.isAdmin && option === "/show-list" && <ShowList />}
              {user.isAdmin && option === "/messages" && <Messages />}
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
