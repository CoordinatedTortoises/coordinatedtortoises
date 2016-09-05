var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');
var db = require('../db/prefData/userPrefDB.js').db;

//---------- database methods ----------------//
//preferences: id, preference, accountInfo
// var prefs = require('../db/prefData/userPrefDB.js').preferences;
// var findAll = require('../db/prefData/userPrefDB.js').findAll;
// var add = require('../db/prefData/userPrefDB.js').add;

//-------- server set up ----------//
var app = express();

app.use(express.static(__dirname + '/public'));


//------- root handling ---------//
app.get('/', function(req, res) {
  res.status(200).send();
});

app.post('/', function(req, res) {
  res.send('testing post.');
});


//----------- main page -------------//

//find all users, send them back
app.get('/', function(req, res) {
  //get all users from db
  findAll(prefs, function(err, userPrefs) {
    if (err) {
      console.log('Oops! error: ', err);
    } else {
      console.log('Got all user prefs: ', userPrefs);
      res.status(200).send(JSON.stringify(userPrefs));
    }
  });
});

//new user submitted, add new user to db
app.post('/', function(req, res) {
  //add(model, options, callback)
  add(prefs, req.body, function(err, newPref) {
    //if error
    if (err) {
      //log error.
      console.log('error in adding new user pref: ', err);
      return;
    }
    //no error, log new user and send result
    console.log('New user added: ' + req.body);
    res.json(newPref);
  });
});

//------------- login --------------//


app.listen(3000, function() {
  console.log('server listening at port 3000');
});