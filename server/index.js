var express = require('express');
var morgan = require('morgan');
var bp = require('body-parser');
var mo = require('method-override');
var db = require('../db/prefData/userPrefDB.js');
var session = require('express-session');
var path = require('path');
var helpers = require('./paycoin/bitcoinHelpers.js');

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
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: false
}));

app.use(function printSession(req, res, next) {
  console.log('A SESSION: ', req.session);
  return next();
});

var restrict = function(req, res, next) {
  console.log('Inside restrict: ', req.session, '___');
  if (req.session.user) {
    console.log('OPTION 1~~~~~');
    next();
  } else {
    console.log('OPTION 2 !!!!!!!!!!!!!!!');
    req.session.error = 'Access denied';
    res.redirect('/login');
  }

  // db.checkUser(req.session.username, req.session.password, function(found) {
  //   if (found) {
  //     next();
  //   } else {
  //     res.redirect('/login');
  //   }
  // });
};

//app.use(restrict);

//serve static assets
app.use(express.static('Public'));

//-------------------------- ROOT -------------------------//
app.all('/', restrict, function(req, res) {
  // if (!req.session.user) {
  //   res.redirect('/login');
  // } else {
  //   res.redirect('/');
  // }
  res.sendFile(path.resolve('Public/index.html'));
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
//done.
app.get('/login', function(req, res) {
  res.sendFile(path.resolve('Public/login.html'));
});


app.post('/login', function(req, res) {
  var un = req.body.username;
  var pw = req.body.password;

  // req.session.regenerate(function() {
  //   req.session.user = un;
  //   req.session.pw = pw;
  //   res.redirect('/');
  // });

  db.checkUser(un, pw, function(check) {
    if (check) {
      req.session.regenerate(function() {
        console.log('USER FOUND:', un, pw);
        req.session.user = un;
        res.redirect('/');  
      });
    } else {
      console.log('USER NOT FOUND.');
    }
  });
});

//--------------------------SIGN UP---------------//
//done.
app.get('/signup', function(req, res) {
  console.log('now at sign up page');
  res.sendFile(path.resolve('Public/signup.html'));
});

//done.
app.post('/signup', function(req, res) {
  var un = req.body.username;
  var pw = req.body.password;
  db.newUser(un, pw, function(newUser, err) {
    if (err) {
      console.log(err, 'Error!');
    } else {
      req.session.regenerate(function() {
        req.session.user = un;
        res.redirect('/login');
      });
    }
  });
});

//--------------------------- Tx Maker ------------ //

app.post('/txmake', function(req, res) {
  var key = req.body.privKey;
  if(req.body.EncryptKey) {
    key = helpers.encryptKey(req.body.privKey);
  }
  if(key === false){
    res.send('Incorrect Private Key Format');
  } else {
    helpers.sendMoney(req.body.txId, req.body.output, Number(req.body.amount), function(hex) {
      try {
        helpers.pushToBC(hex);
        res.send(hex);
      } catch (err) {
        res.send('Pushing To Blockchain Failed' + err);
      }
    })(key);
  }
});

//--------------------------- LOGOUT --------------//
//done.
app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
});

app.listen(3000, function() {
  console.log('server listening at port 3000');
});
