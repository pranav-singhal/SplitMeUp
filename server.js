const express = require('express');
const app = express();
const PORT = 4000 || process.env.PORT;
const bodyParser = require('body-parser');
const web3Functions = require('./web3Server.js');
const telegram = require('./telegramServer.js');

let key_shard_map = new Map() ;

// For Socket IO
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

let keyToSocket = new Map();
io.on('connection', function (socket) {
    console.log(socket.id);
    setupSocket(socket);
});

function setupSocket(socket){
    socket.on('requestShards', function (username) {
        console.log("Requested");
        web3Functions.getKeyAndChatids(username, function (key, chatIds, contractPiece) {
            socket.emit('contract-shard' , contractPiece);
            telegram.sendKeyToRetrieve(key, chatIds, function () {
                keyToSocket.set(key, socket);
                // console.log(keyToSocket);
            });
        });
    });

    socket.on('telegram-register', function (otp) {
        console.log("here inside otp ", otp);
        telegram.getMeChatidFromOTP(otp, function (id) {
            if(id){
                socket.emit('chat-id', id);
            }
        });
    });
}


function shardReceived(key, shard1, shard2) {
    console.log("shards \n \n", shard1, shard2);
    let socket = keyToSocket.get(key);
    let objToSend = [shard1, shard2];
    socket.emit('telegram-shards', objToSend);
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', express.static('public_static'));

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(200);
});

function getMeKeyAndShard(array, id, callback){
    let dashFound = false;
    for(let i = 0; i < array.length; i++){
        if(array[i] === '-'){
            dashFound = true;
            found(i - 1);
            break;
        }
        if(i === array.length - 1 && !dashFound){
            sendIncorrectMessage();
        }
    }

    function sendIncorrectMessage() {
        telegram.sendMessage(id, "Please Send The Message in Correct Format. <key> -(hyphen) <value>");
    }

    function found(idx) {
        let value = array[idx + 2];
        let keyarr = array[idx].split('\n');
        let key = keyarr[keyarr.length - 1];
        if(isNaN(key) || key === ''){
            sendIncorrectMessage();
            return;
        }
        if(callback) callback(key, value);
    }
}

app.post('/msg', function (req, res) {
    // console.log("here");
    // for harshit... here we will redirect the webhook and all messages are to be handeled from here
    res.sendStatus(200);
    if(!req.body.message) {
        // res.sendStatus(200);
    } else {
        if(telegram.checkForFirstMessage(req.body.message)) {
            telegram.firstMessage(req, function () {
                // res.sendStatus(200);
            });
        }else{
            let id = req.body.message.from.id;
            let text = req.body.message.text;
            let key_shard = text.split(" ") ;
            // console.log("Message", text);
            // console.log(key_shard);
            getMeKeyAndShard(key_shard, id, function (key, shard) {

                if(!keyToSocket.has(key)){
                    telegram.sendMessage(id, "Sorry, We have not yet Requested for this Key.");
                }else {
                    if (!key_shard_map.has(key)) {
                        key_shard_map.set(key, [shard]);
                        telegram.sendMessage(id, "Thanks For Your Quick Response, Check Your Ethereum Account " +
                            "We have released your bounty on our end. The entire Split Me Up Community thanks you.");
                        // res.sendStatus(200);
                    }
                    else {
                        if (key_shard_map.get(key).length === 0) {
                            telegram.FirstTwoKeyReceived("Sorry you are late. Better luck time", id, function () {
                                // res.sendStatus(200)
                            });
                        } else {
                            let shard_array = key_shard_map.get(key);
                            shard_array.push(shard);
                            key_shard_map.set(key, []);
                            console.log(shard_array);
                            shardReceived(key, shard_array[0], shard_array[1]);
                            telegram.sendMessage(id, "Thanks For Your Quick Response, Check Your Ethereum Account " +
                                "We have released your bounty on our end. The entire Split Me Up Community thanks you.");
                            // res.sendStatus(200);
                        }
                    }
                }

            });
            // let key = key_shard[0];
            // let shard = key_shard[2];

            console.log(key_shard_map);

        }
    }
});

// app.get('/',function(req,res){
//   res.sendFile(__dirname+ '/public_static/views/index.html');
// });
// app.post('/requestShards', function (req, res) {
//     let username = req.body.username;
//     web3Functions.getKeyAndChatids(username, function (key, chatIds, contractPiece) {
//         res.send(contractPiece);
//         telegram.sendKeyToRetrieve(key, chatIds, function () {
//            // TODO to decide what to do here
//         });
//     });
// });

server.listen(PORT, function () {
    console.log("Listening on - ", PORT);
});


// ["nhBNNYPA5mlBGpN7O8DTplsCswmtCcLRxweFQJwcHYg=VIzx8o…pmSQ=NoOffsLRnC8sTMfAku2EiZTZkwtbM4FKOPZQGVfzFPY=", "CwF-5lSYnLzpwIHbAXjraJrpbFuLjZWS9c3qd8xb9j8=ZefIXl…9bdM=MoL8C1c6pwOzduVTKwtjCHT6OB4XFw3IqXBuoU67Dzw=", "IrFk4tGz7h0bUCHFSdnsji14hQibij921l0n66_1Y6A=wQiV3E…cn2U=hRsM4KsCtumg4A6xAUI1jw2E4tz08MZSDgJOqvz7kso="]