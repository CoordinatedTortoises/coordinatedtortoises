//creating the currency database

//Install with brew install rethinkdb
//start with brew services start rethinkdb

var rdash = require('rethinkdbdash')({
  db: 'currencyData',
  pool: true,
  cursor: false,
  timeoutGb: 100,
  timeout: 10
});

var fs = require('fs');

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


var readChanges = function(callback){
  rdash.table('bitcoinData').changes().run({cursor: true}, function(err, cursor) {
    if(callback){
      cursor.each(callback);
    }
  });
};

var readLimitedChanges = function(orderBy, limit, callback){
  if(!limit){
    limit = 10;
  }
  rdash.table('bitcoinData').orderBy(orderBy).limit(limit).changes().run({cursor: true}, function(err, cursor){
    if(callback){
      cursor.each(callback);
    }
  });
};

var getLimited = function(orderBy, limit, callback){
  if(!limit){
    limit = 10;
  }
  rdash.table('bitcoinData').orderBy(orderBy).limit(limit).run({cursor: true}, function(err, cursor){
    if(callback){
      cursor.each(callback);
    }
  });
};

var getAll = function(tableName, callback){
  if(tableName === undefined){
    return;
  }
  rdash.table(tableName).run(function(err, res){
    if(callback){
      callback(err, res);
    }
  });
};

var addData = function(data, callback){
  rdash.table('bitcoinData').insert(data).run(function(err, dbResp){
    if(callback){
      callback(dbResp);
    }
  });
};

var deleteAll = function(callback){
  rdash.table('bitcoinData').delete().run(function(err, data){
    if(callback){
      callback(data);
    }
  });
};

var pipeStream = function(stream){
  var bitcoinTable = rdash.table('bitcoinData').toStream({writable: true})
  .on('error', console.log)
  .pipe(stream)
  .on('error', console.log)
  .on('end', function() {
    console.log('stopping pipe to db');
    rdash.getPool().drain();
  });
};

var getTableList = function(callback){
  rdash.tableList().run(function(err, res){
    callback(err, res);
  });
};

var insertJSON = function(json, callback){
  var data = JSON.parse(json);
  data.forEach(function(transaction/*?*/){
    addData(transaction, callback);
  });
};

var readHistoricalData = function(tableName, timestamp, callback){
  //Table is a string, timestamp is an epoch time so in milliseconds since Jan 1, 1970
  rdash.table(table).filter(rdash.row('time').gt(timestamp)).run(function(err, res){
    callback(err, res);
  });
};

var saveToJSON = function(tableName, filePath, callback){
  //Callback occurs when the data has been saved
  var jsonData;
  getAll(tableName, function(err, res){
    if(err){
      throw err;
    } else {
      jsonData = JSON.stringify(res);
      fs.writeFile(filePath, jsonData, function(err){
        if(err){
          throw err;
        } else {
          callback();
        }
      });
    }
  })
};

module.exports = {
  addData: addData,
  readChanges: readChanges,
  readLimitedChanges: readLimitedChanges,
  pipeStream: pipeStream,
  deleteAll: deleteAll,
  getAll: getAll,
  reql: rdash,
  insertJSON: insertJSON,
  readHistoricalData: readHistoricalData,
  getTableList: getTableList
};

getAll('bitcoinData', function(err, res){
  console.log(res);
});
// module.exports.readChanges(console.log);
// readLimitedChanges({index: 'id'}, 3, console.log);
// getLimited({index: 'id'}, 3, console.log);
// addData({id: 953, data: {test: 'test'}});
// addData({id: 9594, data: {test: 'test'}});
// addData({id: 949, data: {test: 'test'}});
// addData({id: 0, data: {test: 'test'}});
// getAll('bitcoinData', console.log);
// deleteAll();
