var helpers = require('../paycoin/bitcoinHelpers.js');
var cron = require('node-cron');

var exchangeRates = {};
helpers.getExchangeRates(function(newRates) {
  exchangeRates = newRates;
});
cron.schedule('0 * * * *', function() {
  console.log('updated exchange rates');
  helpers.getExchangeRates(function(newRates) {
    exchangeRates = newRates;
  });
});

module.exports.getExchangeRates = function(){
  return exchangeRates;
};