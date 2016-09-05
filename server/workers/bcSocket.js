var WebSocket = require('ws');
var events = require('events');
var bcSocketUrl = 'wss://ws.blockchain.info/inv';

var BitCoinWebSocket = function(url) {
  WebSocket.call(this, url);

  this._states = {
    1: 'CONNECTING',
    2: 'OPEN',
    3: 'CLOSING',
    4: 'CLOSED'
  };

  this._on = function(msg, args) {
    WebSocket.prototype.on.call(this, msg, args);
  };

  this.options = {
    newTransactions: {"op": "unconfirmed_sub"},
    newBlocks: {"op": "blocks_sub"},
    debugOP: {"op": "ping_block"},
    newestBlock: {"op": "ping_tx"},
    ping: {"op": "ping"},
    subscribeToAddress: {"op":"addr_sub", "addr": null}
  };

};

BitCoinWebSocket.prototype = Object.create(WebSocket.prototype);
BitCoinWebSocket.prototype.constructor = BitCoinWebSocket;

BitCoinWebSocket.prototype.state = function() {

  return this._states[this.readyState];
};

BitCoinWebSocket.prototype.open = function(options, cb) {
  options = options || {};

  this._on('open', function() {
    this.send(JSON.stringify(options), {masked: true}, cb);
  });
};

BitCoinWebSocket.prototype.close = function(code, data) {
  WebSocket.prototype.close.call(this, code, data);
};

BitCoinWebSocket.prototype.getData = function(cb) {
  this._on('message', function(data, flags) {
    cb(data, flags);
  });
};

BitCoinWebSocket.prototype.onOpen = function(cb) {
  this._on('open', cb);
};

BitCoinWebSocket.prototype.onClose = function(cb) {
  this._on('close', cb);
};

BitCoinWebSocket.prototype.onError = function(cb) {
  this._on('error', cb);
};

BitCoinWebSocket.prototype.send = function(data, options, cb) {
  options = options || {};

  WebSocket.prototype.send.call(this, data, options, cb);
};

module.exports = {
  ws: BitCoinWebSocket,
  url: bcSocketUrl,
};

