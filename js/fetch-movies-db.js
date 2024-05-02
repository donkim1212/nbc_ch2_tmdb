// let isLocal = true; // change this value to false to load data from TMDB

const URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const LOCAL_FILE = "./temp.json";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzI0NmY0ZjRiYTJiYTY1NDEzN2MxYmMzMzc2ZWU2OSIsInN1YiI6IjY2MjVjMDc1MTk3ZGU0MDE2NDJhYmZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kmOjBw4K_BsqUow3GnSo1j86TESZ8GX2y01ioMGYrOc",
  },
};

/**
 *
 * @param {boolean} isLocal true uses local, false uses TMDB list
 * @returns list of top rated movies from retrieved data.
 */
const fetchMoviesList = async (isLocal) => {
  try {
    let data = await (await fetch(isLocal ? LOCAL_FILE : URL, options)).json();
    // console.log(data);
    return data["results"];
  } catch (err) {
    console.log(err);
  }
};

export { fetchMoviesList };
