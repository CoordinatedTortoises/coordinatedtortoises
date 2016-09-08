var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');
var db = require('../db/prefData/userPrefDB.js');
var session = require('express-session');
var path = require('path');
//var pete = require('./workers/serverSocket.js');
var connect = require('./utils/connect.js');

console.log(db);
//users, 
//users/preferences, login, signup,
// restrict function for sessions
//init live data stream when hit before login
// save , get user pref after login
// when hit root open data stream to client.
// authentication w/ sessions

/*
somewhat done: 
server setup, 
login, 
/users/prefs, 

*/

//-------- SERVER & SOCKET SET UP ----------//
var app = express();
//var server = require('http').createServer(app);

// create application/json parser
var jsonParser = bp.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bp.urlencoded({ extended: false });

app.use(urlencodedParser);

//initialize session
app.use(session({secret: 'secret'}));

//serve static assets
app.use(express.static('../Public'));


var restrict = function(req, res, next) {
  console.log('Inside restrict: ', req.session);
  if (req.session.username && req.session.password) {
    next();  
  } else {
    res.redirect('/login');
  }
};


//-------------------------- ROOT -------------------------//
app.get('/', restrict, function(req, res) {
  res.sendfile(path.resolve('../Public/index.html'));
});


//----------- user/pref & save pref -------------//

//find a pref as soon as log in, send them back to show on page
app.get('/users/preferences', restrict, function(req, res) {
  console.log('now at /users/pref');
  //get all users from db
  // if (req.session.username && req.session.password) {
  //   db.findAll(db.preferences, function(err, prefs) {
  //     if (err) {
  //       console.log('Oops! error: ', err);
  //     } else {
  //       console.log('Got all user prefs: ', prefs);
  //       res.json(prefs);
  //     }
  //   });  
  // } else {
  //   alert('Please log in.');
  //   res.redirect('/login');
  // }

  //version without sessions

  //use session variables to lookup just the preferences for that user, 
  //then send that result back to clinet
  db.findOne(db.preferences, function(err, allPrefs) {
    if (err) {
      console.log('Oops! error: ', err);
    } else {
      console.log('Got all user prefs: ', allPrefs);
      var prefs = allPrefs.toArray();
      prefs.forEach(function(aPref) {
        //find matching id to user's

          //update pref

      });
    }
  });  
});

//update user's pref
app.post('/users/preferences', restrict, function(req, res) {
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
  console.log('Now at login.');
  res.sendfile(path.resolve('../Public/login.html'));
});

//new user submitted, add new user to db
app.post('/login', function(req, res) {
  console.log(req.body);

  db.findOne(db.users, req.body, function(err, newUser) {
    if (err) {
      console.log('error in adding new user: ', err);
      res.redirect('/signup');
    } else {
      //console.log("The new user", newUser);
      if (newUser) {
        req.session.username = req.body.username;
        req.session.password = req.body.password;
        res.redirect('/');
      } else {
        res.redirect('/signup');
      }
    }
  });
});

//--------------------------SIGN UP---------------//
app.get('/signup', function(req, res) {
  console.log('now at sign up page');
  res.sendfile(path.resolve('../Public/signup.html'));
});

app.post('/signup', function(req, res) {
  //check how to access in req the username and pw, store in var
  //add new user to db
  db.add(db.users, req.body, function(err, newUser) {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log(newUser, 'new user!');
      res.json('saved new user', newUser);
    }
  });
});

//--------------------------- LOGOUT --------------//

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
  //res.redirect('/login');
});

app.listen(3000, function() {
  console.log('server listening at port 3000');
});