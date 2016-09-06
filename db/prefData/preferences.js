//adds a preference table to postgres db
var Sequelize = require('Sequelize');

//The exports is a function which takes a database and creates a table within that database
module.exports = function(db) {
  return db.define('preferences', {
    id: { type: 'serial', primaryKey: true },
    preference: Sequelize.BLOB,
  });
};