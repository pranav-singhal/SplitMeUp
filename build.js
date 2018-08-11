console.log("i am in buildjs");
var bip39 = require('bip39');
var crypto = require('crypto');
const sssa = require('sssa-js');
window.combine = sssa.combine;

window.menmonicToSSS = function menmonicToSSS(mnemonic,shareCount,threshold, password,callback) {
    console.log("inside menmonicToSSS");
    let key = bip39.mnemonicToEntropy(mnemonic);
    console.log("pkey", key);
    return new Promise(function(resolve, reject) {
        let c = crypto.createCipher("aes128", password);
        let encKey = c.update(key, 'hex', 'hex');
        encKey += c.final('hex');
        // console.log("enckey inside menmonicToSSS", encKey);
        let shares = sssa.create(threshold, shareCount, encKey);
        resolve(shares);
    });
};

window.combineSSS =  function combineSSS(mnemonicShares, password) {
    console.log('shares',mnemonicShares);
    let shares = mnemonicShares;
    let splitVal = sssa.combine(shares);
    // console.log("splitval", splitVal);
    console.log('splitVal',splitVal);
    let encKey = splitVal;
    // console.log("enckey inside combieSSS", encKey);
    return new Promise((resolve, reject) => {
        var d = crypto.createDecipher("aes128", password);
        console.log("d",d);
        var rawKey = d.update(encKey, "hex", "hex");
        rawKey += d.final("hex");
        resolve(bip39.entropyToMnemonic(rawKey));
        // console.log("here is raw key");
        // console.log(bip39.entropyToMnemonic(rawKey));
    });
};
