//User profile info
module.exports = function(db){
  return db.define('user', {
  id: { type: 'serial', key: true },
  username: String,
  password: String
  }).sync();
}