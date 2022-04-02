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
    $('button').on('click', function () {
        const car_id = $(this).attr('value');
        location.href = "detail.html?car_id=" + car_id;
    });
}

showList([{
    "_id": 12345, 
    "stock_num": "19913071",
    "make": "Toyota",
    "model": "Corolla",
    "year": 2015,
    "color": "Red", 
    "pic_url": "https://img2.carmax.com/img/vehicles/19913071/1.jpg?width=800", 
    "price": 14715
}])




$.getJSON("/get_all_cars")
    .done(function (data) {
        if (data.message === "success") {
            showList(data.data);
        }
    });

