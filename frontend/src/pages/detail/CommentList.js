import React, { useState } from "react";

const CommentList = ({ itemId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      // Store the new comment
      const comment = {
        itemId,
        text: newComment,
        timestamp: new Date().getTime(),
      };
      setComments((prevComments) => [...prevComments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="comment-list">
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
      </form>

      <button type="submit">Submit</button>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <p>{comment.text}</p>
              <p>{comment.timestamp}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default CommentList;
