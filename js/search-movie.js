// console.log("search-movie.js loaded");
import { addCard, emptyCards } from "./card.js";
import { moviesList } from "./fetch-movies-db.js";

const searchMoviesByTitle = (title) => {
    if (!moviesList) return;
    emptyCards();
    title = title.toLowerCase();
    
    let filteredList = moviesList.filter(function (data) {
        return data["title"].toLowerCase().includes(title);
    });

    filteredList.forEach(data => {
        let imageURL = "https://image.tmdb.org/t/p/w300" + data["poster_path"];
        addCard(imageURL, data["title"], data["overview"], data["vote_average"], data["id"]);
    });
}

export { searchMoviesByTitle };