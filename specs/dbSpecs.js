// var db = require('../db/prefData/userPrefDB'); 

var chai = require('chai');
var assert = require('assert');

// describe('User Preferences Database', function(){
//   it('should not be undefined', function(){
//     assert.equal(Boolean(db.db), true);
//   });
//   it('should have a preference table', function(){
//     assert.equal(Boolean(db.db.models.preferences) && Boolean(db.preferences), true);
//   })
// });

db.findAll(db.preferences, function(err, res){
  console.log(err, res);
  console.log(JSON.stringify(res));
})

