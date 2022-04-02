const mongoose = require('mongoose');
const fs = require('fs');


const rawdata = fs.readFileSync(__dirname + "/data.json");
const jsonList = JSON.parse(rawdata);

// console.log(jsonList);

mongoose.connect('mongodb://localhost:27017/movieDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

const movieSchema = {
    title: String,
    rating: Number,
    poster_path: String,
    release_date: String,
    overview: String
}

const Movie = mongoose.model('Movie', movieSchema);

const movieList = []

jsonList.forEach(function (movie) {
    movieList.push({
        "title": movie["title"],
        "rating": movie["vote_average"],
        "poster_path": "http://image.tmdb.org/t/p/w342" + movie["poster_path"],
        "release_date": movie["release_date"],
        "overview": movie["overview"]
    })
});

Movie.insertMany(movieList, {}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("all data saved");
        mongoose.connection.close();
    }
});