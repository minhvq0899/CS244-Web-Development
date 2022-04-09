function get_car_object(car, idx) {
    return `<div class="row ${idx % 2 === 0 ? 'even_row' : 'odd_row'}">
                <div class="col-3">${car.make}</div>
                <div class="col-3">${car.model}</div>
                <div class="col-2">${car.year}</div>
                <div class="col-2">${car.price}</div>
                <div class="col-2 buttonDiv">
                    <button type="button" class="btn btn-outline-primary" value="${car._id}"> Show more </button>
                </div>
            </div>`
}

function showList(cars) {
    $('#car_list').empty();

    // populate the car_list
    cars.forEach((car, idx) => {
        $('#car_list').append(get_car_object(car, idx));
    });

    // button
    $('.btn-outline-primary').on('click', function () {
        const car_id = $(this).attr('value');
        location.href = "detail.html?car_id=" + car_id;
    });
}



let all_cars; 

$.getJSON("/get_all_cars")
    .done(function (data) {
        console.log("data: ", data); 
        all_cars = data.data; 
        if (data.message === "success") {
            showList(all_cars);
        }
    });




$('.make_header').on('click', function () {
    all_cars.sort( (a, b) => {
        if (a.make < b.make) {
            return -1;
        } 
    })
    
    showList(all_cars);
});


$('.model_header').on('click', function () {
    all_cars.sort( (a, b) => {
        if (a.model < b.model) {
            return -1;
        } 
    })
    
    showList(all_cars);
});


$('.year_header').on('click', function () {
    all_cars.sort( (a, b) => {
        return a.year - b.year; 
    })
    
    showList(all_cars);
});


$('.price_header').on('click', function () {
    all_cars.sort( (a, b) => {
        return a.price - b.price; 
    })
    
    showList(all_cars);
});



function addNewCar(){
    location.href = "edit_car.html";
}



function searchCar(){
    $.getJSON("/get_cars_by_filters", {
        search_key: $('#search_box').val(),
        min_year: $('#min_year').val(),
        max_year: $('#max_year').val(),
        min_price: $('#min_price').val(),
        max_price: $('#max_price').val()
    }).done((data)=>{
        showList(data.data);
    });
}










