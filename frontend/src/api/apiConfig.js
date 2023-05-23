const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: "65ef3d7c21044c8268020ff5731427a9",
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
};

export default apiConfig;
