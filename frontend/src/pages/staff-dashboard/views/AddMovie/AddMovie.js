import React, { useState } from "react";

function AddMovie() {
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    duration: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovieData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the movie data submission or API call here
    console.log("Movie data:", movieData);
    // Reset the form
    setMovieData({ title: "", genre: "", duration: "" });
  };

  return (
    <div>
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={movieData.duration}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;
