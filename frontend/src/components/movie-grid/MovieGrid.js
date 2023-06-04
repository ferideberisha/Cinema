import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import axios from "../../api/axios";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword = "" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      try {
        let response = null;
        if (keyword === "") {
          response = await axios.get("/api/movies");
        } else {
          response = await axios.get(`/api/search/${props.category}`, {
            params: {
              query: keyword,
            },
          });
        }
        setItems(response.data);
        setTotalPage(response.data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    try {
      let response = null;
      if (keyword === "") {
        response = await axios.get("/api/movies", {
          params: {
            page: page + 1,
          },
        });
      } else {
        response = await axios.get(`/api/search/${props.category}`, {
          params: {
            page: page + 1,
            query: keyword,
          },
        });
      }
      setItems([...items, ...response.data]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="section mb-3">
        <MovieSearch
          category={props.category}
          keyword={keyword}
          navigate={navigate}
        />
      </div>
      <div className="movie-grid">
        {items && items.length > 0 ? (
          items.map((item, i) => (
            <MovieCard category={props.category} item={item} key={i} />
          ))
        ) : (
          <p>No items found.</p>
        )}
      </div>
      {page < totalPage && (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      )}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = props.navigate;
  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/movies/search/${keyword}`);
    }
  }, [keyword, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            goToSearch();
          }
        }}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};

export default MovieGrid;
