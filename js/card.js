const $cardContainer = document.createElement('div');
$cardContainer.setAttribute('id', 'card-container-01');
let $targetContainer = null;

const getCardContainer = () => $cardContainer;

/**
 * 
 * @param {string} image image URL that will be added to the image tag (<img src='here'>)
 * @param {string} title Title of the movie
 * @param {string} overview Movie overview
 * @param {string} rating Rating of the movie
 * @param {string} id ID of the movie from DB
 * @returns a cardholder DOM object
 */
const createCard = (image, title, overview, rating, id) => {
    const $cardHolder = document.createElement('div');
    $cardHolder.classList.add('cardholder');
    $cardHolder.setAttribute('id', id);
    $cardHolder.addEventListener("click", async function (e) {
      for (let i = 0; i < mountedCardClickEventFunctions.length; i++) {
        if (typeof mountedCardClickEventFunctions[i] != "function") continue;
        await mountedCardClickEventFunctions[i](id);
      }
      if (mountedToggleFunction != null) mountedToggleFunction('disabled');
    });
    const $card = document.createElement('div');
    $card.classList.add('card');
    const $cardFront = document.createElement('div');
    $cardFront.classList.add('card-front');
    const $cardBack = document.createElement('div');
    $cardBack.classList.add('card-back');
    const $posterImg = document.createElement('img');
    $posterImg.setAttribute('src', image);
    const $titleH1 = document.createElement('h1');
    $titleH1.textContent = title;
    const $overviewP = document.createElement('p');
    $overviewP.textContent = overview;
    const $ratingP = document.createElement('p');
    $ratingP.textContent = rating;
    $ratingP.setAttribute('id','rating-id');

    $cardFront.appendChild($posterImg);

    $cardBack.appendChild($titleH1);
    $cardBack.appendChild($overviewP);
    $cardBack.appendChild($ratingP);

    $card.appendChild($cardFront);
    $card.appendChild($cardBack);

    $cardHolder.appendChild($card);

    return $cardHolder;
}

let mountedCardClickEventFunctions = null;
let mountedToggleFunction = null;

/**
 * Set list of functions to run when clicking a movie card.
 * @param  {...function} functions will run in order
 */
const mountCardClickEventFunc = (...functions) => {
  mountedCardClickEventFunctions = functions;
}

const setTargetContainer = target => $targetContainer = target;
const mountToggleFunction = (func) => {
  mountedToggleFunction = (typeof func == "function") ? func : null;
}

const addCard = (image, title, overview, rating, id) => {
    if (!image || !title || !overview || !rating || !id) return;
    if ($cardContainer) {
      // if ($cardContainer.classList.contains('disabled'))
      $cardContainer.appendChild(createCard(image, title, overview, rating, id));
    }
}

const emptyCards = () => {
  if ($cardContainer) $cardContainer.innerHTML = "";
};

const mountInfoLoader = (func) => {
  getInfoLoader = (typeof func != "function") ? null : func;
}

const mountReviewLoader = (func) => {
  getReviewLoader = (typeof func != "function") ? null : func;
}

let getInfoLoader = null;
let getReviewLoader = null;

export {
  // setTargetContainer,
  getCardContainer,
  createCard,
  addCard,
  emptyCards,
  mountInfoLoader,
  mountReviewLoader,
  mountCardClickEventFunc,
  mountToggleFunction
};
