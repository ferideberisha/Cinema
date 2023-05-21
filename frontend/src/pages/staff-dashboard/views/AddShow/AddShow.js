import React, { useState } from "react";

function AddShow() {
  const [showData, setShowData] = useState({
    movieId: "",
    theaterId: "",
    showTime: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShowData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the show data submission or API call here
    console.log("Show data:", showData);
    // Reset the form
    setShowData({ movieId: "", theaterId: "", showTime: "" });
  };

  return (
    <div>
      <h2>Add Show</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movieId">Movie ID:</label>
          <input
            type="text"
            id="movieId"
            name="movieId"
            value={showData.movieId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="theaterId">Theater ID:</label>
          <input
            type="text"
            id="theaterId"
            name="theaterId"
            value={showData.theaterId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="showTime">Show Time:</label>
          <input
            type="text"
            id="showTime"
            name="showTime"
            value={showData.showTime}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Show</button>
      </form>
    </div>
  );
}

export default AddShow;
