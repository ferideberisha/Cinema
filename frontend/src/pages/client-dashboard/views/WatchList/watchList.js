import React from "react";

function WatchList() {
  // Assuming you have a list of movies in the watchlist stored in the state
  const [watchlist, setWatchlist] = React.useState([]);

  // Function to remove a movie from the watchlist
  const removeMovieFromWatchlist = (movieId) => {
    // Remove the movie with the specified ID from the watchlist
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
  };

  return (
    <div>
      <h2>Watch List</h2>
      {watchlist.length === 0 ? (
        <p>No movies found in the watch list.</p>
      ) : (
        <ul>
          {watchlist.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <button onClick={() => removeMovieFromWatchlist(movie.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WatchList;
