import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CameraRollOutlinedIcon from "@mui/icons-material/CameraRollOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Header = () => {
  const pages = ["Movies", "Theaters", "Events", "Search"];
  const [loggedIn, setLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // New state variable

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page) => {
    navigate(`/${page.toLowerCase()}`);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const staffToken = localStorage.getItem("staffToken");

    if (userToken) {
      setLoggedIn(true);
      setIsAdmin(false);
    } else if (staffToken) {
      setLoggedIn(true);
      setIsAdmin(true);
    } else {
      setLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("staffToken");
    setLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <AppBar position="relative" sx={{ zIndex: 2 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CameraRollOutlinedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MOVIETICKETZ
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ marginRight: "auto" }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <CameraRollOutlinedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />

          <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ mx: 2, color: "white" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex" }}>
            {loggedIn && isAdmin && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  component={Link}
                  to="/staff/dashboard"
                  variant="contained"
                  color="primary"
                  sx={{ mx: 2 }}
                >
                  Dashboard
                </Button>
              </Box>
            )}

            {loggedIn && !isAdmin && (
              <Box sx={{ flexGrow: 0 }}>
                <Button
                  component={Link}
                  to="/user/dashboard"
                  variant="contained"
                  color="primary"
                  sx={{ mx: 2 }}
                >
                  Dashboard
                </Button>
              </Box>
            )}
            {loggedIn ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: -2, color: "white" }}
                  >
                    <AccountCircleOutlinedIcon
                      sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : null}

            {loggedIn ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            ) : (
              <Box>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  sx={{ mx: 2 }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/register")}
                  sx={{ mx: 2 }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
