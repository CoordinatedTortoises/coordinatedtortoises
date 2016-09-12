//User profile info
var Sequelize = require('sequelize');
module.exports = function(db) {
  return db.define('users', {
    username: {type: Sequelize.STRING, primaryKey: true},
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    preferences: Sequelize.STRING(10000)
  });
};

