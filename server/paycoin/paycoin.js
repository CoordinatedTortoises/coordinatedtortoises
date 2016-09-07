//Have to install 'python-shell'
 
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


//the reason I'm using python is because the only way to use two1 is with python

var PythonShell = require('python-shell');
var useServices = new PythonShell('paycoin.py');



//UrlList should similar to [{url: "https://mkt.21.co/21dotco/zip_code_data/zipdata/collect?zip_code=94109"}, {url:"https://mkt.21.co/21dotco/extract_links/web_links/collect?url=https://21.co"}]
var checkCost = function(urlList, callback){
  getCost = new PythonShell('checkpay.py');
  getCost.send(JSON.stringify(urlList));
  var total = 0;
  var counter = 0;
  getCost.on('message', function(message){
    total += Number(message);
    counter ++;
    if(counter === urlList.length){
      callback(total);
    }
  });
  getCost.end(function(err){
    if(err){
      console.log(err);
    }
  });
}