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
var rates = require('./workers/exchangeRates.js');
var helpers = require('./paycoin/bitcoinHelpers.js');


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
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: false
}));

app.use(function printSession(req, res, next) {
  //console.log('A SESSION: ', req.session);
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

};

//-------------------------- ROOT -------------------------//
app.all('/', restrict, function(req, res) {
  res.sendFile(path.resolve('Public/index.html'));
});

//------------------------- Exchange Rates --------------//
app.get('/exchange', function(req, res){
  res.send(JSON.stringify(rates.getExchangeRates()));
});

//serve static assets (behind the wall)
app.use(express.static('Public'));

//----------- user/pref & save pref -------------//

//find a pref as soon as log in, send them back to show on page
app.get('/users/preferences', restrict, function(req, res) {
  console.log('Inside get route to prefs', req.session.user);
  db.findUserByUsername(req.session.user, function(user) {
    console.log('Found users prefs: ', user.preferences);
    res.status(200).send(JSON.stringify(user.preferences));
  });
});

//update user's pref
app.post('/users/preferences', restrict, function(req, res) {
  //Note: this is hacky... try to fix this next team!
  console.log('Saving prefs now: ', Object.keys(req.body)[0]);
  db.savePref(req.session.user, Object.keys(req.body)[0], function(data) {
    console.log(data);
    res.status(200).send();
  });
});

//------------------------ TX data --------------------//

app.get('/tx', function(req, res) {
  for (var address in req.query) {
    if (address.length > 26 && address.length < 35) {
      helpers.getUnspent(address, function(tx){
        res.send(JSON.stringify(tx));
      });
    } else {
      res.end();
    }
  }
});


//------------------------LOGIN--------------------//
//done.
app.get('/login', function(req, res) {
  res.sendFile(path.resolve('Public/login.html'));
});


app.post('/login', function(req, res) {
  var un = req.body.username;
  var pw = req.body.password;

  db.checkUser(un, pw, function(check) {
    if (check) {
      req.session.regenerate(function() {
        console.log('USER FOUND: ', un, pw);
        req.session.user = un;
        res.redirect('/');  
      });
    } else {
      console.log('USER NOT FOUND.');
      res.redirect('/signup');
    }
  });
});

//--------------------------SIGN UP---------------//
app.get('/signup', function(req, res) {
  console.log('now at sign up page');
  res.sendFile(path.resolve('Public/signup.html'));
});

app.post('/signup', function(req, res) {
  var un = req.body.username;
  var pw = req.body.password;
  db.newUser(un, pw, function(newUser, err) {
    if (err) {
      console.log(err, 'Error!');
    } else {
      req.session.regenerate(function() {
        req.session.user = un;
        res.redirect('/');
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
app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
});

app.listen(3000, function() {
  console.log('server listening at port 3000');
});
