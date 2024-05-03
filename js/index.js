import { searchMoviesByTitle, clearCachedList, searchMoviesDetailByMovieId, searchMoviesCreditsByMovieId } from "./search-movie.js";
import { setCardContainer, getCardContainer } from "./card.js";
import { setCardContainer as setCardContainerInfo, setDetailFunc, setCreditFunc } from "./movie-info-loader.js";
import { searchByFilter } from "./search-filter.js" 

setInterval(clearCachedList, 60000);
const cc = document.getElementById("card-container-01");
setCardContainer(cc);
setCardContainerInfo("card-container-01");
searchMoviesByTitle(""); // load all movies list
setDetailFunc(searchMoviesDetailByMovieId);
setCreditFunc(searchMoviesCreditsByMovieId);

const $searchButton = document.getElementById("search-btn-01");
const $searchBar = document.getElementById("search-bar-01");
$searchBar.focus();

$searchBar.addEventListener("keypress", function () {
  if (window.event.keyCode == 13) {
    search();
  }
});

$searchButton.addEventListener("click", function () {
  search();
});

function search() {
  let searched = $searchBar.value;
  searchMoviesByTitle(searched);
}
