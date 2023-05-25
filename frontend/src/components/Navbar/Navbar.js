import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import * as React from "react";
import Box from "@mui/material/Box";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout_user } = useAuthContext();
  const handleLogout = () => {
    logout_user();
    navigate("/");
  };

  return (
    <header>
      <div className="container">
        <div className="nav-row">
          <Link to="/">
            <span className="nav-space">MOVIETICKETZ</span>
          </Link>
          <Link to="/movie">
            <span className="nav-space">MOVIES</span>
          </Link>
          <Link to="/events">
            <span className="nav-space">EVENTS</span>
          </Link>
          <Link to="/theaters">
            <span className="nav-space">THEATERS</span>
          </Link>
        </div>
        <nav className="navbar">
          <ul>
            {!user && (
              <>
                <li className="menu-link">
                  <Link to="/login">Log in</Link>
                </li>
                <li className="btn-link">
                  <Link to="/register">register</Link>
                </li>
              </>
            )}

            {user && (
              <>
                <Link
                  to={user.isStaff ? "/staff/dashboard" : "/user/dashboard"}
                  className="menu-link"
                >
                  Dashboard
                </Link>
                <Box sx={{ flexGrow: 0 }}>
                  <p
                    style={{
                      display: "inline-flex",
                      textTransform: "uppercase",
                      paddingRight: "10px",
                      color: "#00458b",
                    }}
                  >
                    <b>{user.firstname}</b>
                  </p>
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <LogoutIcon
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  />
                </Box>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
