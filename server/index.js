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

//find all users, send them back
app.get('/users', function(req, res) {
  //get all users from db
    //send back all users
  res.status(200).send(JSON.stringify(users));
});

//new user submitted, add new user to db
app.post('/users', function(req, res) {
  console.log(req);
});

app.listen(3000, function() {
  console.log('server listening at port 3000');
});