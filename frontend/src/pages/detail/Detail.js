import { useEffect, useState } from "react";
import { useParams } from "react-router";
import apiConfig from "../../api/apiConfig";
import "./detail.scss";
import CommentList from "./CommentList";
import "./commentList.css";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { useAuthContext } from "../../hooks/useAuthContext";

const Detail = () => {
  const link = "/theaters";
  const { id } = useParams();
  const { user } = useAuthContext();
  console.log("User ID:", user.id);

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axios.get(`/api/movies/${id}`);
        const data = response.data;
        data.genre_ids = data.genre_ids.split(", ");
        setItem(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };

    getDetail();
  }, [id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genre_ids &&
                  item.genre_ids.slice(0, 5).map((genreId, i) => (
                    <span key={i} className="genres__item">
                      {genreId}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div>
                <Link to={link}>
                  <Button>
                    <i className="bx bx-play"></i>
                    Book
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="section mb-3">
            <div className="section__header mb-2">
              <h2 style={{ marginLeft: "10rem", color: "white" }}>Comments</h2>
            </div>
            <CommentList movieId={id} />{" "}
            {/* Pass the movieId from URL parameters */}
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
