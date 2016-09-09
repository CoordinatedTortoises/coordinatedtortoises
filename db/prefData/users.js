//User profile info
var Sequelize = require('Sequelize');
module.exports = function(db) {
  return db.define('user', {
    username: {type: Sequelize.STRING, primaryKey: true},
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    preferences: Sequelize.BLOB
  });
};