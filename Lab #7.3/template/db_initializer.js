const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/usedCarsDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });


const carSchema = {
    stock_num: {
        type: String,
        required: [true,"Stock number cannot be empty"]
    },
    make: {
        type: String,
        required: [true,"Make cannot be empty"]
    },
    model: {
        type: String,
        required: [true,"Model cannot be empty"]
    },
    year: {
        type: Number,
        required: [true,"Year cannot be empty"]
    },
    color: {
        type: String,
        required: [true,"Color cannot be empty"]
    },
    pic_url: String,
    price: {
        type: Number,
        required: [true,"Price cannot be empty"]
    }
}


const usedCar = mongoose.model('usedCar', carSchema);

const carList = []

// jsonList.forEach(function (movie) {
//     movieList.push({
//         "title": movie["title"],
//         "rating": movie["vote_average"],
//         "poster_path": "http://image.tmdb.org/t/p/w342" + movie["poster_path"],
//         "release_date": movie["release_date"],
//         "overview": movie["overview"]
//     })
// });

carList.push({
            "stock_num": "19913071",
            "make": "Toyota",
            "model": "Corolla",
            "year": 2015,
            "color": "Red", 
            "pic_url": "https://img2.carmax.com/img/vehicles/19913071/1.jpg?width=800", 
            "price": 14715
        })


usedCar.insertMany(carList, {}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("all data saved");
        mongoose.connection.close();
    }
});

