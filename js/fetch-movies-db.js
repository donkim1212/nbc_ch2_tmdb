const isLocal = false; // change this value to true to load data from local
const URL = 'https://api.themoviedb.org/3/movie/';
const TOP_RATED_LOCAL_FILE = './temp.json';
const DETAIL_LOCAL_FILE = './detailTemp.json';
const CREDITS_LOCAL_FILE = './creditsTemp.json';

const options = {
    method: "GET",
    headers: {
    accept: "application/json",
    Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzI0NmY0ZjRiYTJiYTY1NDEzN2MxYmMzMzc2ZWU2OSIsInN1YiI6IjY2MjVjMDc1MTk3ZGU0MDE2NDJhYmZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kmOjBw4K_BsqUow3GnSo1j86TESZ8GX2y01ioMGYrOc",
    },
};

/**
 * Fetches the top rated movies list.
 * Either from local storage or from TMDB based on the `isLocal` flag.
 * 
 * @returns {Object[]} - Returns an array of movie objects from session storage or API response.
 */
const fetchMoviesList = async () => {
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
        return [];
    }
}

/**
 * Fetches the movie list using the provided movie ID. 
 * Either from local storage or from TMDB based on the `isLocal` flag.
 * 
 * @param {number} movieId - The ID of the movie to fetch the list for.
 * @returns {Object} - he fetched movie detail object or null if an error occurs.
 */
const fetchMovieDetail = async (movieId) => {
    try{
        const movieDetail = sessionStorage.getItem(`${movieId}Detail`);

        if(movieDetail){
            return JSON.parse(movieDetail);
        }else{
            let data = await (await fetch(isLocal? DETAIL_LOCAL_FILE : `${URL}${movieId}?language=en-US&page=1`, options)).json();
            sessionStorage.setItem(`${movieId}Detail`, JSON.stringify(data));
            return data;
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * Fetches the movie list using the provided movie ID. 
 * Either from local storage or from TMDB based on the `isLocal` flag.
 * 
 * @param {number} movieId - The ID of the movie to fetch the list for.
 * @returns {Object} - he fetched movie Credits object or null if an error occurs.
 */
const fetchMovieCredits = async (movieId) => {
    try{
        const movieCredits = sessionStorage.getItem(`${movieId}Credit`);
        if(movieCredits){
            return JSON.parse(movieCredits);
        }else{
            let data = await (await fetch(isLocal? CREDITS_LOCAL_FILE : `${URL}${movieId}/credits?language=en-US`, options)).json();
            sessionStorage.setItem(`${movieId}Credits`, JSON.stringify(data));
            return data;
        }
    } catch (err) {
        console.log(err);
    }
}

export { fetchMoviesList, fetchMovieDetail, fetchMovieCredits };