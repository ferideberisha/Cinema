import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAuthContext } from "./hooks/useAuthContext";
import "swiper/swiper.min.css";
import "./App.scss";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Movies from "./pages/Movies/movies";
import Theaters from "./pages/Theaters/theaters";
import Events from "./pages/Events/events";
import Admin from "./pages/Admin/index";
import ClientDashboard from "./pages/client-dashboard/ClientDashboard";
import StaffDashboard from "./pages/staff-dashboard/StaffDashboard";
import Home from "./pages/Home";
import Detail from "./pages/detail/Detail";

function App() {
  const { user } = useAuthContext();

  const theme = {
    colors: {
      dark: "#818181",
      nav: "#E9FCFF",
      header: "#ff0000",
      body: "#FDFDFD",
      footer: "#00333",
      main: "#1976d2",
      secondary: "#1FAAFF",
      tertiary: "#989898",
    },
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/theaters" element={<Theaters />} />
            <Route path="/events" element={<Events />} />
            <Route path="/admin" element={<Admin />} />

            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />

            {/* User Dashboard */}
            <Route path="/user">
              <Route
                path="/user/dashboard"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : user.isStaff ? (
                    <Navigate to="/staff/dashboard" />
                  ) : (
                    <ClientDashboard option={""} />
                  )
                }
              />
            </Route>
            {/* Staff Dashboard */}
            <Route path="/staff">
              <Route
                path="/staff/dashboard"
                element={
                  !user ? (
                    <Navigate to="/login" />
                  ) : !user.isStaff ? (
                    <Navigate to="/user/dashboard" />
                  ) : (
                    <StaffDashboard option={""} />
                  )
                }
              />
            </Route>

            <Route path="/:category/:id" element={<Detail />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
