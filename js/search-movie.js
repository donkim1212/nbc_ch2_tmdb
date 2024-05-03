// console.log("search-movie.js loaded");
import { addCard, emptyCards } from "./card.js";
import { fetchMovieCredits, fetchMovieDetail, fetchMoviesList } from "./fetch-movies-db.js";

const IMG_URL = "https://image.tmdb.org/t/p/w300";

const searchMoviesByTitle = async (title) => {
    title = title.toLowerCase();

    let moviesList = await fetchMoviesList(l);
    let filteredList = moviesList?.filter(function (data) {
        return data["title"].toLowerCase().includes(title);
    });
    if (!filteredList || filteredList.length === 0) {
        return;
    }
    emptyCards();

    filteredList.forEach(data => {
        let imageURL = IMG_URL + data["poster_path"];
        addCard(imageURL, data["title"], data["overview"], data["vote_average"], data["id"]);
    });
}

const searchMoviesDetailByMovieId = async (movieId) => {
    try{
        let detailMovie = await fetchMovieDetail(movieId);
        return detailMovie;
    } catch(error) {
        console.log(error);
        return null;
    }

}

const searchMoviesCreditsByMovieId = async (movieId) => {
    try{
        let creditsMovie = await fetchMovieCredits(movieId);
        return creditsMovie
    }catch(error) {
        console.log(error);
        return null;
    }
}

const clearCachedList = () => {
    window.sessionStorage.removeItem("cachedList");
  // console.log("cleared cachedList");
};

export { searchMoviesByTitle, searchMoviesCreditsByMovieId, searchMoviesDetailByMovieId, clearCachedList};