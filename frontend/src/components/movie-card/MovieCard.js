import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import React, { useState } from "react";
import "./movie-card.scss";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  const [isFavorite, setIsFavorite] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const toggleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowDropdown(false);
  };

  const handleRatingItemClick = (ratingValue) => {
    if (rating === ratingValue) {
      setRating(0);
    } else {
      setRating(ratingValue);
    }
    handleClose();
  };

  const renderRatingStars = (numOfStars) => {
    const stars = [];
    for (let i = 1; i <= numOfStars; i++) {
      stars.push(
        <StarIcon
          key={i}
          style={{ color: rating >= i ? "#FF007F" : "gray" }}
          onClick={() => handleRatingItemClick(i)}
        />
      );
    }

    return stars;
  };

  return (
    <>
      <div className="movie-card-container">
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <div
            className={`favorite-overlay ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? (
              <FavoriteIcon style={{ color: "#FF007F" }} />
            ) : (
              <FavoriteBorderOutlinedIcon style={{ color: "#FF007F" }} />
            )}
          </div>

          <Link to={link}>
            <Button>
              <i className="bx bx-play"></i>
              Book
            </Button>
          </Link>

          <div className="dropdown-container">
            <div className="more-icon" onClick={toggleDropdown}>
              <MoreVertIcon style={{ color: "#FF007F" }} />
            </div>

            {showDropdown && (
              <div className="dropdown-menu" onMouseLeave={handleClose}>
                <ul>
                  <li onClick={toggleWatchlist}>
                    {isWatchlisted ? (
                      <BookmarkIcon style={{ color: "#FF007F" }} />
                    ) : (
                      <BookmarkBorderOutlinedIcon
                        style={{ color: "#FF007F" }}
                      />
                    )}
                    <span>Watchlist</span>
                  </li>
                  <li className="rating-item">
                    <div
                      className="rating-dropdown"
                      aria-controls="rating-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      {rating > 0 ? (
                        <StarIcon style={{ color: "#FF007F" }} />
                      ) : (
                        <StarBorderOutlinedIcon style={{ color: "#FF007F" }} />
                      )}
                      <span>Your Rating</span>
                      <ArrowDropDownIcon style={{ color: "#FF007F" }} />
                    </div>
                    <Menu
                      id="rating-menu"
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem>{renderRatingStars(5)}</MenuItem>
                    </Menu>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="movie-title">
          <h3>{item.title || item.name}</h3>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
