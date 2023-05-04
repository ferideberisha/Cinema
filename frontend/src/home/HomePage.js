import React, { useState } from "react";
import Homes from "../components/homes/Homes";
import Upcomming from "../components/upcomming/Upcomming";
import upcome from "../upcome";

const HomePage = () => {
  const [items, setItems] = useState(upcome);
  return (
    <>
      <Homes />
      <Upcomming items={items} title="Upcomming Movies" />
    </>
  );
};

export default HomePage;

// const cinemaData = {
//   home: homeData,
//   upcome: upcome,
//   latest: latest,
//   Trending: trending,
// };
