function getCar(car) {
    return `<div class="row car_div">
                <div class="col-md-3 imgDiv">
                    <img src="${car.url}">
                </div>
                <div class="col-md-8 infoDiv">
                    <div class="row stock_number">
                        <div class="col">Stock number</div>
                        <div class="col">${car.stock_num}</div>
                    </div>
                    <div class="row make">
                        <div class="col">Make</div>
                        <div class="col">${car.make}</div>
                    </div>
                    <div class="row model">
                        <div class="col">Model</div>
                        <div class="col">${car.model}</div>
                    </div>
                    <div class="row year">
                        <div class="col">Year</div>
                        <div class="col">${car.year}</div>
                    </div>
                    <div class="row price">
                        <div class="col">Price</div>
                        <div class="col">${car.price}</div>
                    </div>

                    <button class="btn btn-danger delete_btn" 
                            value='${JSON.stringify(car)}'>Delete</button>
                </div>
                <div class="col-md-1 checkboxDiv">
                    <input type="checkbox" class="delete_check_box" 
                            value='${JSON.stringify(car)}'>
                <div>


            </div>`
}

$.getJSON("data/data10.json", ()=>{
    console.log("file loaded");
}).done((data)=>{
    // for(const msg of data){}
    data.forEach((car)=>{
        const car_div = getCar(car);
        $('#car_list').append(car_div);
    });

    // odd even row
    $.each($('.car_div'), function(idx){
        if (idx%2 === 0){
            $(this).addClass('even_row');
        } else{
            $(this).addClass('odd_row');
        }
    });


    // delete one car
    $('.delete_btn').on('click', function(){
        const car = JSON.parse($(this).attr('value'));
        console.log("${JSON.stringify(car): ",  car);
        $.post('/delete-car',{
            "stock": car.stock_num, 
            "make": car.make,
            "model": car.model, 
            "color": car.color
        }).done(()=>{
            location.reload();
        });
    });


    // delete multiple cars
    $('#delete_all').on('click', function() {
        let deleted_cars = []; 

        $.each($('.delete_check_box'), function() {
            if ($(this).is(':checked')) {
                const car = JSON.parse($(this).attr('value'));
                deleted_cars.push(car); 
            }
        })

        console.log("deleted_cars: ", deleted_cars); 

        $.post('/delete-many-cars',{
            "deleted_cars": deleted_cars 
        }).done(()=>{
            location.reload();
        });
        
    })

});








