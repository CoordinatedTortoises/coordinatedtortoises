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
    console.log(exists);
    return rdash.branch(exists, {tables_created: 0}, rdash.tableCreate('bitcoinData', {
      durability: 'soft'
    }));
  }).run(console.log);
