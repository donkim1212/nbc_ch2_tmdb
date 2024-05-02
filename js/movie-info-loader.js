let $cardContainer = null;

const LOCAL_DETAIL = '../detail.json';
const LOCAL_CREDIT = '../credit.json';
const ACTOR_IMG_URL = 'https://image.tmdb.org/t/p/w154';

const $infoContainer = document.createElement('div');
const $infoLeft = document.createElement('div');
const $posterImg = document.createElement('img');

const $infoRight = document.createElement('div');
const $infoRightDivTop = document.createElement('div');
const $titleDiv = document.createElement('div');
const $titleH1 = document.createElement('h1');
// $titleH1.setAttribute('id', 'info-title');
const $tagDiv = document.createElement('div');
const $tagP = document.createElement('p');
const $ratingDiv = document.createElement('div');
const $ratingP = document.createElement('p');
const $otherDetailP = document.createElement('p');
// $ratingP.setAttribute('id', 'info-rating');

const $infoRightDivMiddle = document.createElement('div');
const $overviewDiv = document.createElement('div');

const $infoRightDivBottom = document.createElement('div');
const $castDiv = document.createElement('div');

// --------------------------------

$infoContainer.classList.add('info-container');
$infoLeft.classList.add('info-left');
$infoRight.classList.add('info-right');
$infoRightDivTop.classList.add('info-rt');
$titleDiv.classList.add('info-rt-title');
$tagDiv.classList.add('info-rt-tag');
$ratingDiv.classList.add('info-rt-rating');
$infoRightDivMiddle.classList.add('info-rm');
$overviewDiv.classList.add('info-rm-overview');
$infoRightDivBottom.classList.add('info-rb');
$castDiv.classList.add('info-rb-cast');

$posterImg.setAttribute('src', "../poster_temp.jpg");

$infoRightDivBottom.appendChild($castDiv);
// $infoRightDivMiddle.appendChild($overviewDiv);
$infoRightDivTop.appendChild($titleH1);
$infoRightDivTop.appendChild($tagP);
$infoRightDivTop.appendChild($ratingP);
$infoRightDivTop.appendChild($otherDetailP);
// $infoRightDivTop.appendChild($titleDiv);
// $infoRightDivTop.appendChild($tagDiv);
// $infoRightDivTop.appendChild($ratingDiv);
$infoRight.appendChild($infoRightDivTop);
$infoRight.appendChild($infoRightDivMiddle);
$infoRight.appendChild($infoRightDivBottom);
$infoLeft.appendChild($posterImg);
$infoContainer.appendChild($infoLeft);
$infoContainer.appendChild($infoRight);

const fillInfoContainer = (detail, credit) => {
    console.log(credit);
    $titleH1.textContent = detail["title"];
    if (detail["genres"]) {
        $tagP.innerHTML = "";
        for (let i = 0; i < detail["genres"].length; i++) {
            $tagP.appendChild(createTagButton(detail["genres"][i]["name"]));
        }
    }
    $ratingP.textContent = "rating: " + detail["vote_average"];
    $otherDetailP.textContent = detail["release_date"]?.substring(0, 4) + " | " + detail["runtime"] + "m | Directed by: " + credit["director"];

    $infoRightDivMiddle.textContent = detail["overview"];

    for (let i = 0; i < credit["actors"].length | 0 ; i++) {
        if (!credit["actors"][i]["profile_path"]) continue;
        $infoRightDivBottom.appendChild(createActorCard(credit["actors"][i]));
    }
}

const createTagButton = buttonName => {
    const $tagButton = document.createElement('button');
    $tagButton.innerHTML = buttonName;
    return $tagButton;
}

const createActorCard = actor => {
    const $actorCard = document.createElement('div');
    const $actorImg = document.createElement('img');
    $actorImg.setAttribute('src', ACTOR_IMG_URL + actor["profile_path"]);
    $actorCard.appendChild($actorImg);
    return $actorCard;
}

const loadInfoContainer = async (movieId) => {
    if (!movieId) return;
    const detail = await getCachedMovieDetail(movieId);
    const credit = await getCachedMovieCasts(movieId);
    fillInfoContainer(detail, credit);
    emptyCardContainer();
    $cardContainer?.appendChild($infoContainer);
}

const getCachedMovieDetail = async (movieId) => {
    const detail = await (await fetch(LOCAL_DETAIL))?.json(); // change this
    return detail;
}

/**
 * 
 * @param {string} movieId TMDB movie id
 * @returns {Object} key 'director' - director's name in string, key 'actors' - actors sorted by popularity desc
 */
const getCachedMovieCasts = async (movieId) => {
    // get cached casts list
    const credit = await (await fetch(LOCAL_CREDIT)).json(); // change this
    let director = null;
    for (let i = 0; i < credit["crew"]?.length; i++) {
        if (credit["crew"][i]["job"] == "Director") {
            director = credit["crew"][i]["name"];
            break;
        }
    }

    // filter that list by popular people list (compare people's id)
    const filteredCasts = credit["cast"]?.filter(data => data["character"])
        .sort((a, b) => {
            // actor with higher popularity goes first
            return a["popularity"] > b["popularity"] ? -1 : 1;
        });
    // return that list
    return { director: director, actors: filteredCasts };
}

const dummyFunction = async (id) => new Promise((resolve) => {
    resolve([{ name: "someone's name" }, {} ]);
});

/**
 * 
 * @param {string} cardContainerId id attribute of the container that will contain movie-info
 * @return found DOM element with the given id, NULL if none.
 */
const setCardContainer = (cardContainerId) => $cardContainer = document.getElementById(cardContainerId);

const getCardContainer = () => $cardContainer;

const emptyCardContainer = () => $cardContainer.innerHTML = "";

export { setCardContainer, getCardContainer, loadInfoContainer };