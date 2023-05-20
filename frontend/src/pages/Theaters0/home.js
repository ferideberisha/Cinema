import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Theater1 from "./Theater1.png";
import Theater2 from "./Theater2.png";
import Theater3 from "./Theater3.png";
import Theater4 from "./Theater4.png";
import Theater5 from "./Theater5.png";

function Home() {
  const [chosenTheater, setChosenTheater] = useState(3);

  const handleRadioChange = (event) => {
    setChosenTheater(parseInt(event.target.value));
  };

  const getTheaterPath = () => {
    return `/theaters${chosenTheater}`;
  };

  return (
    <div className="home">
      <div className="slider">
        <input
          type="radio"
          name="testimonial"
          id="t-1"
          value="1"
          onChange={handleRadioChange}
        />
        <input
          type="radio"
          name="testimonial"
          id="t-2"
          value="2"
          onChange={handleRadioChange}
        />
        <input
          type="radio"
          name="testimonial"
          id="t-3"
          value="3"
          onChange={handleRadioChange}
          checked
        />
        <input
          type="radio"
          name="testimonial"
          id="t-4"
          value="4"
          onChange={handleRadioChange}
        />
        <input
          type="radio"
          name="testimonial"
          id="t-5"
          value="5"
          onChange={handleRadioChange}
        />
        <div className="testimonials">
          <label className="item" htmlFor="t-1">
            <h1>
              <img src={Theater1} alt="Kinema" />
            </h1>
          </label>
          <label className="item" htmlFor="t-2">
            <h1>
              <img src={Theater2} alt="Kinema" />
            </h1>
          </label>
          <label className="item" htmlFor="t-3">
            <h1>
              <img src={Theater3} alt="Kinema" />
            </h1>
          </label>
          <label className="item" htmlFor="t-4">
            <h1>
              <img src={Theater4} alt="Kinema" />
            </h1>
          </label>
          <label className="item" htmlFor="t-5">
            <h1>
              <img src={Theater5} alt="Kinema" />
            </h1>
          </label>
        </div>
        <br />
        <Link to={getTheaterPath()} className="button1">
          Choose theater!
        </Link>
        <p id="chosen-theater"></p>
      </div>
    </div>
  );
}

export default Home;
