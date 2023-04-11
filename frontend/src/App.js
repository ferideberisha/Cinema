import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/home";
import Login from "./pages/Login/login";
import Register from "./pages/Register/register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
