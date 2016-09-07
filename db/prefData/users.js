//User profile info
var Sequelize = require('Sequelize');

//Exports a function which takes a database and creates a user table in it.
module.exports = function(db) {
  return db.define('user', {
    id: { type: 'serial', primaryKey: true },
    username: Sequelize.STRING,
    password: Sequelize.STRING
  });
};