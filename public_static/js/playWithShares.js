const threshold = 3;
const total = 6;

function makeShares(seed_phrase, password, username, callback) {
    window.menmonicToSSS(seed_phrase, total, threshold, password)
        .then(function (shares) {
            console.log("Shares Created", shares);
            getNumberofTelegramUsersandMyUniqueKey(function (noOfTelegramUsers, key) {
                console.log(noOfTelegramUsers, key);
                addPrivateKeyPiece(shares[0], key, username, [0, 1, 2, 3, 4], function () {
                    // TODO Here comes the code to show the shares to the user
                    for(let i = 0; i < noOfTelegramUsers; i++){
                        getTelegramChatId(i, function (id) {
                            sendKeyValuePairToChatid(id, key, shares[i + 1]);
                        });
                    }
                    if(callback) callback();
                });
            });
        });
}

function retreiveShares(username, password) {
    requestPieces(username, function (fstShard) {
        let x = setInterval(function () {
            console.log("First Try");
            if(window.shardArray){
                console.log("got shards");
                let sharesArray = window.shardArray;
                clearInterval(x);
                sharesArray.push(fstShard);
                window.combineSSS(sharesArray, password)
                    .then(function (seed_phrase) {
                        window.remove_modal(seed_phrase);
                    });
            }
        }, 1000);
    });
}
//
// window.combineSSS(sharesArray, password)
//     .then(function (seed_phrase) {
//         console.log("Seed Phrase Received", seed_phrase);
//     });
//
