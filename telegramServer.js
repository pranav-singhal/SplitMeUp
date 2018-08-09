const axios = require('axios');

module.exports = {

    token_id: '516574402:AAEFJIWFYnz19-ZSg3-Lg8IdH2vt6VY4jmI',
    otpArray: [],

    sendMessage: function sendMessage(id, message, callback) {
        let url = 'https://api.telegram.org/bot' + this.token_id + '/sendMessage';
        axios.get(url, {
            params: {
                chat_id: id,
                text: message
            }
        }).then(function (response) {
            if (callback) callback(true);
        }).catch(function (error) {
            throw error
        });
    },

    sendKeyToRetrieve: function sendKeyToRetrieve(key, chatIds, callback) {
        // TODO write the code here to send all the chatIds the key so that they can send their respective shards

        let url = 'https://api.telegram.org/bot' + this.token_id + '/sendMessage';
        let request_text = "Please send the shard corresponding to the key : " + key + ". Please reply in the following format 'key : shard''";

        for (i = 0; i < chatIds.length; i++) {
            axios.get(url, {
                params: {
                    chat_id: chatIds[i],
                    text: request_text,
                }
            }).then(function (response) {
                if (callback) callback(true);
            }).catch(function (error) {
                throw error
            });
        }
    },

    FirstTwoKeyReceived: function FirstTwoKeyReceived(msg, chatId, callback) {
        // sending contentest ended after receiving first two message for a key

        let url = 'https://api.telegram.org/bot' + this.token_id + '/sendMessage';

        axios.get(url, {
            params: {
                chat_id: chatId,
                text: msg,
            }
        }).then(function (response) {
            if (callback) callback(true);
        }).catch(function (error) {
            throw error
        });
    },

    checkForFirstMessage: function checkForFirstMessage(msjObj) {
        return msjObj.text === "/start";
    },

    generateOTP: function generateOTP() {
        let self = this;
        let number;
        while (true) {
            number = Math.floor(100000 + Math.random() * 900000);
            if (self.otpArray.findIndex(function (ele) {
                return ele.otp === number;
            }) <= 0) {
                return number;
            }
        }
    },

    firstMessage: function (req, callback) {
        let self = this;
        let id = req.body.message.from.id;
        let name = req.body.message.from.first_name;
        console.log("Sending First Message");
        let otp = self.generateOTP();
        let message = "Hi! " + name + ". Use " + otp + " as the OTP to register on the website";
        self.sendMessage(id, message, function () {
            self.otpArray.push({
                otp: otp,
                name: name,
                id: id,
                verified: false
            });
            console.log("Sent");
            if (callback) callback(true);
        });
    },

    getMeChatidFromOTP: function (otp, callback) {
        let self = this;
        let idx = self.otpArray.findIndex(function (ele) {
            return ele.otp == otp;
        });
        if (idx >= 0) {
            let element = self.otpArray.splice(idx, 1)[0];
            // let name = element.name;
            let id = element.id;
            // let url = randomURL + "/" + address;
            self.sendMessage(id, "Congrats! Registered with Split Me Up!! Now You will start getting " +
                "Key-Value Pairs Store them and get a chance to earn cryptos!!");
            if (callback) callback(id);
            else {
                if (callback) callback(false);
            }

        }
    }

};
