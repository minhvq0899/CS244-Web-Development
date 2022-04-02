let movie = {
    "title": "Movie title",
    "rating": 0,
    "poster_path": "img/placeholder.jpg",
    "release_date": "2021-01-01",
    "overview": "movie overview"
}

function load_movie(movie) {
    $('#title').text(movie.title);
    $('#rating').text(movie.rating);
    $('#release_date').text(movie.release_date);
    $('#overview').text(movie.overview);
    $('#poster_img').attr('src', movie.poster_path);
}

// load_movie(movie);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movie_id = urlParams.get('movie_id');
console.log(movie_id);

$(document).ready(function () {
    if (movie_id) {
        $.getJSON('/get_movie_by_id?movie_id=' + movie_id)
            .done(function (data) {
                if (data["message"] === "success") {
                    movie = data["data"];
                    load_movie(movie);
                }
            });
    }
});


function onEdit() {
    location.href = "/edit_movie.html?movie_id=" + movie_id;
}

function onDelete() {
    $.post('/delete_movie_by_id', {_id: movie_id})
}