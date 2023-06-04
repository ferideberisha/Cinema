import "./event.css";
import img1 from "./img1.jpeg";
import img2 from "./img2.jpeg";
import img3 from "./img3.jpg";

function Events() {
  return (
    <>
      <div className="events">
        <div className="events-containers1">
          <div className="events-item-containers1">
            <div className="events-img-containers">
              <img src={img1} alt="event" />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", color: "#fff", marginLeft: "2rem" }}>
              FOR EACH TICKET,<br></br> GET 4 FREE CHILLI CHEESE NUGGETS AT KFC!
            </h3>
            <p style={{ fontSize: "14px", color: "#fff", marginLeft: "2rem" }}>
              EVERY WEDNESDAY! <br></br>Buy a ticket for any movie at
              Movieticketz <br></br>and win 4 FREE Chilli Cheese Nuggets at KFC!{" "}
              <br></br>*The offer is only valid for physical purchases at the
              cinema!
            </p>
            <span
              style={{ fontSize: "12px", color: "#fff", marginLeft: "2rem" }}
            >
              01.06.2023 - 01.08.2023
            </span>
          </div>
        </div>
        <div className="events-containers2">
          <div className="events-item-containers2">
            <div className="events-img-containers">
              <img src={img2} alt="event 2" />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", color: "#fff", marginLeft: "2rem" }}>
              SUPER OFFER FOR STUDENTS!
            </h3>
            <p style={{ fontSize: "14px", color: "#fff", marginLeft: "2rem" }}>
              Movieticketz brings a special menu for students:
              <br></br>A ticket for 2D movies, Popcorn and drinks starting from
              €5. <br></br>The price may increase from €0.40 to €1.20 for movies
              over 120 min. <br></br>The offer is only valid for Monday.
            </p>
            <span
              style={{ fontSize: "12px", color: "#fff", marginLeft: "2rem" }}
            >
              01.01.2020 - 01.01.2026
            </span>
          </div>
        </div>
      </div>
      <div className="events2">
        <div className="events-containers3">
          <div className="events-item-containers3">
            <div className="events-img-containers">
              <img src={img3} alt="event 3" />
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: "18px", color: "#fff", marginLeft: "2rem" }}>
              INTERNATIONAL CHILDREN'S DAY!
            </h3>
            <p style={{ fontSize: "14px", color: "#fff", marginLeft: "2rem" }}>
              JUNE 1, 12:00 <br></br>Movieticketz organizes an event on June 1,
              <br></br>
              with a selected program of animated films <br></br> with a special
              ticket price of only €2.<br></br> The activities will be held in
              the cinema in
              <br></br>Prishtina and Prizren.
            </p>
            <span
              style={{ fontSize: "12px", color: "#fff", marginLeft: "2rem" }}
            >
              01.01.2020 - 01.01.2026
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
