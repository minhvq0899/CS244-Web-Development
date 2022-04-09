function fillMovie(movie) {
    $('#title').val(movie.title);
    $('#rating').val(movie.rating);
    $('#poster_path').val(movie.poster_path);
    $('#release_date').val(movie.release_date);
    $('#overview').val(movie.overview);
}

function onCancel() {
    if(movie_id) {
        // come from detail page
        location.href = "/movie_detail.html?movie_id=" + movie_id;
    } else {
        //come from homepage
        location.href = "/";
    }
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const errorMessage = urlParams.get('error_message');
const movie = JSON.parse(urlParams.get('input'));
const input = urlParams.get('input');
const movie_id = urlParams.get('movie_id');


$('form').on('submit', function () {
    if ($('#overview').val().length<10){
        $('#error_message').text("Overview must be at least 10 characters");
        return false;
    }
    if (movie_id) {
        $('form').append(() => {
            const input = $('<input>')
                .attr('name', '_id' )
                .attr('value', movie_id)
            return input;
        });
    }
});

// When user input is rejected, load the last input
if (errorMessage){
    console.log(movie);
    fillMovie(movie);
    $('#error_message').text(errorMessage);
}

// when movie_id is not null & no error message
// query DB to load the movie from the db
if (movie_id && !errorMessage) {
    $.getJSON('/get_movie_by_id?movie_id=' + movie_id)
        .done ((data) => {
            if (data['message'] === 'success') {
                console.log(data.data);
                fillMovie(data.data);
            }
        });
}

