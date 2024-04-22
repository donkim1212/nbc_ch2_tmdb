console.log("search-movie.js loaded");

const searchMoviesByTitle = (title, list) => {
    console.log("info: ");
    title = title.toLowerCase();
    list.forEach(data => {
        if (data["title"].toLowerCase().includes(title)) {
            // found match, make it a card
            console.log(data["title"]);
        }
    });
}

export { searchMoviesByTitle };