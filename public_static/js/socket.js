var socket = io();

function requestPieces(username) {
    socket.emit('requestShards', username);
}
function sendOTP(otp, callback){
    console.log(otp);
    socket.emit('telegram-register', otp);
    socket.on('chat-id', function (chatid) {
        if(callback) callback(chatid.toString());
    });
}

socket.on('contract-shard', function (firstShard) {
   // TODO Yet to decide which function to call from here
});

socket.on('telegram-shards', function (shardsArray) {
   // TODO Yet to decide which function to call from here
});