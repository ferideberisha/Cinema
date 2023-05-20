import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import "./theaters.css";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";

function Theaters() {
  useEffect(() => {
    const head = document.head;

    const fontLink = document.createElement("link");
    fontLink.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap";
    fontLink.rel = "stylesheet";
    head.appendChild(fontLink);

    const faLink = document.createElement("link");
    faLink.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css";
    faLink.rel = "stylesheet";
    head.appendChild(faLink);

    // Clean up by removing the appended link elements when the component is unmounted
    return () => {
      head.removeChild(fontLink);
      head.removeChild(faLink);
    };
  }, []);

  return (
    <div className="theaters-containers">
      <div className="theaters-item-containers">
        <div className="theaters-img-containers">
          <img src={img1} alt="kinema" />
        </div>
        <div className="theaters-body-containers">
          <div className="theaters-overlays"></div>
          <div className="theaters-event-infos">
            <p className="theaters-titles">MOVIETICKETZ in Prishtina</p>
            <div className="theaters-separators"></div>
            <p className="theaters-infos">Prishtina, PR</p>
            <p className="theaters-prices">Open</p>

            <div className="theaters-additional-infos">
              <p className="theaters-infos">
                <i className="fas fa-map-marker-alt"></i>
                St. Xhorxh Bush, 10000 Prishtina
              </p>
              <p className="theaters-infos">
                <i className="far fa-calendar-alt"></i>
                Mon, Fri 10:00 - 22:00 and Sat, Sun 12:00 - 23:00
              </p>

              <p className="theaters-infos theaters-descriptions">Welcome!</p>
            </div>
          </div>
          <Link to="/theaters0" className="theaters-actions">
            Book a Movie
          </Link>{" "}
          {}
        </div>
      </div>

      <div className="theaters-item-containers">
        <div className="theaters-img-containers">
          <img src={img2} alt="kinema 2" />
        </div>

        <div className="theaters-body-containers">
          <div className="theaters-overlays"></div>
          <div className="theaters-event-infos">
            <p className="theaters-titles">MOVIETICKETZ in Prizren</p>
            <div className="theaters-separators"></div>
            <p className="theaters-infos">Prizren, PZ</p>
            <p className="theaters-prices">Open</p>

            <div className="theaters-additional-infos">
              <p className="theaters-infos">
                <i className="fas fa-map-marker-alt"></i>
                St. Tirana, 20000 Prizren
              </p>
              <p className="theaters-infos">
                <i className="far fa-calendar-alt"></i>
                Mon, Fri 10:00 - 22:00 and Sat, Sun 12:00 - 23:00
              </p>

              <p className="theaters-infos theaters-descriptions">Welcome!</p>
            </div>
          </div>
          <Link to="/theaters0" className="theaters-actions">
            Book a Movie
          </Link>{" "}
          {}
        </div>
      </div>
    </div>
  );
}

export default Theaters;
