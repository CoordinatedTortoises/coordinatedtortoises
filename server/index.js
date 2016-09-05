var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');
var db = require('../db/prefData/userPrefDB.js').db;
//preferences: id, preference, accountInfo
var prefs = require('../db/prefData/userPrefDB.js').preferences;
var findAll = require('../db/prefData/userPrefDB.js').findAll;
var add = require('../db/prefData/userPrefDB.js').add;

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
  findAll(prefs, function(err, userPrefs) {
    if (err) {
      console.log('Oops! error: ', err);
    } else {
      console.log('Got all user prefs.');
      res.status(200).send(JSON.stringify(userPrefs));
    }
  });
});

//new user submitted, add new user to db
app.post('/users', function(req, res) {
  //add(model, options, callback)
  add(prefs, req.body, function() {
    //let console know new user was added
    console.log('New user added: ' + req.body);
    res.json(req.body);
  });
});

app.listen(3000, function() {
  console.log('server listening at port 3000');
});