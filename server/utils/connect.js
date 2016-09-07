var db = require('../../db/currencyData/currencyDB.js');
var skt = require('../workers/bcSocket.js');

var ws = new skt.ws(skt.url);

ws.open(ws.options.newTransactions, function() {
  console.log(ws.state());
});

ws.getData(function(data, flags) {
  var transaction = JSON.parse(data).x;
  db.addData(transaction);
//  db.addData(transaction, function(resp) {
//    db.getAll('bitcoinData', function(err, res) {
//      console.log('Table has ' + res.length + ' observations');
//    });
//  });
});

ws.onClose(function() {
  console.log(ws.state());
});

