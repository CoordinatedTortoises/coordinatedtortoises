var orm = require('orm');

// https://github.com/dresende/node-orm2
// https://launchschool.com/blog/how-to-install-postgresql-on-a-mac
var database = 'userPrefs';

var opts = {
  user: 'def',
  database: database,
  protocol: 'postgres',
  query:    {pool: true}
};

var db = orm.connect(opts);

db.on('connect', function(err){
  var preferences = db.define("preferences", {
    id: { type: 'serial', key: true },
    preference: Buffer,
    accountInfo: Object
  }).sync(function(){
    module.exports.preferences = preferences;
    findAll(preferences, function(err, res){
    });
    });
});

var findAll = function(model, callback){
  model.find({}, function(err, results){
    return callback(err, results);
  });
};

var add = function(model, options, callback){
  model.create(options, callback);
}

module.exports.db = db;
module.exports.findAll = findAll;
module.exports.add = add;