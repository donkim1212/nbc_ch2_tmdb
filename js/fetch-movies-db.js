let isLocal = false; // change this value to false to load data from TMDB

const URL = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
const LOCAL_FILE = './temp.json';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzI0NmY0ZjRiYTJiYTY1NDEzN2MxYmMzMzc2ZWU2OSIsInN1YiI6IjY2MjVjMDc1MTk3ZGU0MDE2NDJhYmZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kmOjBw4K_BsqUow3GnSo1j86TESZ8GX2y01ioMGYrOc'
    }
};

/**
 * @param 
 * @returns list of movies from TMDB, or from local file if TMDB is not available.
 */
const getTopRatedMoviesList = async (isLocal) => {
    let list = {};
    await fetch(isLocal? LOCAL_FILE : URL, options)
        .then(res => res.json())
        .then(data => {
            list = data['results'] || data;
            // console.log("TMDB list retrieved.");
        })
        .catch(err => {
            console.error(err);
        });
    console.log((isLocal? "Local " : "TMDB ") + "topRatedMoviesList:");
    console.log(list);
    return list;
}

const moviesList = (await getTopRatedMoviesList(isLocal));

const setIsLocal = (bool) => {
    isLocal = bool;
}

const getIsLocal = () => {
    isLocal;
}

export { moviesList, setIsLocal, getIsLocal };