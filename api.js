import axios from "axios";

const TMDB_KEY = "73980cce50d7fc8bd0eaf2f5ed9525c9";

const makeRequest = (path, params) =>
  axios.get(`https://api.themoviedb.org/3${path}`, {
    params: {
      ...params,
      api_key: TMDB_KEY
    }
  });

const getAnything = async (path, params = {}) => {
  try {
    const {
      data: { results },
      data
    } = await makeRequest(path, params);
    return [results || data, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
};

export const movieApi = {
  nowPlaying: () => getAnything("/movie/now_playing"),
  popular: () => getAnything("/movie/popular"),
  upcoming: () => getAnything("/movie/upcoming", { region: "kr" }),
  search: query => getAnything("/search/movie", { query }),
  movie: id => getAnything(`/movie/${id}`),
  discover: () => getAnything("/discover/movie")
};

export const tvApi = {
  today: () => getAnything("/tv/airing_today"),
  thisWeek: () => getAnything("/tv/on_the_air"),
  topRated: () => getAnything("/tv/top_rated"),
  popular: () => getAnything("/tv/popular"),
  search: query => getAnything("/search/tv", { query }),
  show: id => getAnything(`/tv/${id}`)
};

export const apiImage = path =>
  path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "https://images.unsplash.com/photo-1584486188544-dc2e1417aff1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
