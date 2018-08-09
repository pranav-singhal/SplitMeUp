const express = require('express');
const app = express();
const PORT = 8080 || process.env.PORT;
const bodyParser = require('body-parser');
const web3Functions = require('./web3Server.js');
const telegram = require('./telegramServer.js');

let key_shard_map = new Object() ;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/static', express.static('public_static'))

app.get('/msg', function (req, res) {
   // TODO for harshit... here we will redirect the webhook and all messages are to be handeled from here
   if(!req.body.message)
     {
         res.sendStatus(200);
     }
   else
   {


        let id = req.body.message.from.id;
        let text = req.body.message.text;

        let key_shard = text.split(" ") ;

        let key = key_shard[0] ;
        let shard = key_shard[2] ;


        if(key_shard_map[key] == null)
        {
          key_shard_map[key] = [shard] ;
          telegram.FirstTwoKeyReceived( "Thankyou . Please wait until user verify the shard . This might take some time"  ,  id , function () {} )

        }
        else
        {
          if(key_shard_map[key].length == 2)
          {
            telegram.FirstTwoKeyReceived( "Sorry the contest ended. Better luck next time"  ,  id , function () {} )
          }
          else
          {
            let shard_arr = key_shard_map[key] ;
            shard_arr.push(shard) ;
            key_shard_map[key] = shard_arr  ;

            telegram.FirstTwoKeyReceived( "Thankyou . Please wait until user verify the shard . This might take some time"  ,  id , function () {} )



            // TODO 2 keys received .. send to web3 ... frontend
          }
        }




   }





});
app.get('/',function(req,res){
  res.sendFile(__dirname+ '/public_static/views/index.html');
});


app.post('/requestShards', function (req, res) {
    let username = req.body.username;
    web3Functions.getKeyAndChatids(username, function (key, chatIds, contractPiece) {
        res.send(contractPiece);
        telegram.sendKeyToRetrieve(key, chatIds, function () {
           // TODO to decide what to do here
        });
    });
});

app.listen(PORT, function () {
    console.log("Listening on - ", PORT);
});
