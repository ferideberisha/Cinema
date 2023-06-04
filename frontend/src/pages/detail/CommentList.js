import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "../../api/axios";

const CommentList = ({ userId, movieId }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { user } = useAuthContext();
  console.log(user);

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `/api/users/${user.id}/reviews/${movieId}`
      );

      if (response.status === 200) {
        const reviewsData = response.data;
        setReviews(reviewsData.reviews);
      } else {
        const errorData = response.data;
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setError("Internal server error");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate the comment
      if (!comment) {
        setError("Comment is required.");
        return;
      }

      // Make a POST request to the review endpoint
      const response = await axios.post(
        `/api/users/${user.id}/reviews/${movieId}`,
        {
          comment: comment,
        }
      );

      // Handle the response
      if (response.status === 201) {
        console.log("Review added successfully");
        setComment("");
        setError(null);
        // Fetch the updated reviews
        fetchReviews();
      } else {
        const errorData = response.data;
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error adding review:", error);
      setError("Internal server error");
    }
  };

  return (
    <div className="comment-list">
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <div className="comment-input">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a public comment..."
            className="comment-textarea"
          />
          <button type="submit" className="comment-submit">
            Comment
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="reviews">
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <div className="review-content">
              <label className="review-username">
                {user.firstname + " " + user.lastname + " : "}
              </label>
              <label className="review-comment">{review.comment}</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
