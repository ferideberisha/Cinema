import React from "react";
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
import ClientRoutes from "./routes/ClientRoutes";
import MyTickets from "./views/MyTickets/myTickets";
import FavoriteMovies from "./views/FavoriteMovies/favoriteMovies";
import WatchList from "./views/WatchList/watchList";
import RatingList from "./views/RatingList/RatingList";
import Profile from "./views/Profile/profile";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [option, setOption] = React.useState(props.option);
  const handleRouteChange = (view) => {
    setOption(view);
    navigate("/user/dashboard" + view); // Navigate to the specified view
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
          <ClientRoutes handleRouteChange={handleRouteChange} />
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
          <Container maxWidth="lg" sx={{ mx: 0, mt: 2, mb: 0 }}>
            <Grid container spacing={3}>
              {option === "" && <Profile />}
              {option === "/my-tickets" && <MyTickets />}
              {option === "/favorite-movies" && <FavoriteMovies />}
              {option === "/watch-list" && <WatchList />}
              {option === "/rating-list" && <RatingList />}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function MovieTicketDashboard(props) {
  return <DashboardContent option={props.option} />;
}
