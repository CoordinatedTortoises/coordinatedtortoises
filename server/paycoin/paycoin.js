//Have to install 'python-shell'

var PythonShell = require('python-shell');
var pyReq = new PythonShell('paycoin.py');
 
// sends a message to the Python script via stdin 
// pyReq.send('hello');
 
// received a message sent from the Python script (a simple "print" statement) 
// pyReq.on('message', function (message) {
  // console.log(message);
// });
 
// end the input stream and allow the process to exit 
// pyReq.end(function (err) {
//   if (err) throw err;
// });


module.exports = function(serviceUrl, callback){
  pyReq.send(serviceUrl);
  pyReq.on('message', function(message){
    callback(message);
    pyReq.end(function(err){
      if (err) {
        throw err;
      }
    });

  });

}