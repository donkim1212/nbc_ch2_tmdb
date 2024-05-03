let $cardContainer = null;

let isLocal = false; // flag for testing
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

const $infoRightDivMB = document.createElement('div');
const $castH2 = document.createElement('h2');
$castH2.innerText = "Cast";

const $infoRightDivBottom = document.createElement('div');
const $castGridDiv = document.createElement('div');
// const $castDiv = document.createElement('div');

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
$infoRightDivMB.classList.add('info-rmb');
$infoRightDivBottom.classList.add('info-rb');
$castGridDiv.classList.add('info-rb-grid');
// $castDiv.classList.add('info-rb-cast');

$infoRightDivBottom.appendChild($castGridDiv);
$infoRightDivMB.appendChild($castH2);
$infoRightDivMiddle.appendChild($overviewDiv);
$infoRightDivTop.appendChild($titleH1);
$infoRightDivTop.appendChild($tagP);
$infoRightDivTop.appendChild($ratingP);
$infoRightDivTop.appendChild($otherDetailP);
// $infoRightDivTop.appendChild($titleDiv);
// $infoRightDivTop.appendChild($tagDiv);
// $infoRightDivTop.appendChild($ratingDiv);
$infoRight.appendChild($infoRightDivTop);
$infoRight.appendChild($infoRightDivMiddle);
$infoRight.appendChild($infoRightDivMB);
$infoRight.appendChild($infoRightDivBottom);
$infoLeft.appendChild($posterImg);
$infoContainer.appendChild($infoLeft);
$infoContainer.appendChild($infoRight);

const fillInfoContainer = (detail, credit) => {
    // console.log(credit);
    $posterImg.setAttribute('src', "https://image.tmdb.org/t/p/w342" + detail["poster_path"]);
    $titleH1.textContent = detail["title"];
    if (detail["genres"]) {
        $tagP.innerHTML = "";
        for (let i = 0; i < detail["genres"].length; i++) {
            $tagP.appendChild(createTagButton(detail["genres"][i]["name"]));
        }
    }
    $ratingP.textContent = "rating: " + detail["vote_average"];
    $otherDetailP.textContent = detail["release_date"]?.substring(0, 4) + " | " + detail["runtime"] + "m | Directed by: " + credit["director"];

    $overviewDiv.textContent = detail["overview"];

    $castGridDiv.innerHTML = "";
    for (let i = 0; i < credit["actors"].length | 0 ; i++) {
        if (!credit["actors"][i]["profile_path"]) continue;
        $castGridDiv.appendChild(createActorCard(credit["actors"][i]));
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

/**
 * 
 * @param {Function} func function that returns JSON of movie detail based on given [movieId] of type 'string' 
 */
const setDetailFunc = (func) => {
    if (typeof func == "function") getDetailExtFunc = func;
    else getDetailExtFunc = null;
    // console.log(getDetailExtFunc);
}

/**
 * 
 * @param {Function} func function that returns JSON of movie credit based on given [movieId] of type 'string' 
 */
const setCreditFunc = (func) => {
    if (typeof func == "function") getCreditExtFunc = func;
    else getCreditExtFunc = null;
    // console.log(getCreditExtFunc);
}

let getDetailExtFunc = null;
let getCreditExtFunc = null;

const getCachedMovieDetail = async (movieId) => {
    try {
        return getDetailExtFunc ? await getDetailExtFunc(movieId) : await (await fetch(LOCAL_DETAIL))?.json();
    } catch (err) { // TODO: add case when mounted getDetailExtFunc doesn't fit the requirement
        // catch (err instanceof Error)
        console.log(err);
        return null;
    }
    
}

/**
 * 
 * @param {string} movieId TMDB movie id
 * @returns {Object} key 'director' - director's name in string, key 'actors' - actors sorted by popularity desc
 */
const getCachedMovieCasts = async (movieId) => {
    try {
        // get cached casts list
        const credit = getCreditExtFunc ? await getCreditExtFunc(movieId) : await (await fetch(LOCAL_CREDIT)).json(); // change this
        let director = null;
        for (let i = 0; i < credit["crew"]?.length; i++) {
            if (credit["crew"][i]["job"] == "Director") {
                director = credit["crew"][i]["name"];
                break;
            }
        }

        // filter that list by popular people list (compare people's id)
        const sortedCasts = credit["cast"]?.sort((a, b) => {
            // actor with higher popularity goes first
            if (a["popularity"] > b["popularity"]) return -1;
            else if (a["popularity"] < b["popularity"]) return 1;
            else return 0;
        });
        // return that list
        return { director: director, actors: sortedCasts };
    } catch (err) { // TODO: add case when mounted getDetailExtFunc doesn't fit the requirement
        // catch (err instanceof Error)
        console.log(err);
        return null;
    }
    
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

export { setCardContainer, getCardContainer, loadInfoContainer, setDetailFunc, setCreditFunc };