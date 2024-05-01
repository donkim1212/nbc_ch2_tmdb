let $cardContainer = null;

const setCardContainer = ($container) => {
  $cardContainer = $container ? $container : null;
};

const getCardContainer = () => {
  return $cardContainer;
};

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
  const $cardHolder = document.createElement("div");
  const $card = document.createElement("div");
  const $cardFront = document.createElement("div");
  const $cardBack = document.createElement("div");
  const $posterImg = document.createElement("img");
  const $titleH1 = document.createElement("h1");
  const $overviewP = document.createElement("p");
  const $ratingP = document.createElement("p");

  $cardHolder.classList.add("cardholder");
  $card.classList.add("card");
  $cardFront.classList.add("card-front");
  $cardBack.classList.add("card-back");

  $posterImg.setAttribute("src", image);
  $titleH1.textContent = title;
  $overviewP.textContent = overview;
  $ratingP.textContent = rating;

  $cardHolder.addEventListener("click", (e) => {
    alert(`영화 id: ${id}`);
  });

  $cardFront.appendChild($posterImg);

  $cardBack.appendChild($titleH1);
  $cardBack.appendChild($overviewP);
  $cardBack.appendChild($ratingP);

  $card.appendChild($cardFront);
  $card.appendChild($cardBack);

  $cardHolder.appendChild($card);

  return $cardHolder;
};

const addCard = (image, title, overview, rating, id) => {
  if (!image || !title || !overview || !rating || !id) return;
  if ($cardContainer)
    $cardContainer.appendChild(createCard(image, title, overview, rating, id));
};

const emptyCards = () => {
  if ($cardContainer) $cardContainer.innerHTML = "";
};

export { setCardContainer, getCardContainer, createCard, addCard, emptyCards };
