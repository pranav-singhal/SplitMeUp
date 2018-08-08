var socket = io();

function requestPieces(username) {
    socket.emit('requestShards', username);
}

socket.on('contract-shard', function (firstShard) {
   // TODO Yet to decide which function to call from here
});

socket.on('telegram-shards', function (shardsArray) {
   // TODO Yet to decide which function to call from here
});