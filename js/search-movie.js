// console.log("search-movie.js loaded");
import { addCard, emptyCards } from "./card.js";
import { fetchMoviesList } from "./fetch-movies-db.js";

const searchMoviesByTitle = async (title) => {
  title = title.toLowerCase();
  await setCachedMoviesList(false);

  let filteredList = JSON.parse(sessionStorage.getItem("cachedList"))?.filter(
    function (data) {
      return data["title"].toLowerCase().includes(title);
    }
  );
  if (!filteredList) return;

  emptyCards();

  filteredList.forEach((data) => {
    let imageURL = "https://image.tmdb.org/t/p/w300" + data["poster_path"];
    addCard(
      imageURL,
      data["title"],
      data["overview"],
      data["vote_average"],
      data["id"]
    );
  });
};

const setCachedMoviesList = async (isLocal) => {
  if (!window.sessionStorage.getItem("cachedList")) {
    window.sessionStorage.setItem(
      "cachedList",
      JSON.stringify(await fetchMoviesList(isLocal))
    );
    // console.log("cached new list from " + (isLocal ? "local json." : "TMDB."));
    return;
  }
  // console.log("Loading cached list");
};

const clearCachedList = () => {
  window.sessionStorage.removeItem("cachedList");
  // console.log("cleared cachedList");
};

export { searchMoviesByTitle, setCachedMoviesList, clearCachedList };
