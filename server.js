const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;
const bodyParser = require('body-parser');
const web3Functions = require('./web3Server.js');
const telegram = require('./telegramServer.js');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/msg', function (req, res) {
   // Webhook for Telegram Messages
});


app.post('/requestShards', function (req, res) {
    let username = req.body.username;
    web3Functions.getKeyAndChatids(username, function (key, chatIds, contractPiece) {
        res.send(contractPiece);
        telegram.sendKeyToRetrieve(key, chatIds, function () {
           // TODO to decide what to do here
        });
    });
});

app.listen(PORT, function () {
    console.log("Listening on - ", PORT);
});