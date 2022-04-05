const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

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

const usedCar = mongoose.model('Car', carSchema);

app.listen(9000, function () {
    console.log("server started at 9000");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});


//Get all cars in the db
app.get("/get_all_cars", function (req, res) {
    usedCar.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    });
});



// Get car by _id
app.get('/get_car_by_id',
    function (req, res) {
        // console.log(req.query.car_id);
        usedCar.find({"_id": req.query.car_id}, function (err, data) {
            if (err || data.length === 0) {
                res.send({
                    "message": "internal database error",
                    "data": {}
                });
            } else {
                res.send({
                    "message": "success",
                    "data": data[0]
                })
            }
        });
    });





// //Save the movie to the database
// app.post("/save_movie", (req, res) => {
//     const movie = {
//         title: req.body.title,
//         rating: req.body.rating,
//         poster_path: req.body.poster_path,
//         release_date: req.body.release_date,
//         overview: req.body.overview,
//     };
//     const newMovie = new Movie(movie);
//     newMovie.save((err,new_movie)=>{
//         if (err){
//             console.log(err);
//             console.log("Saving movie failed");
//             // res.send("Database error");
//             res.redirect("/edit_movie.html?error_message=" + err['message']
//                 + "&input=" + JSON.stringify(movie));
//         } else {
//             res.redirect("/movie_detail.html?movie_id=" + new_movie._id);
//         }
//     });
// });

// // Delete movie by id
// app.post('/delete_movie_by_id', (req, res) => {

// });


// // Delete a list of movies by id
// app.post('/delete_movie_by_ids', (req, res) => {

// });

// // Get movies by keyword and min max rating
// app.get("/get_movies_by_filters", (req, res) => {

// });










