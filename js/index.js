import { searchMoviesByTitle, clearCachedList, searchMoviesDetailByMovieId, searchMoviesCreditsByMovieId } from "./search-movie.js";
import { setCardContainer, mountInfoLoader, mountReviewLoader } from "./card.js";
import { setCardContainer as setCardContainerInfo, setDetailFunc, setCreditFunc, loadInfoContainer } from "./movie-info-loader.js";
import { searchByFilter } from "./search-filter.js";
import { reviewLoader, setCardContainer as setCardContainerReview } from "./review.js";

const CARD_CONTAINER_ID = "card-container-01";

setInterval(clearCachedList, 60000);
const cc = document.getElementById(CARD_CONTAINER_ID);  
setCardContainer(cc);
setCardContainerInfo(cc);
setCardContainerReview(cc);
searchMoviesByTitle(""); // load all movies list
setDetailFunc(searchMoviesDetailByMovieId);
setCreditFunc(searchMoviesCreditsByMovieId);
mountInfoLoader(loadInfoContainer);
mountReviewLoader(reviewLoader);

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
