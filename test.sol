pragma solidity ^0.4.11;
contract Test{
    mapping (string => string) usernameToPiece; //address mapped to piece stored in smart contract
    mapping (string => uint[]) usernameToChatids; // address mapped to the array of indices of telegram users who have this adresses' pieces
    mapping (string => address) chatidToUser; //chat id of telegram user mapped to his metamask account
    mapping (string => uint) usernameToKey; // key mapped to username
    string[] chatIds; // this stores only the chat ids
    uint numberOfCurrentActiveUsers = 0;
    //  uint numberOfTelegramUsers =0; //number of telegram users

    // function addPiece(string _key) public {
    //     addressToPiece[msg.sender] = _key;
    // }

    function getNumberofTelegramUsersandMyUinqKey() public view returns(uint,uint){
        uint currentIdx = numberOfCurrentActiveUsers + 1;
        return (chatIds.length, currentIdx);
    }

    function getTelegramUserId(uint _i) view public returns(string){
        return chatIds[_i];
    }

    function addTelegramUser(string _chatId) public {
        address sender = msg.sender;
        chatidToUser[_chatId] = sender;
        chatIds.push(_chatId);
        //  numberOfTelegramUsers++;

    }
    function addPvtKeyPiece (string _piece, uint _key, string _username, uint[5] _idsIndices) public payable{
        require(msg.value == 0.001 ether);
        usernameToPiece[_username] = _piece;
        usernameToChatids[_username] = _idsIndices;
        numberOfCurrentActiveUsers++;
        usernameToKey[_username] = _key;
    }

    function getKeyAndChatidsFromUsername(string _username) public returns(uint, string, string,string,string,string, string){
        uint rvkey = usernameToKey[_username];
        uint[] storage chatIdIndices = usernameToChatids[_username];
        string[] rvChatids;

        for(uint i = 0; i < 5; i++){
            rvChatids.push(chatIds[chatIdIndices[i]]);
        }
        string storage pieceToSend = usernameToPiece[_username];
        return (rvkey, rvChatids[0], rvChatids[1], rvChatids[2], rvChatids[3], rvChatids[4], pieceToSend);
    }

    function sendEarning(string _chatId) public {
        address addressToBeSent = chatidToUser[_chatId];
        addressToBeSent.transfer(0.0005 ether);
    }


}
