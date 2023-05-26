import React, { useState } from "react";

const WatchlistButton = () => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
  };

  return (
    <button
      className={`watchlist-button ${isInWatchlist ? "active" : ""}`}
      onClick={toggleWatchlist}
    >
      {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
};

export default WatchlistButton;
