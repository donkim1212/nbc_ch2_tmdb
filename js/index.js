import { getSearchBarContainer, getSearchBar, searchMoviesByTitle, clearCachedList, searchMoviesDetailByMovieId, searchMoviesCreditsByMovieId } from "./search-movie.js";
import { getSortButtonContainer } from "./search-filter.js";
import { getCardContainer, setCardClickEventFunc } from "./card.js";
import { mountGetDetailFunc, mountGetCreditFunc, getInfoContainer, infoLoader } from "./movie-info-loader.js";
import { getReviewContainer, reviewLoader } from "./review.js";
import { toggleElements, toggleEnabler } from "./simple-toggler.js";

const SEARCH_CONTAINER_ID = "search-container-01";
const CARD_CONTAINER_ID = "card-wrapper-01";
const INFO_REVIEW_WRAPPER_ID = "info-review-wrapper-01";

setInterval(clearCachedList, 60000);
setCardClickEventFunc(infoLoader, reviewLoader);
const $searchContainer = document.getElementById(SEARCH_CONTAINER_ID);
const $cardContainer = document.getElementById(CARD_CONTAINER_ID);
const $infoReviewWrapper = document.getElementById(INFO_REVIEW_WRAPPER_ID);

$searchContainer.appendChild(getSearchBarContainer());
getSearchBarContainer().appendChild(getSortButtonContainer());
$cardContainer.appendChild(getCardContainer());
$infoReviewWrapper.appendChild(getInfoContainer());
$infoReviewWrapper.appendChild(getReviewContainer());

// enableToggle($infoReviewWrapper);
// setCardContainer($cardContainer);
// setCardContainerInfo($cardContainer);
// setCardContainerReview($cardContainer);
// setInfoReviewWrapper($infoReviewWrapper);

mountGetDetailFunc(searchMoviesDetailByMovieId);
mountGetCreditFunc(searchMoviesCreditsByMovieId);

searchMoviesByTitle(""); // load all movies list
getSearchBar().focus();

// mountInfoLoader(loadInfoContainer);
// mountReviewLoader(reviewLoader);




