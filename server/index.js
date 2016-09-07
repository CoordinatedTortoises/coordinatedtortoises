var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');
var db = require('../db/prefData/userPrefDB.js').db;
var session = require('express-session');

//users, 
//users/preferences, login, signup,
// restrict function for sessions
//init live data stream when hit before login
// save , get user pref after login
// when hit root open data stream to client.
// authentication w/ sessions

//-------- server set up ----------//
var app = express();
//initialize session
// create application/json parser
var jsonParser = bp.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bp.urlencoded({ extended: false });

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


//----------- user/pref & save pref -------------//

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

app.post('/users/preferences', urlencodedParser, function(req, res) {
  //console.log(typeof JSON.parse(req.body.prefs), 'parsed body!!!');
  if (req.session.username && req.session.password) {
    db.add(db.preferences, JSON.parse(req.body.prefs), function(err, newPref) {
      if (err) {
        console.log('Error in getting preferences.', err);
      } else {
        console.log('Got preferences.', newPref);
        var allPrefs = newPref.toArray();

        res.json('saved prefs', newPref);
      }
    });
  } else {
    console.log('hey. not logged in for /users/preferences');
    //should redirect to login page.
  }
});

//------------------------LOGIN--------------------//

app.get('/login', function(req, res) {
  res.render('index.html');
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

//--------------------------- LOGOUT --------------//

app.get('/logout', function(req, res) {
  alert('You have been logged out.');
  res.redirect('/login');
});

app.listen(3000, function() {
  console.log('server listening at port 3000');
});