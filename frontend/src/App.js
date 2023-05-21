import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
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

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const staffToken = localStorage.getItem("staffToken");

    if (userToken) {
      setLoggedUser(userToken);
      setIsAdmin(false);
    } else if (staffToken) {
      setLoggedUser(staffToken);
      setIsAdmin(true);
    } else {
      setLoggedUser(null);
      setIsAdmin(false);
    }

    setUserDataLoaded(true); // Set the userDataLoaded flag
  }, []);

  return (
    <div>
      <Router>
        <Header isAdmin={isAdmin} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/singlepage/:id" element={<SinglePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/theaters" element={<Theaters />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={<Admin />} />

          {/* Client Dashboard */}
          <Route path="/user">
            {userDataLoaded && (
              <Route
                path="/user/dashboard"
                element={
                  loggedUser ? (
                    isAdmin ? (
                      <StaffDashboard />
                    ) : (
                      <ClientDashboard />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            )}
          </Route>

          <Route path="/staff">
            {userDataLoaded && (
              <Route
                path="/staff/dashboard"
                element={
                  loggedUser ? (
                    isAdmin ? (
                      <StaffDashboard />
                    ) : (
                      <Navigate to="/user/dashboard" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            )}
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
