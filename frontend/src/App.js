
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
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Theaters from "./pages/Theaters/theaters";
import Theaters0 from "./pages/Theaters0/home";
import Theaters1 from "./pages/Theaters1/theaters";
import Theaters2 from "./pages/Theaters2/theaters";
import Theaters3 from "./pages/Theaters3/theaters";
import Theaters4 from "./pages/Theaters4/theaters";
import Theaters5 from "./pages/Theaters5/theaters";
import Events from "./pages/Events/events";
import ClientDashboard from "./pages/client-dashboard/ClientDashboard";
import StaffDashboard from "./pages/staff-dashboard/StaffDashboard";
import Home from "./pages/Home";
import Detail from "./pages/detail/Detail";
import Catalog from "./pages/Catalog";
import Footer from "./components/Footer/Footer";
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
            <Route path="/theaters" element={<Theaters />} />
            <Route path="/theaters0" element={<Theaters0 />} />
            <Route path="/theaters1" element={<Theaters1 />} />
            <Route path="/theaters2" element={<Theaters2 />} />
            <Route path="/theaters3" element={<Theaters3 />} />
            <Route path="/theaters4" element={<Theaters4 />} />
            <Route path="/theaters5" element={<Theaters5 />} />
            <Route path="/events" element={<Events />} />
            <Route path="/:category/search/:keyword" element={<Catalog />} />
            <Route path="/:category/:id" element={<Detail />} />
            <Route path="/:category" element={<Catalog />} />

            {/* {Login/Register Routes} */}
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />

            {/* User Dashboard */}
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

            {/* Staff Dashboard */}
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

            <Route
              path="/staff/dashboard/add-movie"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/add-movie"} />
                )
              }
            />

            <Route
              path="/staff/dashboard/add-show"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/add-show"} />
                )
              }
            />

            {/* {Add/View User routes} */}
            <Route
              path="/staff/dashboard/add-user"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/add-user"} />
                )
              }
            />

            <Route
              path="/staff/dashboard/view-users"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/view-users"} />
                )
              }
            />

            {/* {Add/View Theater routes} */}
            <Route
              path="/staff/dashboard/add-theater"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/add-theater"} />
                )
              }
            />

            <Route
              path="/staff/dashboard/view-theaters"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/view-theaters"} />
                )
              }
            />

            {/* {Add/View Staff} */}
            <Route
              path="/staff/dashboard/add-staff"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/add-staff"} />
                )
              }
            />

            <Route
              path="/staff/dashboard/view-staff"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/view-staff"} />
                )
              }
            />

            {/* {Messages route} */}
            <Route
              path="/staff/dashboard/messages"
              element={
                !user ? (
                  <Navigate to="/login" />
                ) : !user.isStaff ? (
                  <Navigate to="/user/dashboard" />
                ) : (
                  <StaffDashboard option={"/messages"} />
                )
              }
            />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;