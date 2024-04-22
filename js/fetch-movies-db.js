let isLocal = true; // change this value to false to load data from TMDB

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMzI0NmY0ZjRiYTJiYTY1NDEzN2MxYmMzMzc2ZWU2OSIsInN1YiI6IjY2MjVjMDc1MTk3ZGU0MDE2NDJhYmZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kmOjBw4K_BsqUow3GnSo1j86TESZ8GX2y01ioMGYrOc'
    }
};

/**
 * 
 * @returns movies list from local file temp.json
 */
const getLocalList = async () => {
    let temp = {};
    await fetch("./temp.json")
        .then(res => res.json())
        .then(data => {
            temp = data;
            console.log("Local list retrieved.");
        })
        .catch(err => console.log(err));
    return temp;
}

/**
 * @param 
 * @returns list of movies from TMDB, or from local file if TMDB is not available.
 */
const getTopRatedMoviesList = async (isLocal) => {
    let list = (isLocal) ? { results:await getLocalList() } : {};
    if (!isLocal) await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(res => res.json())
        .then(data => {
            list = data;
            console.log("TMDB list retrieved.");
        })
        .catch(err => {
            console.error(err);
        });
    console.log("topRatedMoviesList:");
    console.log(list);
    return list;
}

const moviesList = (await getTopRatedMoviesList(isLocal))["results"];

export { moviesList };