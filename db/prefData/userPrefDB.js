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
  var preference = db.define("preference", {
    id: { type: 'serial', key: true },
    preference: Buffer,
    accountInfo: Object
  }).sync();
});

