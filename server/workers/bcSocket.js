var WebSocket = require('ws');
var events = require('events');
var bcSocketUrl = 'wss://ws.blockchain.info/inv';

var ws = new WebSocket(bcSocketUrl);

var state = function() {

  var states = {
    1: 'CONNECTING',
    2: 'OPEN',
    3: 'CLOSING',
    4: 'CLOSED'
  };

  return states[ws.readyState];
};

var openStream = function(options, cb) {
  options = options || {};

  ws.on('open', function() {
    ws.send(JSON.stringify(options), {masked: true}, cb);
  });
};

var closeStream = function(code, data) {
  ws.close(code, data);
};

var getData = function(cb) {
  ws.on('message', function(data, flags) {
    cb(data, flags);
  });
};

var onOpen = function(cb) {
  ws.on('open', cb);
};

var onClose = function(cb) {
  ws.on('close', cb);
};

var onError = function(cb) {
  ws.on('error', cb);
};

var send = function(data, options, cb) {
  options = options || {};

  ws.send(data, options, cb);
};

module.exports = {
  open: openStream,
  close: closeStream,
  get : getData,
  send: send,
  onOpen: onOpen,
  onClose: onClose,
  onError: onError,
  state: state
};
