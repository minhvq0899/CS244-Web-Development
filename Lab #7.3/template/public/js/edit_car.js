function fillCar(car) {
    $('#stock_num').val(car.stock_num);
    $('#make').val(car.make);
    $('#model').val(car.model);
    $('#year').val(car.year);
    $('#color').val(car.color);
    $('#url').val(car.url);
    $('#price').val(car.price);
}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const errorMessage = urlParams.get('error_message');
const car = JSON.parse(urlParams.get('input'));
const input = urlParams.get('input');
const car_id = urlParams.get('car_id');

console.log("car_id: ", car_id); 


function isInteger(value) {
    return !Number.isNaN(Number(value))
}



$('form').on('submit', function () {
    if ($('#stock_num').val().length < 5){
        $('#error_message').text("Stock number must be at least 5 characters. ");
        return false; 
    }

    const current_year = new Date().getFullYear();
    console.log("current_year: ", current_year);
    if ( ($('#year').val() < 1900) || ($('#year').val() > current_year) ){
        $('#error_message').text("Year must be between 1900 and 2022");
        return false; 
    }

    if ( !isInteger($('#price').val()) ){
        $('#error_message').text("Price must be a number bigger than 0");
        return false; 
    }

    if (car_id) {
        $('form').append(() => {
            const input = $('<input>')
                .attr('name', '_id' )
                .attr('value', car_id)
            return input;
        });
    }

    
});



// When user input is rejected, load the last input
if (errorMessage){
    console.log(car);
    fillCar(car);
    $('#error_message').text(errorMessage);
}


// when movie_id is not null & no error message
// query DB to load the movie from the db
if (car_id && !errorMessage) {
    $.getJSON('/get_car_by_id?car_id=' + car_id)
        .done ((data) => {
            if (data['message'] === 'success') {
                console.log(data.data);
                fillCar(data.data);
            }
        });
}





