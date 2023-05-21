import React from "react";

function FavoriteMovies() {
  // Assuming you have a list of favorite movies stored in the state
  const [favoriteMovies, setFavoriteMovies] = React.useState([]);

  // Function to remove a movie from the favorites list
  const removeMovieFromFavorites = (movieId) => {
    // Remove the movie with the specified ID from the favorites list
    const updatedFavorites = favoriteMovies.filter(
      (movie) => movie.id !== movieId
    );
    setFavoriteMovies(updatedFavorites);
  };

  return (
    <div>
      <h2>Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <ul>
          {favoriteMovies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <button onClick={() => removeMovieFromFavorites(movie.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteMovies;
