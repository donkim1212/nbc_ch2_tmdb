let $cardContainer = null;

const createInfoContainer = (detail, casts) => {
    const $infoContainer = document.createElement('div');
    
    const $infoLeft = document.createElement('div');
    const $posterImg = document.createElement('img');
    
    const $infoRight = document.createElement('div');
    const $infoRightDivTop = document.createElement('div');
    const $titleDiv = document.createElement('div');
    const $tagDiv = document.createElement('div');
    const $ratingDiv = document.createElement('div');
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
    $infoRightDivMiddle.appendChild($overviewDiv);
    $infoRightDivTop.appendChild($titleDiv);
    $infoRightDivTop.appendChild($tagDiv);
    $infoRightDivTop.appendChild($ratingDiv);
    $infoRight.appendChild($infoRightDivTop);
    $infoRight.appendChild($infoRightDivMiddle);
    $infoRight.appendChild($infoRightDivBottom);
    $infoLeft.appendChild($posterImg);
    $infoContainer.appendChild($infoLeft);
    $infoContainer.appendChild($infoRight);

    return $infoContainer;
}

const loadInfoContainer = async (movieId) => {
    // 
    if (!movieId) return;
    const detail = {}// await getCachedMovieDetail(movieId);
    const casts = {}// await getCachedMovieCasts(movieId);
    const $infoContainer = createInfoContainer(detail, casts);
    emptyCardContainer();
    $cardContainer.appendChild($infoContainer);
}

const getCachedMovieDetail = async (movieId) => {
    // use imported function to get movie information
    
    return dummyFunction();
}

/**
 * 
 * @param {string} movieId TMDB movie id
 * @returns {Object} key 'director' - director's name in string, key 'actors' - actors sorted by popularity desc
 */
const getCachedMovieCasts = async (movieId) => {
    // get cached casts list
    const casts = await dummyFunction(movieId);
    let director = null;

    for (let i = 0; i < casts.length; i++) {
        if (casts[i]["job"] == "Director") {
           director = casts[i]["name"]
           break;
        }
    }

    // filter that list by popular people list (compare people's id)
    const filteredCasts = casts.filter(data => data["character"])
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

const setCardContainer = (elementId) => $cardContainer = document.getElementById(elementId);

const getCardContainer = () => $cardContainer;

const emptyCardContainer = () => $cardContainer.innerHTML = "";

export { setCardContainer, getCardContainer, loadInfoContainer };