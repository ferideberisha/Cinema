import React from "react";
import { useParams } from "react-router";

import MovieGrid from "../components/movie-grid/MovieGrid";

const Catalog = () => {
  const { status, keyword } = useParams();

  return (
    <>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid status={status} keyword={keyword} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
