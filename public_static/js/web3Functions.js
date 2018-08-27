if(!web3){
    alert("Metamask Not Installed");
}else {
    web3.version.getNetwork(function (err, Id) {
        if(err) throw err;
        if(Id != 42){
            alert("Shift to Kovan Testnet");
        }
    });
}
console.log("hey I works");
let self = web3.eth.accounts[0];
let abi = [
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
        "constant": false,
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
        "stateMutability": "nonpayable",
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
        "constant": false,
        "inputs": [],
        "name": "Test",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
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
    }
];
let VotingContract = web3.eth.contract(abi);
let contractInstance = VotingContract.at('0x87D1c6908C9Ef77807B8ECC91C4BEF1c9FA7d14F');

let DiaContractABI  = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"owner_","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name_","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"authority_","type":"address"}],"name":"setAuthority","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"mint","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"push","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"move","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"start","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"authority","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"guy","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"wad","type":"uint256"}],"name":"pull","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"symbol_","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"authority","type":"address"}],"name":"LogSetAuthority","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"}],"name":"LogSetOwner","type":"event"},{"anonymous":true,"inputs":[{"indexed":true,"name":"sig","type":"bytes4"},{"indexed":true,"name":"guy","type":"address"},{"indexed":true,"name":"foo","type":"bytes32"},{"indexed":true,"name":"bar","type":"bytes32"},{"indexed":false,"name":"wad","type":"uint256"},{"indexed":false,"name":"fax","type":"bytes"}],"name":"LogNote","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"}];
let DiaContract = web3.eth.contract(DiaContractABI);
let DiaInstance = DiaContract.at('0xC4375B7De8af5a38a93548eb8453a498222C4fF2');

// this function gives noOfTelegramUsers and ur key in callback
function getNumberofTelegramUsersandMyUniqueKey(callback) {
    contractInstance.getNumberofTelegramUsersandMyUinqKey({
        from: self
    }, function (err, result) {
        if(err) throw err;
        let arr = result.valueOf();
        let noOfTelegramUsers = arr[0].valueOf();
        let key = arr[1].valueOf();
        // console.log('arr');
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
        console.log("result", result);
        let chatId = result.valueOf();
        console.log("chatId", chatId);
        if(callback) callback(chatId);
    });
}

function transferDiaToContract(callback) {
    DiaInstance.transfer('0x87D1c6908C9Ef77807B8ECC91C4BEF1c9FA7d14F', 500000000000000000, {
        from : self
    }, function (err, hash) {
        if(err) throw err;
        console.log(hash);
        if(callback) callback(true);
    })
}

// this function adds ur piece to the contract and passes true in callback if the block is mined
function addPrivateKeyPiece(piece, key, username, chatIdsArr, callback) {
    console.log("piece", piece);
    console.log("key", key);
    console.log("username", username);
    console.log("array", chatIdsArr);
    // web3.eth.estimate
    transferDiaToContract(function () {
        contractInstance.addPvtKeyPiece(piece, key, username, chatIdsArr, {
            from: self,
            gas: 500000,
            gasPrice: web3.toWei(40,'gwei'),
            value : web3.toWei(0.002, 'ether')
        }, function (err, hash) {
            if(err) throw err;
            console.log("Added to Contract");
            if(callback) callback(true);
        });

    });
}

// this function to be used when someone registers as a telegram user
// it can be called using chatid and callback function is called with true if the block is being mined
function addTelegramUserToContract(chatid, callback){
    contractInstance.addTelegramUser(chatid, {
        from: self,
        gas: 100000,
        gasPrice: web3.toWei(40,'gwei')
    }, function (err, hash) {
        if(err) throw err;
        if(callback) callback(true);
    });
}
