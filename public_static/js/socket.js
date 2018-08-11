var socket = io('http://localhost:8080');

function requestPieces(username, callback) {
    socket.emit('requestShards', username);
    socket.on('contract-shard', function (firstShard) {
       callback(firstShard);
    });
}
function sendOTP(otp, callback){
    console.log(otp);
    socket.emit('telegram-register', otp);
    socket.on('chat-id', function (chatid) {
        if(callback) callback(chatid.toString());
    });
}



socket.on('telegram-shards', function (shardsArray) {
    console.log("shards Returned");
    window.shardArray = shardsArray;
});