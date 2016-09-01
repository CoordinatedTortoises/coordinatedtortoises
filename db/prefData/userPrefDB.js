var orm = require('orm');

// https://github.com/dresende/node-orm2
// https://launchschool.com/blog/how-to-install-postgresql-on-a-mac

var config = {
  user: '', //env var: PGUSER
  database: 'userPrefs', //env var: PGDATABASE
  password: '', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 2000, // how long a client is allowed to remain idle before being closed
};
orm.connect("postgres://def:default@localhost/userPrefs", function(err, db){
  console.log(err);
  console.log(db);
  var preference = db.define("preference", {
    id: { type: 'serial', key: true },
    preference: Buffer,
    accountInfo: Object
  });
  db.sync(function(err){
    preference.create({ id: 1}, function(err){
      preference.exists({id:1}, function(err, prefs){
        console.log(prefs);
      })
    });
  });
});

