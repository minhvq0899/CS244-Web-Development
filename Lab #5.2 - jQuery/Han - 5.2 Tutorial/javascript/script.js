$('#movie_list').empty(); // delet the initial block of movie
console.log(movies);

// creating a movie object from the input file
function get_movie_obj(movie) {
    return `<li class="list-group-item">
        <div class="buttonDiv" style="text-align: right; padding: 10px;">
        </div>
        <div class="row">
            <div class="col-md-3 imgDiv">
                <img class="movie_poster" src="http://image.tmdb.org/t/p/w342/${movie.poster_path}">
            </div>
            <div class="col-md-8 infoDiv">
                <p class="movie_title">${movie.title}</p>
                <p class="vote cel_noto larger_text">Rating: ${movie.vote_average}</p>
                <p class="release_date cel_noto larger_text">Release Date: ${movie.release_date}</p>
                <div class="overview">
                    <p class="cel_noto">Overview</p>
                    <p class="cel_noto">${movie.overview}</p>
                </div>
            </div>
        </div>
    </li>`
}

// appending each movie object to the list
movies.forEach((movie=>{
    $('#movie_list').append(()=>{
        //append whatever returns into the ul
        return get_movie_obj(movie);
    });
}));

// dynamically adding even/odd row to each row of the list group item
$('.row').addClass((idx)=>{
    if (idx % 2 === 0) {return "even_row"} // even
    else{return "odd_row"} // odd
});

//dynamically adding Hide & Delete buttons to each item
$('.buttonDiv')
    .append(idx=>{
        // adding Hide button element
        // return $('<input type = "button>" value="Hide"/>');
        return $('<button class="btn btn-info collapse_button">Hide</button>');
    })
    .append(idx=>{
        // adding Delete button element
        return $('<button class="btn btn-danger delete_button">Delete</button>');
});

// - for collapse_button class, trigger the function defined when the corresponding button is clicked
$('.collapse_button').on('click', function (event){
    console.log($(this)); // this button class elem selected
    const row = $(this).parent().parent().find('.row'); // the corresponding item row as a jQuery obj

    if($(this).text() === "Hide"){
        row.animate({height: "0"}, 1000); // height becomes 0 in 1 sec
        $(this).text("Show");
    }else{
        const auto_height = row.css("height", "auto").height();
        row.height(0);
        row.animate({height: auto_height}, 1000); // auto height displayed in 1 sec
        $(this).text("Hide");
    }
})

// - for delete_button class,
$('.delete_button').on('click', function (event) {
    // console.log($(this).parents('li')); // refers to the list elem that is the parent of 'this' button class

    // search 'li' elem among parents of 'this' and hide from display using slideUp
    $(this).parents('li').slideUp(1000, function () { // after slideUp, trigger the function defined
        $(this).remove(); // 'this' here refers to the 'li' elem
    });
});

// function for search functionality
function update_movies(){
    const currentSearch = $('#search_box').val().toLowerCase(); //receive user input in the search box
    // for each loop jQuery
    $.each($('li'), function (){ // run function for each li elem
       // console.log($(this));
        // search from the title and overview section
        const title = $(this).find('.movie_title').text().toLowerCase();
        const overview = $(this).find('.overview').text().toLowerCase();

        const hasWord = title.includes(currentSearch) || overview.includes(currentSearch);
        if (hasWord) {
            // console.log(title);
            $(this).show(500);
        }else{
            $(this).hide(500);
        }
    });
}

// $('#search_box').on('keyup', update_movies);