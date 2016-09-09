//Have to install 'python-shell'
 
// sends a message to the Python script via stdin 
// pyReq.send('hello');
 
// received a message sent from the Python script (a simple "print" statement) 
// pyReq.on('message', function (message) {
  // console.log(message);
// });
 
// end the input stream and allow the process to exit 
// pyReq.end(function (err) {
//   if (err) throw err;
// });


//the reason I'm using python is because the only way to use two1 is with python

var PythonShell = require('python-shell');
var bitcoin = require('bitcoinjs-lib');



//UrlList should similar to [{url: "https://mkt.21.co/21dotco/zip_code_data/zipdata/collect?zip_code=94109"}, {url:"https://mkt.21.co/21dotco/extract_links/web_links/collect?url=https://21.co"}]
var checkCost = function(urlList, callback){
  getCost = new PythonShell('checkpay.py');
  getCost.send(JSON.stringify(urlList));
  var total = 0;
  var counter = 0;
  getCost.on('message', function(message){
    total += Number(message);
    counter ++;
    if(counter === urlList.length){
      callback(total);
    }
  });
  getCost.end(function(err){
    if(err){
      console.log(err);
    }
  });
};

//Want to print an easy way for people to make transactions to copy and paste into the block chain
// bitcoin.Block.calculateMerkleRoot(transaction) //calcutates the merkleRoot of a transaction
var sendMoney = function(prevTxID, payee, amount, callback, outputIndex) {
  //@prevTxID is the id of the previous transaction,
  //@Payee is the address of the person you're sending money to
  //@amount is amount in satoshis
  //@Callback is what happens after it has added an input and output
  //outputIndex is an optional arg if the transaction referenced has multiple outputs
  outputIndex = outputIndex || 0;
  var tx = new bitcoin.TransactionBuilder();
  tx.addInput(prevTxID, outputIndex);
  tx.addOutput(payee, amount);
  return function(secp256k1Key) {
    tx.sign(0, secp256k1Key);
    callback(tx.build().toHex());
  };
  //The resulting hex still needs to be copied and pasted into the blockchain inputter on https://blockchain.info/pushtx
};


// --------------EXAMPLES-----------
/*

var txId = 'aa94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31';
var outputAddr = "1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK";
var privateKeyWIF = 'L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy'
var keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF);
sendMoney(txId, outputAddr, 500, console.log)(keyPair);



var tx = new bitcoin.TransactionBuilder()

// Add the input (who is paying):
// [previous transaction hash, index of the output to use]
var txId = 'aa94ab02c182214f090e99a0d57021caffd0f195a81c24602b1028b130b63e31'
tx.addInput(txId, 0)

// Add the output (who to pay to):
// [payee's address, amount in satoshis]
tx.addOutput("1Gokm82v6DmtwKEB8AiVhm82hyFSsEvBDK", 15000)

// Initialize a private key using WIF
var privateKeyWIF = 'L1uyy5qTuGrVXrmrsvHWHgVzW9kKdrp27wBC7Vs6nZDTF2BRUVwy'
var keyPair = bitcoin.ECPair.fromWIF(privateKeyWIF)

// Sign the first input with the new key
tx.sign(0, keyPair)

// Print transaction serialized as hex
console.log(tx.build().toHex())
*/
//Example Usage: 
// checkCost([{url: "https://mkt.21.co/21dotco/zip_code_data/zipdata/collect?zip_code=94109"}, {url:"https://mkt.21.co/21dotco/extract_links/web_links/collect?url=https://21.co"}], console.log);
module.exports = {
  checkCost: checkCost,
  sendMoney: sendMoney
};


