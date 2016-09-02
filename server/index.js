var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');
var db = require('../prefData/userPrefDB.js').db;
//preferences: id, preference, accountInfo
var prefs = require('../prefData/userPrefDB.js').preferences;
var findAll = require('../prefData/userPrefDB.js').findAll;
var add = require('../prefData/userPrefDB.js').add;

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
  findAll(prefs, function(err, users) {
    if (err) {
      console.log('Oops! error: ', err);
    } else {
      res.status(200).send(JSON.stringify(users));
    }
  });
});

//new user submitted, add new user to db
app.post('/users', function(req, res) {
  add(req.body, options, function() {
  	
  });
});

app.listen(3000, function() {
  console.log('server listening at port 3000');
});