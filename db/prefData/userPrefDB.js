//Install postgreSQL with brew install postgresql
//Start postgreSQL with brew services start posgresql
//To get access, use psql

// https://github.com/dresende/node-orm2
// https://launchschool.com/blog/how-to-install-postgresql-on-a-mac

var url = require('./config/psqlconfig.js')
var orm = require('orm');
var preferences = require('./preferences.js');

var database = 'userPrefs';

var opts = {
  user: 'def',
  database: database,
  protocol: 'postgres',
  query: { pool: true }
};

var db = orm.connect(opts);
db.on('connect', function(err){
  console.log('connected to database');
});
var prefs = preferences(db);

var findAll = function(model, callback) {
  model.find({}, function(err, results) {
    return callback(err, results);
  });
};

var add = function(model, options, callback) {
  model.create(options, callback);
};

module.exports.preferences = prefs;
module.exports.db = db;
module.exports.findAll = findAll;
module.exports.add = add;
