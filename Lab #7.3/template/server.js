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



//Save the movie to the database
app.post("/save_car", (req, res) => {
    const car = {
        stock_num: req.body.stock_num,
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        pic_url: req.body.pic_url,
        price: req.body.price
    };
    console.log("POST /save_car");
    console.log("req.body._id " + req.body._id);

    if (req.body._id) {
        // update existed movie
        usedCar.updateOne({_id: req.body._id},
            {$set: car},
            {runValidators: true},
            (err, info) => {
                if (err) {
                    res.redirect("/edit_car.html?error_message=" + err['message']
                        + "&input=" + JSON.stringify(car) + "&car_id=" + req.body._id);
                } else {
                    // success
                    res.redirect("/detail.html?car_id=" + req.body._id);
                }
            }
        )

    } else {
        // create new movie
        const newCar = new usedCar(car);
        newCar.save((err, new_car) => {
            if (err) {
                console.log(err);
                console.log("Saving movie failed");
                // res.send("Database error");
                res.redirect("/edit_movie.html?error_message=" + err['message']
                    + "&input=" + JSON.stringify(movie));
            } else {
                res.redirect("/detail.html?car_id=" + new_car._id);
            }
        });
    }
});



// Delete movie by id
app.post('/delete_car_by_id', (req, res) => {
    usedCar.deleteOne(
        {"_id": req.body._id},
        {},
        (err) => {
            if (err) {
                res.send({
                    "message": "DB deletion error"
                });
            } else {
                res.send({
                    "message": "success"
                });
            }
        });
});





// Get movies by keyword and min max rating
app.get("/get_cars_by_filters", (req, res) => {
    console.log("search_key: ", req.query.search_key);
    console.log("min_year: ", req.query.min_year);
    console.log("max_year: ", req.query.max_year);
    console.log("min_price: ", req.query.min_price);
    console.log("max_price: ", req.query.max_price);

    const sk = req.query.search_key;
    let minyear = req.query.min_year;
    if (!minyear) {
        minyear = 1900;
    }
    let maxyear = req.query.max_year;
    if (!maxyear) {
        maxyear = 2022;
    }

    let minprice = req.query.min_price;
    if (!minprice) {
        minprice = 0;
    }

    usedCar.find({
            $and: [
                {year: {$gte: minyear}},
                {year: {$lte: maxyear}},
                {price: {$gte: minprice}},
                {
                    $or: [
                        {make: {$regex: sk}},
                        {model: {$regex: sk}},
                    ]
                }
            ]
        },
        (err, data) => {
            if (err) {
                console.log("search error");
                res.send({
                    "message": "error",
                    "data": []
                });
            } else {
                // console.log(data);
                res.send({
                    "message": "success",
                    "data": data
                });
            }
        }
    );
});









