const token_id = '516574402:AAEFJIWFYnz19-ZSg3-Lg8IdH2vt6VY4jmI';

function sendKeyValuePairToChatid(chatid, key, value, callback) {
    let url = 'https://api.telegram.org/bot' + token_id + '/sendMessage';
    let msg = key + "-" + value;
    let get_url = `${url}?chat_id=${chatid}&text=${msg}`;
    $.get(get_url, function () {
        if(callback) callback(true);
    });
}

function sendWelcomeMessage(id) {
    let url = 'https://api.telegram.org/bot' + token_id + '/sendMessage';
    let msg = "Congrats! Registered with Split Me Up!! Now You will start getting " +
        "Key-Value Pairs Store them and get a chance to earn cryptos!!";
    let get_url = `${url}?chat_id=${id}&text=${msg}`;
    $.get(get_url, function () {
        if(callback) callback(true);
    });
}