import React, { useState } from "react";
import Homes from "../components/homes/Homes";
import Trending from "../components/trending/Trending";
import  Upcomming from "../components/upcomming/Upcomming";
import { homeData, upcome, latest, trending } from "../dummyData";
import '../App.css'
import '../components/homes/home.css'

const cinemaData = {
  home: homeData,
  upcome: upcome,
  latest: latest,
  Trending: trending,
};

const HomePage = () => {
  const [upcome] = useState(homeData);
  const [latestItems] = useState(latest);
  const [recommendedItems] = useState(homeData);

  return (
    <>
      <Homes />
      <Upcomming items={upcome} title="Upcomming Movies" />
      <Upcomming items={latestItems} title="Latest Movies" />
      <Upcomming items={recommendedItems} title="Recommended Movies" />
      <Trending />
    </>
  );
};

export default HomePage;
