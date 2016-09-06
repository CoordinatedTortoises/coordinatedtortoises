var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');
var db = require('../db/prefData/userPrefDB.js').db;
var session = require('express-session');

//---------- database methods ----------------//
//preferences: id, preference, accountInfo
// var prefs = require('../db/prefData/userPrefDB.js').preferences;
// var findAll = require('../db/prefData/userPrefDB.js').findAll;
// var add = require('../db/prefData/userPrefDB.js').add;

//-------- server set up ----------//
var app = express();
//initialize session
app.use(session({secret: 'secret'}));
app.use(express.static(__dirname + '/public'));


//-------------------------- ROOT -------------------------//
app.get('/', function(req, res) {
  console.log('BEFORE LOG IN: ');
  if (req.session.username && req.session.password) {
    console.log(req.session.username + ' has been logged in.');
    res.redirect('/users/preferences');
  }
});


//----------- main page -------------//

//find all users, send them back
app.get('/users/preferences', function(req, res) {
  //get all users from db
  if (req.session.username && req.session.password) {
    db.findAll(db.preferences, function(err, prefs) {
      if (err) {
        console.log('Oops! error: ', err);
      } else {
        console.log('Got all user prefs: ', prefs);
        res.json(prefs);
      }
    });  
  } else {
    alert('Please log in.');
    res.redirect('/login');
  }
});

app.get('/login', function(req, res) {
  res.render('login.html');
});

//new user submitted, add new user to db
app.post('/login', function(req, res) {
  req.session.username = req.body.username;
  req.session.password = req.body.password;

  db.add(db.users, req.body, function(err, newUser) {
    if (err) {
      console.log('error in adding new user: ', err);
      return;
    }
    console.log('New user added: ' + req.body);
    res.json(newUser);
  });
});

//------------- login --------------//


app.listen(3000, function() {
  console.log('server listening at port 3000');
});