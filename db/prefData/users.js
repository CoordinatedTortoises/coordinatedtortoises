//User profile info
var Sequelize = require('Sequelize');
module.exports = function(db) {
  return db.define('user', {
    id: { type: 'serial', primaryKey: true },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    salt: Sequelize.STRING,
    preferences: Sequelize.BLOB
  });
};