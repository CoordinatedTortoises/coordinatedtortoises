var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');
var db = require('../db/prefData/userPrefDB.js');
var session = require('express-session');
var path = require('path');
//var FileStore = require('session-file-store')(session);
//var pete = require('./workers/serverSocket.js');
var connect = require('./utils/connect.js');

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
app.use(express.static('Public'));


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
  res.sendfile('Public/index.html');
});

app.use(session({
  secret: 'secret'
}));



// var restrict = function(req, res, next) {
//   console.log('Inside restrict: ', req.session);
//   if (req.session.username && req.session.password) {
//     next();  
//   } else {
//     res.redirect('/login');
//   }
// };
app.use(function printSession(req, res, next) {
  console.log('A SESSION: ', req.session);
  return next();
});

//----------- user/pref & save pref -------------//

//find a pref as soon as log in, send them back to show on page
app.get('/users/preferences', /*restrict,*/ function(req, res) {
  db.findUserByUsername(req.session.username, function(user) {
    res.status(200).send(JSON.stringify(user.preferences));
  });
});

//update user's pref
app.post('/users/preferences', restrict, function(req, res) {
  db.savePref(req.session.username, req.body.preferences, function() {
    res.status(200).send();
  });
});
//------------------------LOGIN--------------------//

app.get('/login', function(req, res) {
  console.log('Now at login.');
  res.sendfile('Public/login.html');
});

//new user submitted, add new user to db
app.post('/login', function(req, res) {
  //console.log(req.body);
  var un = req.body.username;
  var pw = req.body.password;

  db.findOne(db.users, req.body, function(newUser, err) {
    if (err) {
      console.log('error in finding user: ', err);
      res.redirect('/signup');
    } else {
      console.log(newUser);
      if (newUser) {
        req.session.regenerate(function(err) {
          if (err) {
            console.log('err in starting session: ', err);
          } else {
            req.session.username = un;
            req.session.password = pw;
            res.redirect('/');    
          }
        });
      } else {
        res.redirect('/signup');
      }
    }
  });
});

//--------------------------SIGN UP---------------//
app.get('/signup', function(req, res) {
  console.log('now at sign up page');
  res.sendfile('Public/signup.html');
});

app.post('/signup', function(req, res) {
  //check how to access in req the username and pw, store in var
  //add new user to db
  db.add(db.users, req.body, function(newUser, err) {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log(newUser, 'new user!');
      res.json('saved new user', newUser);
    }
  });
});

//-------------------------- ROOT -------------------------//
app.get('/', function(req, res) {
  if (!req.session.username && !req.session.pw) {
    console.log('redirecting to log in');
    res.redirect('/login');  
  } else {
    res.sendfile(path.resolve('../Public/index.html'));  
  }
});

//--------------------------- LOGOUT --------------//

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
});

//serve static assets
app.use(express.static('../Public'));

app.listen(3000, function() {
  console.log('server listening at port 3000');
});
