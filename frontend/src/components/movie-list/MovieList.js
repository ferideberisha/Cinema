import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";

import Button from "../button/Button";

import axios from "../../api/axios";
import apiConfig from "../../api/apiConfig";

import MovieCard from "../movie-card/MovieCard";

const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get("/api/movies");
        setItems(response.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getList();
  }, [props.status]);

  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} status={props.status} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  // category: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default MovieList;
