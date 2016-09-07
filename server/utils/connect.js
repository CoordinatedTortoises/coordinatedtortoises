var db = require('../../db/currencyData/currencyDB.js');
var skt = require('../workers/bcSocket.js');
var geo = require('geo-from-ip');

var ws = new skt.ws(skt.url);
db.deleteAll();

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
    time: new Date(transaction.time * 1000),
    ip: transaction.relayed_by,
    coords: coords
  };

};

ws.open(ws.options.newTransactions, function() {
  console.log(ws.state());
});

ws.getData(function(data, flags) {

  var transaction = clean(JSON.parse(data).x);

  db.addData(transaction, function(resp) {
    db.getAll('bitcoinData', function(err, res) {
      //console.log('Table has ' + res.length + ' observations');
      console.log(res);
    });
  });
});

ws.onClose(function() {
  console.log(ws.state());
});

