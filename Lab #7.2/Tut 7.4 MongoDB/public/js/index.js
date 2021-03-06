function get_movie_object(movie, idx) {
    return `<li class="list-group-item" data-m="${movie._id}">
                <div class="row ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                    <div class="col-lg-3 imgDiv">
                        <img class="movie_poster" src="${movie.poster_path}">
                    </div>
                    <div class="col-lg-6 infoDiv">
                        <h2 class="movie_title">${movie.title}</h2>
                        <p class="rating larger_text cel_noto">Rating: ${movie.rating}</p>
                    </div>
                    <div class="col-lg-3 d-flex justify-content-end buttonDiv">
                        <input type="checkbox" class="check_box" value="${movie._id}">
                    </div>
                </div>
          </li>`
}

function showList(movies) {
    $('#movie_list').empty();
    movies.forEach((movie, idx) => {
        $('#movie_list').append(get_movie_object(movie, idx));
    });

    $('.imgDiv,.infoDiv').on('click', function () {
        const movie_id = $(this).parents("li").attr('data-m');
        location.href = "movie_detail.html?movie_id=" + movie_id;
    });
}

// showList([{
//     "title": "Minari",
//     "rating": 9,
//     "poster_path": "http://image.tmdb.org/t/p/w342/9Bb6K6HINl3vEKCu8WXEZyHvvpq.jpg",
//     "release_date": "2021-02-12", "overview": "test movie review"
// }])

$.getJSON("/get_all_movies")
    .done(function (data) {
        if (data.message === "success") {
            showList(data.data);
        }
    });

function addNewMovie(){
    location.href = "edit_movie.html";
}

function onDeleteSelected(){
    const movieIDs = [];
    $.each($('#movie_list input:checked'), function (){
        // this refers to the checked checkboxs
         const movieID = $(this).attr('value');
         movieIDs.push(movieID);
    });
    console.log(movieIDs);
    if (movieIDs){
        $.post('/delete_movie_by_ids', {"_ids": movieIDs}).done(()=>{
            location.reload();
        });
    }
}

function onSelectAll(){
    const isChecked = $('#select_all').prop('checked');
    $('#movie_list .check_box').prop("checked", isChecked);
}

function searchMovie(){
    $.getJSON("/get_movies_by_filters", {
        search_key: $('#search_box').val(),
        min_rating: $('#min_rating').val(),
        max_rating: $('#max_rating').val()
    }).done((data)=>{
        showList(data.data);
    });
}
