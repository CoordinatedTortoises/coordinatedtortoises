//creating the currency database

//Install with brew install rethinkdb
//start with brew services start rethinkdb

var rdash = require('rethinkdbdash')({
  db: 'currencyData',
  pool: true,
  cursor: false,
  timeoutGb: 100
});


rdash.dbList().contains('currencyData')
  .do(function(exists) {
  return rdash.branch(exists, { dbs_created: 0 }, rdash.dbCreate('currencyData'));
    //Rdash branch checks to see whether the first arg is true, and it returns arg 2 if false, or third arg if it isn't.
}).run();

rdash.tableList().contains('bitcoinData')
  .do(function(exists){
  return rdash.branch(exists, {tables_created: 0}, rdash.tableCreate('bitcoinData', {
    primaryKey: 'id',
    durability: 'soft'
  }));
}).run();


var readChanges = function(){
  rdash.table('bitcoinData').changes().run(function(err, cursor) {
    cursor.each(console.log);
  });
};

var addData = function(data){
  rdash.table('bitcoinData').insert(data).run(function(dbResp){
    console.log(dbResp);
  });
};


module.exports.addData = addData;
module.exports.readChanges = readChanges;
module.exports.pipeStream = function(stream){
  var bitcoinTable = rdash.table('bitcoinData').toStream({writable: true})
  .on('error', console.log)
  .pipe(stream)
  .on('error', console.log)
  .on('end', function() {
    console.log('stopping pipe to db');
    rdash.getPool().drain();
  });
}



