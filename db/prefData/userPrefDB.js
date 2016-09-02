//Install postgreSQL with brew install postgresql
//Start postgreSQL with brew services start posgresql
//To get access, use psql

// https://github.com/dresende/node-orm2
// https://launchschool.com/blog/how-to-install-postgresql-on-a-mac
var url = require('./config/psqlconfig.js')
var orm = require('orm');
var preferencesModel = require('./preferences.js')
var usersModel = require('./users.js');

//Localhost settings
// var database = 'userPrefs';
// var opts = {
//   user: 'def',
//   database: database,
//   protocol: 'postgres',
//   query:    {pool: true}
// };

var db = orm.connect(url);
db.on('connect', function(err){
  console.log('connected to database');
});

var preferences = preferencesModel(db);
var users = usersModel(db);

var findAll = function(model, callback){
  model.find({}, function(err, results){
    //results is something called a cursor.
    //Essentially an array,
    //but you can cast it to an array with results.toArray();
    return callback(err, results);
  });
};

var add = function(model, options, callback) {
  model.create(options, callback);
};

module.exports.users = users;
module.exports.preferences = preferences;
module.exports.db = db;
module.exports.findAll = findAll;
module.exports.add = add;
