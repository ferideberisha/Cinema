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
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  const [isFavorite, setIsFavorite] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [rating, setRating] = useState(0);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [archivedAlert, setArchivedAlert] = useState(false);
  const [removedFromFavoritesAlert, setRemovedFromFavoritesAlert] =
    useState(false);
  const [removedFromWatchListAlert, setRemovedFromWatchListAlert] =
    useState(false);
  const [ratingAlert, setRatingAlert] = useState(false);

  const toggleFavorite = () => {
    if (!isFavorite) {
      setIsFavorite(true);
      setArchivedAlert(true);
    } else {
      setIsFavorite(false);
      setRemovedFromFavoritesAlert(true);
    }
  };

  const toggleWatchlist = () => {
    if (!isWatchlisted) {
      setIsWatchlisted(true);
      setArchivedAlert(true);
    } else {
      setIsWatchlisted(false);
      setRemovedFromWatchListAlert(true);
    }
  };

  const handleRemovedFromFavoritesAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRemovedFromFavoritesAlert(false);
  };

  const handleRemovedFromWatchListAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRemovedFromWatchListAlert(false);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
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
    setRatingAlert(true);
    handleClose();
  };

  const handleRatingAlertClose = () => {
    setRatingAlert(false);
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

  const handleArchivedAlertClose = () => {
    setArchivedAlert(false);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      setArchivedAlert(true);
    } else {
      setRemovedFromFavoritesAlert(true);
    }
  };

  return (
    <>
      <div className="movie-card-container">
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <div
            className={`favorite-overlay ${isFavorite ? "active" : ""}`}
            onClick={handleFavoriteClick}
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

      <Snackbar
        open={archivedAlert}
        autoHideDuration={1000}
        onClose={handleArchivedAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleArchivedAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {isFavorite
            ? `${item.title || item.name} added to your favorite list`
            : isWatchlisted
            ? `${item.title || item.name} added to your watch list`
            : ""}
        </Alert>
      </Snackbar>
      <Snackbar
        open={removedFromFavoritesAlert}
        autoHideDuration={1000}
        onClose={handleRemovedFromFavoritesAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleRemovedFromFavoritesAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {`${item.title || item.name} removed from your favorite list`}
        </Alert>
      </Snackbar>

      <Snackbar
        open={removedFromWatchListAlert}
        autoHideDuration={1000}
        onClose={handleRemovedFromWatchListAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleRemovedFromWatchListAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {`${item.title || item.name} removed from your watch list`}
        </Alert>
      </Snackbar>
      <Snackbar
        open={ratingAlert}
        autoHideDuration={1000}
        onClose={handleRatingAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleRatingAlertClose}
          severity="info"
          sx={{ width: "100%" }}
        >
          {`Your rating (${rating} star${
            rating !== 1 ? "s" : ""
          }) has been saved`}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MovieCard;
