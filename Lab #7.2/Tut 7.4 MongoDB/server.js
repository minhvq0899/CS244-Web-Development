const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


mongoose.connect('mongodb://localhost:27017/movieDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

const movieSchema = {
    title: {
        type: String,
        required: [true, "Title cannot be empty"]
    },
    rating: {
        type: Number,
        required: [true, "Rating cannot be empty"],
        min: [0, "Rating cannot be negative"],
        max: [10, "Rating cannot exceed 10"]
    },
    poster_path: String,
    release_date: {
        type: String,
        validate: {
            validator: function (value) {
                return /\d{4}-\d{2}-\d{2}/.test(value);
            },
            message: "Date format must be yyyy-mm-dd",
        }
    },
    overview: String
}

const Movie = mongoose.model('Movie', movieSchema);

app.listen(3001, function () {
    console.log("server started at 3001");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

//Get all movies in the db
app.get("/get_all_movies", function (req, res) {
    Movie.find(function (err, data) {
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

// Get movie by _id
app.get('/get_movie_by_id',
    function (req, res) {
        // console.log(req.query.movie_id);
        Movie.find({"_id": req.query.movie_id}, function (err, data) {
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
app.post("/save_movie", (req, res) => {
    const movie = {
        title: req.body.title,
        rating: req.body.rating,
        poster_path: req.body.poster_path,
        release_date: req.body.release_date,
        overview: req.body.overview,
    };
    console.log("POST /save_movie");
    console.log("req.body._id " + req.body._id);

    if (req.body._id) {
        // update existed movie
        Movie.updateOne({_id: req.body._id},
            {$set: movie},
            {runValidators: true},
            (err, info) => {
                if (err) {
                    res.redirect("/edit_movie.html?error_message=" + err['message']
                        + "&input=" + JSON.stringify(movie) + "&movie_id=" + req.body._id);
                } else {
                    // success
                    res.redirect("/movie_detail.html?movie_id=" + req.body._id);
                }
            }
        )

    } else {
        // create new movie
        const newMovie = new Movie(movie);
        newMovie.save((err, new_movie) => {
            if (err) {
                console.log(err);
                console.log("Saving movie failed");
                // res.send("Database error");
                res.redirect("/edit_movie.html?error_message=" + err['message']
                    + "&input=" + JSON.stringify(movie));
            } else {
                res.redirect("/movie_detail.html?movie_id=" + new_movie._id);
            }
        });
    }
});

// Delete movie by id
app.post('/delete_movie_by_id', (req, res) => {
    Movie.deleteOne(
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


// Delete a list of movies by id
app.post('/delete_movie_by_ids', (req, res) => {
    // console.log(req.body._ids);
    Movie.deleteMany(
        {"_id": {$in: req.body._ids}},
        {},
        (err) => {
            if (err) {
                res.send({
                    "message": "DB multiple deletion error"
                });
            } else {
                res.send({
                    "message": "success"
                });
            }
        }
    );
});

// Get movies by keyword and min max rating
app.get("/get_movies_by_filters", (req, res) => {
    console.log(req.query.search_key);
    console.log(req.query.min_rating);
    console.log(req.query.max_rating);

    const sk = req.query.search_key;
    let minrt = req.query.min_rating;
    if (!minrt) {
        minrt = 0;
    }
    let maxrt = req.query.max_rating;
    if (!maxrt) {
        maxrt = 10;
    }
    Movie.find({
            $and: [
                {rating: {$gte: minrt}},
                {rating: {$lte: maxrt}},
                {
                    $or: [
                        {title: {$regex: sk}},
                        {overview: {$regex: sk}}
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
                console.log(data);
                res.send({
                    "message": "success",
                    "data": data
                });
            }
        }
    );
});
