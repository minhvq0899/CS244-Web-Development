const express = require("express");
const fs = require('fs');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

port_number = 3001;
app.listen(port_number, function () {
    console.log(`server started at ${port_number}`);
    const rawData = fs.readFileSync(__dirname + '/public/data/messages.json');
    messageList = JSON.parse(rawData);
    // console.log(messageList);
});

app.get("/", function (req, res) {
    console.log("Main page loaded");
    res.sendFile("/public/index.html");
});

let messageList = [];
app.post('/forum',(req, res) => {
    // console.log(req.body.message);
    const messageItem = {
        "name": req.body.name,
        "email": req.body.email,
        "year": parseInt(req.body.year),
        "message": req.body.message
    };
    messageList.push(messageItem);
    const messageJSON = JSON.stringify(messageList);
    console.log(messageJSON);
    console.log('---------------------');
    fs.writeFile(__dirname + "/public/data/messages.json", messageJSON,
        function (err){
            if (err){
                console.log("Json writing failed");
            } else{
                res.redirect('/forum');
            }
        });
    // res.send('Thank you, bro');
});

app.get('/forum', (req, res) => {
    res.sendFile(__dirname + '/public/forum.html');
});

app.post('/delete-message', (req, res) => {
    messageList = messageList.filter((msg) => {
        if ( msg.name === req.body.name && msg.message === req.body.message){
            return false;
        } else{
            return true;
        }
    });
    // console.log(messageList);
    // write data back to messages.json
    const messageJSON = JSON.stringify(messageList);
    fs.writeFile(__dirname + '/public/data/messages.json', messageJSON, function (err){
        if (err){
            console.log(err);
        } else{
            res.redirect('/forum');
        }
    });

});

