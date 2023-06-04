import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
};

export const movieStatus = {
  IN_PRODUCTION: "In Production",
  RELEASED: "Released",
};

// export const movieType = {
//   upcoming: "upcoming",
//   popular: "popular",
//   top_rated: "top_rated",
// };

const tmdbApi = {
  getMoviesList: (status, params) => {
    const url = "movie/" + movieStatus[status];
    return axiosClient.get(url, params);
  },

  // getVideos: (cate, id) => {
  //   const url = category[cate] + "/" + id + "/videos";
  //   return axiosClient.get(url, { params: {} });
  // },
  search: (cate, params) => {
    const url = "search/" + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (cate, id, params) => {
    const url = category[cate] + "/" + id;
    return axiosClient.get(url, params);
  },
  // credits: (cate, id) => {
  //   const url = category[cate] + "/" + id + "/credits";
  //   return axiosClient.get(url, { params: {} });
  // },
  // similar: (cate, id) => {
  //   const url = category[cate] + "/" + id + "/similar";
  //   return axiosClient.get(url, { params: {} });
  // },
};

export default tmdbApi;
