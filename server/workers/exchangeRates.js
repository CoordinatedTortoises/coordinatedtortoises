var helpers = require('../paycoin/bitcoinHelpers.js');
var cron = require('node-cron');

var exchangeRates = {};

//Automatically updates on server restart
helpers.getExchangeRates(function(newRates) {
  exchangeRates = newRates;
});
//Every minute it updates the exchange rate using a crontab
cron.schedule('0-59 * * * *', function() {
  console.log('updated exchange rates');
  helpers.getExchangeRates(function(newRates) {
    exchangeRates = newRates;
  });
});

//Exports the getExchange rates so it can send it to a client
module.exports.getExchangeRates = function(){
  return exchangeRates;
};