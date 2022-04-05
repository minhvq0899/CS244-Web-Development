function load_car(car) {
    $('#car_img').attr('src', car.url);
    $('#stock').text(car.stock_num);
    $('#make').text(car.make);
    $('#model').text(car.model);
    $('#year').text(car.year);
    $('#color').text(car.color);
    $('#price').text(car.price);
}


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const car_id = urlParams.get('car_id');
// console.log("car_id: ", car_id);

$(document).ready(function () {
    if (car_id) {
        $.getJSON('/get_car_by_id?car_id=' + car_id)
            .done(function (data) {
                if (data["message"] === "success") {
                    car = data["data"];
                    // console.log("car: ", car); 
                    load_car(car);
                }
            });
    }
});


// function onEdit() {
//     location.href = "/edit_car.html?car_id=" + car_id;
// }

// function onDelete() {
//     $.post('/delete_car_by_id', {_id: car_id})
// }