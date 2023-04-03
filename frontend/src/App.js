import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/theaters">Theaters</Link>
            </li>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/food">Food & Drinks</Link>
            </li>
            <li>
              <Link to="/register">Sign in</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/theaters">
            <Theaters />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/food">
            <Food />
          </Route>
          <Route path="/register">
            <SignIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function Movies() {
  return <h2>Movies</h2>;
}

function Theaters() {
  return <h2>Theaters</h2>;
}

function Events() {
  return <h2>Events</h2>;
}

function Food() {
  return <h2>Food & Drinks</h2>;
}

function SignIn() {
  return <h2>Sign In</h2>;
}



