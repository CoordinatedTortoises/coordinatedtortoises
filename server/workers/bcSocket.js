var WebSocket = require('ws');
//web sockets allow for instantaneous connection between bitcoin and our server
var events = require('events');
var bcSocketUrl = 'wss://ws.blockchain.info/inv';
//The public url for connecting to bitcoin


var BitCoinWebSocket = function(url) {
  WebSocket.call(this, url);

  this._states = {
    1: 'CONNECTING',
    2: 'OPEN',
    3: 'CLOSING',
    4: 'CLOSED'
  };
  //An enum for the state that the websocket is currently in

  this._on = function(msg, args) {
  //A way for our class to use websocket's event listener
    WebSocket.prototype.on.call(this, msg, args);
  };


  //Different ways we can listen to the data we are receiving.
  this.options = {
    newTransactions: {"op": "unconfirmed_sub"},
    newBlocks: {"op": "blocks_sub"},
    debugOP: {"op": "ping_block"},
    newestBlock: {"op": "ping_tx"},
    ping: {"op": "ping"},
    subscribeToAddress: {"op":"addr_sub", "addr": null}
  };

};

//Setting this class as a instance of a websocket
BitCoinWebSocket.prototype = Object.create(WebSocket.prototype);
BitCoinWebSocket.prototype.constructor = BitCoinWebSocket;
//Changing the constructor.

BitCoinWebSocket.prototype.state = function() {
  //Gets the current state of the websocket.
  return this._states[this.readyState];
};

BitCoinWebSocket.prototype.open = function(options, cb) {
  options = options || {};
  //Opens a websocket with the specified options and then when it is done runs the callback
  this._on('open', function() {
    this.send(JSON.stringify(options), {masked: true}, cb);
  });
};

BitCoinWebSocket.prototype.close = function(code, data) {
  //Closes the websocket, with a status code, and some data to be sent back(?)
  WebSocket.prototype.close.call(this, code, data);
};

BitCoinWebSocket.prototype.getData = function(cb) {
  //Runs a callback whenever we receive a message
  this._on('message', function(data, flags) {
    cb(data, flags);
  });
};

BitCoinWebSocket.prototype.onOpen = function(cb) {
  //Runs a callback when the stream opens
  this._on('open', cb);
};

BitCoinWebSocket.prototype.onClose = function(cb) {
  //Runs a callback when the stream closes
  this._on('close', cb);
};

BitCoinWebSocket.prototype.onError = function(cb) {
  // runs a callback when the stream errors out
  this._on('error', cb);
};

BitCoinWebSocket.prototype.send = function(data, options, cb) {
  options = options || {};
  //Sends the data through the stream
  WebSocket.prototype.send.call(this, data, options, cb);
};

//Exports the BCsocket and the url which you initiate it with.
module.exports = {
  ws: BitCoinWebSocket,
  url: bcSocketUrl,
};

