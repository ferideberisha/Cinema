import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./home/HomePage";
import SinglePage from "./components/watch/SinglePage";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Movies from "./pages/Movies/movies";
import Theaters from "./pages/Theaters/theaters";
import Theaters0 from "./pages/Theaters0/home";
import Theaters1 from "./pages/Theaters1/theaters";
import Theaters2 from "./pages/Theaters2/theaters";
import Theaters3 from "./pages/Theaters3/theaters";
import Theaters4 from "./pages/Theaters4/theaters";
import Theaters5 from "./pages/Theaters5/theaters";
import Events from "./pages/Events/events";
import Footer from "./components/footer/Footer";
import Admin from "./pages/Admin/index";
import ClientDashboard from "./pages/client-dashboard/ClientDashboard";
import StaffDashboard from "./pages/staff-dashboard/StaffDashboard";
import { ThemeProvider } from "styled-components";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user, authIsReady } = useAuthContext();

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
            <Route path="/" element={<HomePage />} />
            <Route path="/singlepage/:id" element={<SinglePage />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/theaters" element={<Theaters />} />
            <Route path="/theaters0" element={<Theaters0 />} />
            <Route path="/theaters1" element={<Theaters1 />} />
            <Route path="/theaters2" element={<Theaters2 />} />
            <Route path="/theaters3" element={<Theaters3 />} />
            <Route path="/theaters4" element={<Theaters4 />} />
            <Route path="/theaters5" element={<Theaters5 />} />
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
          </Routes>
          {/* <Footer /> */}
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
