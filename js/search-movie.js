// console.log("search-movie.js loaded");
import { addCard, emptyCards } from "./card.js";
import { fetchMovieCredits, fetchMovieDetail, fetchMoviesList } from "./fetch-movies-db.js";

const IMG_URL = "https://image.tmdb.org/t/p/w300";

const $searchBarContainer = document.createElement('div');
$searchBarContainer.classList.add('search-bar-container');
const $searchBar = document.createElement('input');
$searchBar.setAttribute('type', 'text');
$searchBar.setAttribute('placeholder', '여기에 제목을 입력하세요.');
$searchBar.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        search();
    }
});
const $searchButton = document.createElement('button');
$searchButton.addEventListener("click", function () {
    console.log("search()");
    search();
});
const $buttonLabel = document.createElement('label');
$buttonLabel.innerText = '검색';

$searchButton.appendChild($buttonLabel);
$searchBarContainer.appendChild($searchBar);
$searchBarContainer.appendChild($searchButton);

const getSearchBarContainer = () => $searchBarContainer;
const getSearchBar = () => $searchBar;
const getSearchButton = () => $searchButton;

function search() {
    let searched = $searchBar.value;
    searchMoviesByTitle(searched);
}

const searchMoviesByTitle = async (title) => {
    title = title.toLowerCase();

    let moviesList = await fetchMoviesList();
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
        let detailMovie = await fetchMovieDetail(movieId);
        
        return detailMovie;
}

const searchMoviesCreditsByMovieId = async (movieId) => {
        let creditsMovie = await fetchMovieCredits(movieId);
        
        return creditsMovie
}

const clearCachedList = () => {
    window.sessionStorage.removeItem("cachedList");
  // console.log("cleared cachedList");
};

export {
    getSearchBarContainer,
    getSearchBar,
    getSearchButton,
    searchMoviesByTitle,
    searchMoviesCreditsByMovieId,
    searchMoviesDetailByMovieId,
    clearCachedList
};