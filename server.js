const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;
const bodyParser = require('body-parser');
const web3Functions = require('./web3Server.js');
const telegram = require('./telegramServer.js');

let key_shard_map = new Object() ;

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
        web3Functions.getKeyAndChatids(username, function (key, chatIds, contractPiece) {
            socket.emit('contract-shard' , contractPiece);
            telegram.sendKeyToRetrieve(key, chatIds, function () {
                keyToSocket.set(key, socket);
            });
        });
    });
    socket.on('telegram-register', function (otp) {
       telegram.getMeChatidFromOTP(otp, function (id) {
           if(id){
               socket.emit('chat-id', id);
           }
       });
    });
}

module.exports = {
    shardsReceived : function (key, shard1, shard2) {
        let socket = keyToSocket.get(key);
        let objToSend = [shard1, shard2];
        socket.emit('telegram-shards', objToSend);
    }
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', express.static('public_static'))

app.post('/msg', function (req, res) {
    // console.log("here");
   // TODO for harshit... here we will redirect the webhook and all messages are to be handeled from here
    if(!req.body.message) {
        res.sendStatus(200);
    }
    else {
        if(telegram.checkForFirstMessage(req.body.message)) {
            telegram.firstMessage(req, function () {
               res.sendStatus(200);
            });
        }else{
            let id = req.body.message.from.id;
            let text = req.body.message.text;
            let key_shard = text.split(" ") ;
            let key = key_shard[0] ;
            let shard = key_shard[2] ;
            if(key_shard_map[key] == null) {
                key_shard_map[key] = [shard] ;
            }
            else {
                if(key_shard_map[key].length == 2) {
                    telegram.FirstTwoKeyReceived(id , function () {} )
                }
                else {
                    let shard_arr = key_shard_map[key] ;
                    shard_arr.push(shard) ;
                    key_shard_map[key] = shard_arr  ;
                    // TODO 2 keys received .. send to web3 ... frontend
                }
            }
            res.sendStatus(200);
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
