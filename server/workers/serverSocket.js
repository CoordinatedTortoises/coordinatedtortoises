var WebSocketServer = require('ws').Server;

var wss = new WebSocketServer({host: 'localhost', port: 3000});

wss.broadcast = function(data) {
  wss.clients.forEach(function(client) {
    client.send(data);
  });
};

module.exports = wss;
