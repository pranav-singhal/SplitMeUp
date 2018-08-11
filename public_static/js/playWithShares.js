const threshold = 3;
const total = 9;
function makeShares(seed_phrase, password, username) {
    window.menmonicToSSS(seed_phrase, total, threshold, password)
        .then(function (shares) {
            console.log("Shares Created", shares);
            getNumberofTelegramUsersandMyUniqueKey(function (noOfTelegramUsers, key) {
                console.log(noOfTelegramUsers, key);
                for(let i = 0; i < noOfTelegramUsers; i++){
                    getTelegramChatId(i, function (id) {
                        sendKeyValuePairToChatid(id, key, shares[i]);
                    });
                }

                addPrivateKeyPiece(shares[noOfTelegramUsers], key, username, [0, 1, 2, 3, 4], function () {
                    // TODO Here comes the code to show the shares to the user
                });
            });
        });
}

function retreiveShares(sharesArray) {
    window.combineSSS(sharesArray, password)
        .then(function (seed_phrase) {
            console.log("Seed Phrase Received", seed_phrase);
        })
}