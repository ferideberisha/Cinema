import React, { useState } from "react";
import "./home.css";
import homeData from "../../homeData";
import Home from "./Home";

const Homes = () => {
  const [items, setItems] = useState(homeData);

  return (
    <>
      <section className="home">
        <Home item={setItems} />
      </section>
      <div className="mragin"></div>
    </>
  );
};

export default Homes;
