const axios = require('axios');

module.exports = {

  token_id : '516574402:AAEFJIWFYnz19-ZSg3-Lg8IdH2vt6VY4jmI',


  sendKeyToRetrieve : function sendKeyToRetrieve(key , chatIds, callback) {
      // TODO write the code here to send all the chatIds the key so that they can send their respective shards

      let url = 'https://api.telegram.org/bot' + this.token_id + '/sendMessage';
      let request_text = "Please send the shard corresponding to the key : " + key + ". Please reply in the following format 'key : shard''";

        for(i = 0 ; i < chatIds.length ; i++)
        {
              axios.get(url, {
                params : {
                    chat_id : chatIds[i],
                    text : request_text,
                }
            }).then(function (response) {
                if(callback) callback(true);
            }).catch(function (error) {
                throw error
            });
      }
  },

  FirstTwoKeyReceived : function FirstTwoKeyReceived(msg ,  chatId, callback) {
    // sending contentest ended after receiving first two message for a key

      let url = 'https://api.telegram.org/bot' + this.token_id + '/sendMessage';

              axios.get(url, {
                params : {
                    chat_id : chatId,
                    text : msg,
                }
            }).then(function (response) {
                if(callback) callback(true);
            }).catch(function (error) {
                throw error
            });


  }



};
