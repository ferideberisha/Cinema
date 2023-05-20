import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/singlepage/:id" element={<SinglePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
