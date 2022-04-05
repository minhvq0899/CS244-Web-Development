const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');


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
    url: String,
    price: {
        type: Number,
        required: [true,"Price cannot be empty"]
    }
}


const usedCar = mongoose.model('Car', carSchema);

const carList = []


fs.createReadStream(__dirname+'/data100.csv')
    .pipe(csv())
    .on('data', (data) => carList.push(data))
    .on('end', () => {
        console.log(carList[0]);
        // Do the database insertMany here
        usedCar.insertMany(carList, {}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("all data saved");
                mongoose.connection.close();
            }
        });
    });






