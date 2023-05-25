import React from "react";
import { Link } from "react-router-dom";

import { OutlineButton } from "../components/button/Button";
import HeroSlide from "../components/hero-slide/HeroSlide";
import MovieList from "../components/movie-list/MovieList";
import ContactUsModal from "../pages/Contactus/contactus";

import { category, movieType } from "../api/tmdbApi";

const Home = () => {
  return (
    <>
      <HeroSlide />
      <ContactUsModal />

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2 style={{ marginBottom: "1rem" }}>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2 style={{ marginBottom: "1rem", marginTop: "3rem" }}>
              Upcoming
            </h2>
            <Link to="/movie">
              <OutlineButton className="small" style={{ marginBottom: "1rem" }}>
                View more
              </OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.upcoming} />
        </div>
      </div>
    </>
  );
};

export default Home;
