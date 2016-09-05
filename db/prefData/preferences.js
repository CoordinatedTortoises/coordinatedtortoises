//adds a preference table to postgres db
var Sequelize = require('Sequelize');
module.exports = function(db) {
  return db.define('preferences', {
    id: { type: 'serial', primaryKey: true },
    preference: Sequelize.BLOB,
  });
};