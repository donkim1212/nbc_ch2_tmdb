let cardContainer = null;

const setCardContainer = (container) => {
    cardContainer = container ? container : null;
}

const getCardContainer = () => {
    return cardContainer;
}

const createCard = (image, title, overview, rating, id) => {
    return `
        <div class="cardholder">
            <div class="card">
                <div class="card-front">
                    <img src="${image}"/>
                </div>
                <div class="card-back">
                    <h1>${title}</h1>
                    <p>${overview}</p>
                    <p>ratings: ${rating}</p>
                </div>
            </div>
        </div>
    `;
}

const addCard = (image, title, overview, rating, id) => {
    if (cardContainer) {
        let card = createCard(image, title, overview, rating, id);
        cardContainer.insertAdjacentHTML('beforeend', card);
        const cardholder = cardContainer.lastElementChild;
        cardholder.addEventListener("click", (e) => {
            alert(`영화 id: ${id}`);
        });
    }
}

const emptyCards = () => {
    if (cardContainer) cardContainer.innerHTML = "";
}

export { setCardContainer, getCardContainer, createCard, addCard, emptyCards };