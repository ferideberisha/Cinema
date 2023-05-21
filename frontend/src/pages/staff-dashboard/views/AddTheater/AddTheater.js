import React, { useState } from "react";

function AddTheater() {
  const [theaterData, setTheaterData] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTheaterData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the theater data submission or API call here
    console.log("Theater data:", theaterData);
    // Reset the form
    setTheaterData({ name: "", location: "", capacity: "" });
  };

  return (
    <div>
      <h2>Add Theater</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={theaterData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={theaterData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="text"
            id="capacity"
            name="capacity"
            value={theaterData.capacity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Theater</button>
      </form>
    </div>
  );
}

export default AddTheater;
