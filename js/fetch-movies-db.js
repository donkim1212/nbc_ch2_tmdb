// const isLocal = true; // change this value to false to load data from TMDB
const URL = 'https://api.themoviedb.org/3/movie/';
const TOP_RATED_LOCAL_FILE = './temp.json';
const DETAIL_LOCAL_FILE = './detailTemp.json';
const CREDITS_LOCAL_FILE = './creaditTemp.json';

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
 * @returns {string} - Returns the key for session storage
 */
const fetchMoviesList = async (isLocal) => {
    try{
        const moviesList = sessionStorage.getItem('moviesList');

        if(moviesList){
            return JSON.parse(moviesList);
        }else{
            let data = await (await fetch(isLocal? TOP_RATED_LOCAL_FILE : `${URL}top_rated?language=en-US&page=1`, options)).json();
            sessionStorage.setItem('moviesList', JSON.stringify(data["results"]));
            return data["results"];
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Fetches the movie list using the provided movie ID.
 * 
 * @param {boolean} isLocal true uses local, false uses TMDB list
 * @param {number} movieId - The ID of the movie to fetch the list for.
 * @returns {Array} - The fetched movie detail list.
 */
const fetchMovieDetail = async (isLocal, movieId) => {
    try{
        const movieDetail = sessionStorage.getItem(`${movieId}Detail`);

        if(movieDetail){
            return JSON.parse(movieDetail);
        }else{
            let data = await (await fetch(isLocal? DETAIL_LOCAL_FILE : `${URL}${movieId}?language=en-US&page=1`, options)).json();
            sessionStorage.setItem(`${movieId}Detail`, JSON.stringify(data["results"]));
            return data["results"];
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Fetches the movie list using the provided movie ID.
 * 
 * @param {boolean} isLocal true uses local, false uses TMDB list
 * @param {number} movieId - The ID of the movie to fetch the list for.
 * @returns {Array} - The fetched movie credits list.
 */
const fetchMovieCredits = async (isLocal, movieId) => {
    try{
        const movieCredits = sessionStorage.getItem(`${movieId}Credit`);
        if(movieCredits){
            return JSON.parse(movieCredits);
        }else{
            let data = await (await fetch(isLocal? CREDITS_LOCAL_FILE : `${URL}${movieId}/credits?language=en-US`, options)).json();
            sessionStorage.setItem(`${movieId}Credits`, JSON.stringify(data["results"]));
            return data["results"];
        }
    } catch (err) {
        console.log(err);
    }
}

export { fetchMoviesList, fetchMovieDetail, fetchMovieCredits };