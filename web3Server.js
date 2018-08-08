const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"));

let self = "0x2ec08c29a30db2dec81e327e416999c28c93a6e4";
let abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_piece",
                "type": "string"
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
let contractInstance = VotingContract.at('0xd4ea698dfcdf0addeaae77a2d6584f822738cf66');

module.exports = {
  getKeyAndChatids : function (username, callback) {
      contractInstance.getKeyAndChatidsFromUsername(username, {from : self}, function (err, result) {
          if(err) throw err;
          let arr = result.valueOf();
          let key = arr[0].valueOf();
          let chatIds = [
              arr[1].valueOf(),
              arr[2].valueOf(),
              arr[3].valueOf(),
              arr[4].valueOf(),
              arr[5].valueOf(),
          ];
          let contractPiece = arr[6].valueOf();
          if(callback) callback(key, chatIds, contractPiece);
      });
  },

  releaseFundsForChatid : function (chatId, callback) {
      contractInstance.sendEarning(chatId, {
          from: self,
          gas: 70000,
          gasPrice: web3.toWei(40,'gwei')
      }, function (err, hash) {
          if(err) throw err;
          if(callback) callback();
      });
  }
};