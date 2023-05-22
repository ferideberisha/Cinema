import React, { useState, useEffect } from "react";
import "./theaters.css";

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function MovieSelector() {
  const handleMovieChange = (event) => {
    const movieIndex = event.target.value;
    const moviePrice =
      event.target.options[event.target.selectedIndex].text.match(/\d+/g)[0];
    setMovieData(movieIndex, moviePrice);
  };
  return (
    <div className="theaters-movie-container">
      <label>Pick a movie:</label>
      <select id="movie" onChange={handleMovieChange}>
        <option value="10">Avengers: Endgame ($10)</option>
        <option value="12">Joker ($12)</option>
        <option value="8">Toy Story 4 ($8)</option>
        <option value="9">The Lion King ($9)</option>
      </select>
    </div>
  );
}

function TheaterSeats() {
  // eslint-disable-next-line no-unused-vars
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    populateUI();
  }, []);

  function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
      const seats = document.querySelectorAll(".theaters-seat");
      seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index + 1) > -1) {
          seat.classList.add("selected");
        }
        if (
          seat.classList.contains("na") ||
          seat.classList.contains("occupied")
        ) {
          seat.classList.add("unselectable");
        }
      });
      setSelectedSeats(selectedSeats);
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
      document.getElementById("movie").value = selectedMovieIndex;
    }
  }

  function handleSeatClick(event) {
    const seat = event.target;

    if (
      seat.classList.contains("occupied") ||
      seat.classList.contains("unselectable")
    ) {
      return;
    }

    seat.classList.toggle("selected");

    const selectedSeats = document.querySelectorAll(".theaters-seat.selected");

    const seatsIndex = [...selectedSeats].map((seat) =>
      Array.prototype.indexOf.call(seat.parentNode.children, seat)
    );

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    const ticketPrice = localStorage.getItem("selectedMoviePrice");

    document.getElementById("count").innerText = selectedSeatsCount;
    document.getElementById("total").innerText =
      selectedSeatsCount * ticketPrice;
  }

  return (
    <div>
      <ul className="theaters-showcase">
        <li>
          <div className="theaters-seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div className="theaters-seat selected0"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="theaters-seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="theaters-container">
        <div className="theaters-screen"></div>

        <div className="theaters-row" onClick={handleSeatClick}>
          <div className="theaters-seat"></div>
          <div className="theaters-seat"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat"></div>
          <div className="theaters-seat"></div>
        </div>
        <div className="theaters-row" onClick={handleSeatClick}>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat"></div>
          <div className="theaters-seat"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
        </div>
        <div className="theaters-row" onClick={handleSeatClick}>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
        </div>
        <div className="theaters-row" onClick={handleSeatClick}>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
        </div>
        <div className="theaters-row" onClick={handleSeatClick}>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
          <div className="theaters-seat occupied"></div>
        </div>
      </div>
    </div>
  );
}

function Theaters() {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>theaters</title>
      </head>
      <body className="theaters-body theaters-page">
        <h1>Select a movie and seats:</h1>
        <MovieSelector className="theaters-movie-container" />
        <TheaterSeats className="theaters-container" />
        <p class="text">
          You have selected <span id="count">0</span> seats for a price of $
          <span id="total">0</span>
        </p>
      </body>
    </html>
  );
}

export default Theaters;
