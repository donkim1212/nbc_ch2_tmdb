// console.log("search-movie.js loaded");
import { addCard, emptyCards } from "./card.js";
import { fetchMoviesList } from "./fetch-movies-db.js";

let cachedList = null;

const searchMoviesByTitle = async (title) => {
    await setCachedMoviesList(false);
    let filteredList = cachedList?.filter(function (data) {
        return data["title"].toLowerCase().includes(title);
    });
    if (!filteredList) return;

    emptyCards();
    title = title.toLowerCase();

    filteredList.forEach(data => {
        let imageURL = "https://image.tmdb.org/t/p/w300" + data["poster_path"];
        addCard(imageURL, data["title"], data["overview"], data["vote_average"], data["id"]);
    });
}

const setCachedMoviesList = async (isLocal) => {
    if (!cachedList) {
        cachedList = await fetchMoviesList(isLocal);
        console.log("cached new list from " + (isLocal ? "local json." : "TMDB."));
    }
    console.log("cached list already exists.");
}

const clearCachedList = () => {
    cachedList = null;
    console.log("cleared cachedList");
}

export { searchMoviesByTitle, setCachedMoviesList, clearCachedList };