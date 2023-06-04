const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "65ef3d7c21044c8268020ff5731427a9",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  castList: (movieId) =>
    `https://api.themoviedb.org/3/movies/${movieId}/credits?api_key=65ef3d7c21044c8268020ff5731427a9`,
};

export default apiConfig;
