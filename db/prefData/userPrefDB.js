//Install postgreSQL with brew install postgresql
//Start postgreSQL with brew services start posgresql
//To get access, use psql

// https://github.com/dresende/node-orm2
// https://launchschool.com/blog/how-to-install-postgresql-on-a-mac
var url = require('./config/psqlconfig.js')
var Sequelize = require('sequelize');
var preferencesModel = require('./preferences.js')
var usersModel = require('./users.js');
var bcrypt = require('bcrypt');
var sequelize = new Sequelize(url,  {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
  });

//Localhost settings
// var database = 'userPrefs';
// var opts = {
//   user: 'def',
//   database: database,
//   protocol: 'postgres',
//   query:    {pool: true}
// };
var findAll = function(model, callback) {
  model.findAll({}).then(callback);
};

var findUser = function(username, password, callback){
  model.findAll({
    where: {
      username: username,
      password: password
    }
  })
  .then(callback);
};

var findUserByUsername = function(username, callback) {
  model.findAll({
    where: {
      username: username,
    }
  }).then(callback);
};

var add = function(model, options, callback) {
  model.findOrCreate({where: options}).then(callback);
};

var findOne = function(model, options, callback) {
  model.find({where: options}).then(callback);
};

var deleteAll = function(model, callback) {
  model.destroy({where: {}}).then(callback);
};

var deleteOne = function(model, params, callback) {
  model.destroy({where: params}).then(function(err){
    if (err) {
      throw err;
    } else {
      callback();
    }
  })
}

var changePass = function(model, username, oldPass, newPass, callback){
  model.update({password: newPass}, {
    where: {
      username: username,
      password: oldPass
    }
  });
}


var newUser = function(username, password, callback) {
  bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, console.log, function(err, hashP){
      users.findOrCreate({
        where: {
          username: username,
          password: hashP,
          salt: salt
        }
      });
    });
  });
};

var checkUser = function(username, password, callback) {
  findUserByUsername(username, function(err, user){
    if(err) {
      throw err;
    }
    bcrypt.hash(password, user.salt, console.log, function(err, hashInput){
      callback(hashInput === user.password);
    });
  });
}
// add(users, {id:3, username:'stevo', password:'pass'}, console.log);
// findAll(users, function(users){
//   console.log(users[1].dataValues);
// });
// deleteAll(users, console.log);

module.exports = {
  users: users,
  findOne: findOne,
  db: sequelize,
  findAll: findAll,
  add: add,
  newUser: newUser,
  checkUser: checkUser
};
