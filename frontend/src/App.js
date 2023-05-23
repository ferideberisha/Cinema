import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./home/HomePage";
import SinglePage from "./components/watch/SinglePage";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Movies from "./pages/Movies/movies";
import Theaters from "./pages/Theaters/theaters";
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
    <QueryClientProvider client={new QueryClient()}>
      <div>
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/singlepage/:id" element={<SinglePage />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/theaters" element={<Theaters />} />
              <Route path="/events" element={<Events />} />
              {/* <Route path="/admin" element={<Admin />} /> */}

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

              <Route path="/staff">
                <Route
                  path="/staff/dashboard/add-movie"
                  element={
                    !user ? (
                      <Navigate to="/login" />
                    ) : !user.isStaff ? (
                      <Navigate to="/patient/dashboard" />
                    ) : (
                      <StaffDashboard option={"/add-movie"} />
                    )
                  }
                />
              </Route>
              <Route path="/staff">
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
              </Route>
              <Route path="/staff">
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
              </Route>
              <Route path="/staff">
                <Route
                  path="/staff/dashboard/manage-theaters"
                  element={
                    !user ? (
                      <Navigate to="/login" />
                    ) : !user.isStaff ? (
                      <Navigate to="/user/dashboard" />
                    ) : (
                      <StaffDashboard option={"/manage-theaters"} />
                    )
                  }
                />
              </Route>
              <Route path="/staff">
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
              </Route>
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
    </QueryClientProvider>
  );
}

export default App;
