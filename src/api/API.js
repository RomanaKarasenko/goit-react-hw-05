import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const options = {
  headers: {
    // Замість api_read_access_token вставте свій токен
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmVkNmEyOTJhYmE1MWY4MjQ0NTk0MTNhOWVkZGIwMCIsInN1YiI6IjY2MTc5ZjZmZTI5NWI0MDE2M2FmMzU4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WwbkRDSBRc8yDxLA6XDOU2dwJEB4eaZzWfY_OKE8QPw",
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(
    "trending/movie/day?language=en-US",
    options
  );
  return data.results;
};

export const fetchMoviesSearch = async (query, page = 1) => {
  const { data } = await axios.get("search/movie", {
    ...options,
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
  });
  return data;
};

export const fetchMovieDetails = async (movieId) => {
  const { data } = await axios.get(`movie/${movieId}?language=en-US`, options);
  return data;
};

export const fetchMovieCredits = async (movieId) => {
  const { data } = await axios.get(
    `movie/${movieId}/credits?language=en-US`,
    options
  );
  return data.cast;
};
export const fetchMovieReviews = async (movieId) => {
  const { data } = await axios.get(
    `movie/${movieId}/reviews?language=en-US`,
    options
  );
  return data.results;
};
