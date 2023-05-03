import React from "react";
import {
  BrowserRouter, 
  Route,
  Routes,
} from "react-router-dom";
import "./App.css"
import Header from "./components/Header/Header";
import HomePage from "./home/HomePage"
import SinglePage from "./components/watch/SinglePage"
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Movies from "./pages/Movies/movies";
import Theaters from "./pages/Theaters/theaters";
import Events from "./pages/Events/events";
import  Footer  from "./components/footer/Footer";
import Homes from "./components/homes/Homes.js";
import Home from "./components/homes/Home";
import Upcomming from "./components/upcomming/Upcomming";
import Ucard from "./components/upcomming/Upcomming";
import home from './pages/Home/home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path='/' component={<Homes />} />
          <Route exact path='/' component={<home />} />
          <Route exact path='/' component={<HomePage />} />
          <Route exact path='/' component={<Upcomming />} />
          <Route exact path='/' component={<Ucard />} />
          <Route path='/singlepage/:id' component={<SinglePage />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/theaters" element={<Theaters />} />
          <Route path="/events" element={<Events />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
