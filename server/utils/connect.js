var db = require('../../db/currencyData/currencyDB.js');
var skt = require('../workers/bcSocket.js');
var wss = require('../workers/serverSocket.js');
var geo = require('geo-from-ip');

var ws = new skt.ws(skt.url);

var clean = function(transaction) {

  var sum = 0;
  var loc = geo.allData(transaction.relayed_by).location;
  var coords = [];

  if (loc !== undefined) {
    coords = [loc.latitude, loc.longitude];
  }

  transaction.out.forEach(function(sent) {
    sum += sent.value;
  });

  return {
    bc: sum / 100000000,
    time: transaction.time * 1000,
    ip: transaction.relayed_by,
    coords: coords
  };

};

ws.open(ws.options.newTransactions, function() {
  console.log(ws.state() + ' to API');
});

ws.getData(function(data, flags) {

  var transaction = clean(JSON.parse(data).x);

  wss.broadcast(JSON.stringify(transaction));
  db.addData(transaction);

});

ws.onClose(function() {
  console.log(ws.state());
});

wss.newConnection(function(ws) {
  console.log('New Connection');
  var tenMinutesAgo = Date.now() - 60 * 10 * 1000;

  db.readHistoricalData('bitcoinData', tenMinutesAgo, function(err, results) {
    wss.broadcast(JSON.stringify(results));
  });

});

