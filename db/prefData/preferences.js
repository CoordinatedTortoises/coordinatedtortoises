//adds a preference table to postgres db
module.exports = function(db){
  return db.define("preferences", {
  id: { type: 'serial', key: true },
  preference: Buffer,
  accountInfo: Object
  }).sync();
}