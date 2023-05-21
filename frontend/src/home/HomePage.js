import React, { useState } from "react";
import Homes from "../components/homes/Homes";
import Upcomming from "../components/upcomming/Upcomming";
import upcome from "../upcome";
import ContactUsModal from "../pages/Contactus/contactus";

const HomePage = () => {
  const [items, setItems] = useState(upcome);
  return (
    <>
      <ContactUsModal />
      <Homes />
      <Upcomming items={items} title="Upcomming Movies" />
    </>
  );
};

export default HomePage;
