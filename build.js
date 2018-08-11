console.log("i am in buildjs");
// var secrets = require('secrets.js-grempe');
var bip39 = require('bip39');
var crypto = require('crypto');
const sssa = require('sssa-js');
window.sssa = sssa
// const cryptorandom = require('./cryptorandom.js');
// var salt = cryptorandom.salt;
// window.secrets.share = function secrets.share;
// console.log('here is ur salt', salt);
window.menmonicToSSS = function menmonicToSSS(mnemonic,shareCount,threshold, password,callback) {
  console.log("inside menmonicToSSS");
  var key = bip39.mnemonicToEntropy(mnemonic);
  console.log("key", key);
  return new Promise(function(resolve, reject) {
    var c = crypto.createCipher("aes128", password);
    console.log("********");
    console.log(c);
    console.log('********');
    console.log("c", c);
    var encKey = c.update(key, 'hex', 'hex');
    encKey += c.final('hex');
    console.log("enckey inside menmonicToSSS", encKey);
    shares = sssa.create(threshold, shareCount, encKey);
           console.log(shares);

    resolve(shares);
  });
}

window.combieSSS =  function combineSSS(mnemonicShares, password) {
  console.log('shares',mnemonicShares);

    var shares = mnemonicShares;
    var splitVal = sssa.combine(shares);
    // var splitVal = window.sssa.combine(shares)
    console.log('splitVal',splitVal);
//     // var salt = new Buffer(splitVal.slice(0, 16), "hex");
    var encKey = splitVal
    console.log("enckey inside combieSSS", encKey);
    return new Promise((resolve, reject) => {
       var d = crypto.createDecipher("aes128", password);
       console.log("d",d);
       var rawKey = d.update(encKey, "hex", "hex");
         rawKey += d.final("hex");
         resolve(bip39.entropyToMnemonic(rawKey));
         console.log("here is raw key");
         console.log(bip39.entropyToMnemonic(rawKey));
           // return bip39.entropyToMnemonic(rawKey);
      // return crypto.pbkdf2(password, salt, 100000, 16, 'sha512', (err, pbkdf2Pass) => {
      //   if(err) { reject(err) }
      //   var d = crypto.createDecipher("aes128", pbkdf2Pass);
      //   var rawKey = d.update(encKey, "hex", "hex");
      //   rawKey += d.final("hex");
      //   resolve(bip39.entropyToMnemonic(rawKey));
      //   return bip39.entropyToMnemonic(rawKey);
      // });
    });}
// window.menmonicToSSS =  function mnemonicToSSS(mnemonic, shareCount, threshold, password) {
//    password = password || passwordStore[this];
//    var key = bip39.mnemonicToEntropy(mnemonic);
//    // var salt = crypto.randomBytes(8);
//    return new Promise((resolve, reject) => {
//      return crypto.pbkdf2(password, salt, 100000, 16, 'sha512', (err, pbkdf2Pass) => {
//
//        if(err) { reject(err) }
//        var c = crypto.createCipher("aes128", pbkdf2Pass);
//        var encKey = c.update(key, 'hex', 'hex');
//        encKey += c.final('hex')
//        var splitVal = salt.toString("hex") + encKey;
//        var shares = secrets.share(splitVal, shareCount, threshold);
//        var mnemonicShares = [];
//        console.log(shares);
//        resolve(shares);
//      });
//    });
//  }
//
// window.combieSSS =  function combineSSS(mnemonicShares, password) {
//     password = password || passwordStore[this];
//     var shares = mnemonicShares;
//     var splitVal = secrets.combine(shares);
//     // var salt = new Buffer(splitVal.slice(0, 16), "hex");
//     var encKey = splitVal.slice(16);
//     return new Promise((resolve, reject) => {
//       return crypto.pbkdf2(password, salt, 100000, 16, 'sha512', (err, pbkdf2Pass) => {
//         if(err) { reject(err) }
//         var d = crypto.createDecipher("aes128", pbkdf2Pass);
//         var rawKey = d.update(encKey, "hex", "hex");
//         rawKey += d.final("hex");
//         resolve(bip39.entropyToMnemonic(rawKey));
//         return bip39.entropyToMnemonic(rawKey);
//       });
//     });
//   }
