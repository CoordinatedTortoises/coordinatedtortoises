//Install postgreSQL with brew install postgresql
//Start postgreSQL with brew services start posgresql
//To get access, use psql

// https://github.com/dresende/node-orm2
// https://launchschool.com/blog/how-to-install-postgresql-on-a-mac
var url = require('./config/psqlconfig.js')
var Sequelize = require('sequelize');
var preferencesModel = require('./preferences.js')
var usersModel = require('./users.js');
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
var findAll = function(model, callback){
  model.findAll({}).then(callback);
}
var add = function(model, options, callback) {
  model.findOrCreate({where:options}).then(callback);
};
var deleteAll = function(model, callback){
  model.destroy({where:{}}).then(callback);
}
var preferences = preferencesModel(sequelize);
var users = usersModel(sequelize);

// add(users, {id:1, username:'steve', password:'pass'}, console.log);
// findAll(users, console.log);
// deleteAll(users, console.log);


module.exports.users = users;
module.exports.preferences = preferences;
module.exports.db = sequelize;
module.exports.findAll = findAll;
module.exports.add = add;
