console.log(cars);

// sort the list
cars.sort( (a, b) => {
    return b.year - a.year;
});

// 1. Car list
for (let i = 0; i < cars.length; i++) {
    $('#car_grid').append('<li class="list-group-item col-xl-3 col-lg-4 col-md-6 col-sm-12"></li>')
}

// 2. Car block
$('#car_grid li').append('<div class="card">' +
    '<img class="card-img-top"/>' +
    '<div class="card-body"></div>' +
    '<div class="btn-group" role="group"></div>' +
    '</div>');

// Adjacent cars have different colors
$('#car_grid .card').addClass((index)=>{
    if (index % 2 === 0) {return "even_card"}
    else{return "odd_card"}
});

// 3. Car information
// card photos
$('#car_grid .card-img-top').attr('src', function (index){
    return cars[index].url;
});

// card body
for (let i = 0 ; i < cars.length; i++){
    let carInfo = "<table class='card_table'>" +
        `<tr>
            <td style='width: 5rem'>Maker:</td>
            <td class="make">${cars[i].make}</td>
        </tr>
        <tr>
            <td>Model:</td>
            <td class="model">${cars[i].model}</td>
        </tr>
        <tr>
            <td>Year:</td>
            <td class="year">${cars[i].year}</td>
        </tr>
        <tr>
            <td>Price:</td>
            <td class="price">${"$" + cars[i].price}</td>
        </tr>` +
    '</table>';

    $('#car_grid .card-body').eq(i).append(carInfo);
}

// 4. button group
$('#car_grid .btn-group').append(
    '<button type="button" class="btn btn-secondary like-btn"><i class="fas fa-thumbs-up"></i></button>' +
    '<button type="button" class="btn btn-secondary dislike-btn"><i class="fas fa-thumbs-down"></i></button>' +
    '<button type="button" class="btn btn-danger trash-btn"><i class="fas fa-trash"></i></button>'
);

// handling clicking event of like button
$('.like-btn').on('click', function (){
    if ($(this).css('background-color') !== 'rgb(255, 165, 0)'){
        $(this).css('background-color', 'orange')
        $(this).parents('li').addClass('liked')
    } else {
        $(this).css('background-color', '')
        $(this).parents('li').removeClass('liked')
    }
})

// handling clicking event of dislike button
$('.dislike-btn').on('click', function (){
    if ($(this).css('background-color') !== 'rgb(255, 165, 0)'){
        $(this).css('background-color', 'orange')
        $(this).parents('li').addClass('dislike')
    } else {
        $(this).css('background-color', '')
        $(this).parents('li').removeClass('dislike')
    }
})


// 7. Brand list
// helper function to update the make list after deleting a card
function update_brand_list(){
    $('#make_list').empty();

    let make_list= [];

    $.each($('.card_table'), function (){
        let make_card = $(this).find('td').eq(1).text();

        if (!make_list.includes(make_card)){
            make_list.push(make_card);
            $('#make_list').append(`<li class="list-group-item">${make_card}</li>`);
        }
    })
}

// populate the all brands list
update_brand_list();


// handle trash button
$('.trash-btn').on('click', function(event){
    $(this).parents('li').fadeOut(1000, function(){
        $(this).remove();
        update_brand_list();
    });
});





// 5. Search bar (Filter function)
function update_cars() {
    const currentSearch = $('#search_box').val().toLowerCase();
    $.each($('#car_grid li'), function(){
        const make = $(this).find('.make').text().toLowerCase();
        const model = $(this).find('.model').text().toLowerCase();
        const year = $(this).find('.year').text().toLowerCase();
        const hasWord = make.includes(currentSearch) || model.includes(currentSearch) || year.includes(currentSearch);
        if ($('#all_cars').is(':checked')) {
            if (hasWord) {
                $(this).show(500);
            } else {
                $(this).hide(500);
            }
        } else if ($('#all_likes').is(':checked')) {
            if ($(this).attr('class').includes('liked') && hasWord) {
                $(this).show(500);
            } else {
                $(this).hide(500);
            }
        } else if ($('#all_dislikes').is(':checked')) {
            if ($(this).attr('class').includes('dislike') && hasWord) {
                $(this).show(500);
            } else {
                $(this).hide(500);
            }
        }
    });
}

$('#search_box').on('keyup',update_cars);





