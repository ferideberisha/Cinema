import React, { useState } from "react";

const RatingButton = ({ showRating }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  if (!showRating) {
    return null; // Hide the rating component if showRating is false
  }

  return (
    <div className="rating">
      <span className="rating-label">Rate:</span>
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            className={`rating-star ${value <= rating ? "active" : ""}`}
            onClick={() => handleRatingChange(value)}
          >
            &#9733;
          </button>
        ))}
      </div>
    </div>
  );
};

export default RatingButton;
