if(!web3){
    alert("Metamask Not Installed");
}
console.log("hey I works");
let self = web3.eth.accounts[0];
let abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_chatId",
                "type": "string"
            }
        ],
        "name": "addTelegramUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getNumberofTelegramUsersandMyUinqKey",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_chatId",
                "type": "string"
            }
        ],
        "name": "sendEarning",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_i",
                "type": "uint256"
            }
        ],
        "name": "getTelegramUserId",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_piece",
                "type": "string"
            },
            {
                "name": "_key",
                "type": "uint256"
            },
            {
                "name": "_username",
                "type": "string"
            },
            {
                "name": "_idsIndices",
                "type": "uint256[5]"
            }
        ],
        "name": "addPvtKeyPiece",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_username",
                "type": "string"
            }
        ],
        "name": "getKeyAndChatidsFromUsername",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
let VotingContract = web3.eth.contract(abi);
let contractInstance = VotingContract.at('0x2ec08c29a30db2dec81e327e416999c28c93a6e4');

// this function gives noOfTelegramUsers and ur key in callback
function getNumberofTelegramUsersandMyUniqueKey(username, callback) {
    contractInstance.getNumberofTelegramUsersandMyUinqKey(username, {
        from: self
    }, function (err, result) {
        if(err) throw err;
        let arr = result.valueOf();
        let noOfTelegramUsers = arr[0].valueOf();
        let key = arr[1].valueOf();
        if(callback) callback(noOfTelegramUsers, key);
    });
}

// this function helps you get telegram chat id with the index of the
// telegram user from the array
function getTelegramChatId(index, callback){
    contractInstance.getTelegramUserId(index, {
        from: self
    }, function (err, result) {
        if(err) throw err;
        let chatId = result.valueOf();
        if(callback) callback(chatId);
    });
}

// this function adds ur piece to the contract and passes true in callback if the block is mined
function addPrivateKeyPiece(piece, key, username, chatIdsArr, callback) {
    contractInstance.addPvtKeyPiece(piece, key, username, chatIdsArr, {
        from: self,
        gas: 70000,
        gasPrice: web3.toWei(40,'gwei'),
        value : 0.002
    }, function (err, hash) {
        if(err) throw err;
        if(callback) callback(true);
    });
}

// this function to be used when someone registers as a telegram user
// it can be called using chatid and callback function is called with true if the block is being mined
function addTelegramUserToContract(chatid, callback){
    contractInstance.addTelegramUser(chatid, {
        from: self,
        gas: 70000,
        gasPrice: web3.toWei(40,'gwei')
    }, function (err, hash) {
        if(err) throw err;
        if(callback) callback(true);
    });
}
