const express = require("express");
const fs = require('fs');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

let carList = [];

port_number = 3000;
app.listen(port_number, function () {
    console.log(`server started at ${port_number}`);
    const rawData = fs.readFileSync(__dirname + '/public/data/data10.json');
    carList = JSON.parse(rawData);
    // console.log("carList: ", carList);
});

app.get("/", function (req, res) {
    console.log("Main page loaded");
    res.sendFile(__dirname +  "/public/index.html");
});


app.get("/new-car", function (req, res) {
    res.sendFile(__dirname + "/public/new_car.html");
});


app.post("/new-car", function (req, res) {
    console.log("new car:", req.body);

    // check for duplicate
    let duplicate; 
    carList.forEach(function(car) {
        if (car.stock_num === req.body.stock) {
            duplicate = car; 
            car.make = req.body.make; 
            car.model = req.body.model; 
            car.year = parseInt(req.body.year); 
            car.color = req.body.color; 
            car.url = req.body.url; 
            car.price = parseInt(req.body.price); 
        }
    });

    if(!duplicate) {
        const carItem = {
            "stock_num": req.body.stock,
            "make": req.body.make,
            "model": req.body.model,
            "year": parseInt(req.body.year), 
            "color": req.body.color, 
            "url": req.body.pic_url,
            "price": parseInt(req.body.price)
        };

        carList.push(carItem); 
    }

    const messageJSON = JSON.stringify(carList); 
    // console.log("messageJSON: ", messageJSON); 
    fs.writeFile(__dirname + "/public/data/data10.json", messageJSON,
        function (err){
            if (err){
                console.log("Json writing failed");
            } else{
                res.redirect('/');
            }
        });
});


app.post('/delete-car', (req, res) => {
    carList = carList.filter((car) => {
        if ( car.stock_num === req.body.stock && car.make === req.body.make 
            && car.model === req.body.model && car.color === req.body.color){
            return false;
        } else{
            return true;
        }
    });
    // console.log(messageList);
    // write data back to messages.json
    const carJSON = JSON.stringify(carList);
    fs.writeFile(__dirname + '/public/data/data10.json', carJSON, function (err){
        if (err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    });
});


app.post('/delete-many-cars', (req, res) => {
    // console.log("delete-many-cars called");
    // console.log("req.body.deleted_cars: ", req.body.deleted_cars) ;
    req.body.deleted_cars.forEach(function(car_body) {
        carList = carList.filter((car_in_list) => {
            if ( car_in_list.stock_num === car_body.stock_num){
                return false;
            } else{
                return true;
            }
        });
    } ); 

    
    // console.log(messageList);
    // write data back to messages.json
    const carJSON = JSON.stringify(carList);
    fs.writeFile(__dirname + '/public/data/data10.json', carJSON, function (err){
        if (err){
            console.log(err);
        } else{
            res.redirect('/');
        }
    });
});
