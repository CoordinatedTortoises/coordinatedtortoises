var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');

//-------- set up ----------//
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.status(200).send();
});

app.post('/', function(req, res) {
  res.send('testing post.');
});

app.listen(3000, function() {
  console.log('server listening at port 3000');
});