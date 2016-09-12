//These have to be available to each function
var socketURI = 'ws://localhost:4000';
var bucketCount = 0;
var sumIn = 0;
var firstBool = true;
var volumeData = [];
//Defaults
var currentCurrency = 'BTC';
var maxLen = 10 * 20; //10 min;
var convert = 1;

//All the graph related stuff must be held in the top level too
var graphOptions = {
  width: '100%',
  height: 500
};

//This was taken from mike bostock's example graph

var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 790 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format('%d-%b-%y');

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

var line = d3.svg.line()
    //.interpolate('basis')
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.btc); });

var render = function(data, symbol) {

  var svg = d3.select('.main-graph').append('svg')
      .attr("viewBox", "0 0 " + (width + margin.left  + margin.right) + " " + (height + margin.top + margin.bottom))
      .attr("preserveAspectRatio", "xMinYMin meet")
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.btc; }));

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Volume (' + symbol + ')');

  svg.append('path')
      .attr('class', 'line')
      .attr('d', line(data));
};

var update = function(data, dur) {

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.btc; }));

  var trans = d3.select('body').transition();

  trans.select('.x.axis').duration(dur).ease('linear').call(xAxis);
  trans.select('.y.axis').duration(dur).ease('linear').call(yAxis);

  trans.select('.line').duration(dur).ease('linear').attr('d', line(data));
};


var initGraph = function (prefs) {

  console.log('Inside initGraph: ', prefs.exchange);
  //Prefs to deal with --> currency and time scale

  currentCurrency = prefs.currency.val;
  convert = prefs.exchange[currentCurrency].last;
  if (typeof prefs.resolution.val === 'string') {
    maxLen = undefined;
  } else {
    maxLen = prefs.resolution.val * 20;
  }


  var processData = function(data) {
    //Convert
    data.time = new Date(data.time);
    data.bc = data.bc * convert;

    //Should only evaluate once
    if (!bucketCount) {
      bucketCount = data.time;
    }

    //Condition to add to the bucket
    if (data.time - bucketCount < 3000) {
      sumIn += data.bc;
    } else {

      //Add to volume data
      console.log(sumIn);
      volumeData.push({
        btc: sumIn,
        date: data.time
      });

      //Rerender graph
      if (!firstBool) {
        //Get just the times in the resolution we are working in
        if (maxLen) {
          var shownData = volumeData.slice(-maxLen);
        } else {
          var shownData = volumeData;
        }
        console.log('MaxLen: ', maxLen, shownData);
        update(shownData, 3000);
      }

      //Reset variables
      sumIn = 0;
      bucketCount = data.time;
    }
  };


  var getInputs = function(data) {

    var keys = Object.keys(data);
    //Historical data should be the first thing to render
    //And skip events that come in before first render
    if (firstBool && keys.length > 4 ) {

      keys.forEach(function(key) {
        processData(data[key]);
      });
      firstBool = false;
      render(volumeData, prefs.exchange[currentCurrency].symbol);

    } else if (!firstBool) {
      processData(data);
    }
  };

  var cleanCoords = function(data) {
    if (data.coords.length === 0) {
      return [];
    } else {
      return [data.coords[1], data.coords[0]];
    }
  };

  //For each event the websocket pushes to us, we call the processing flow
  var initSocket = function() {

    var bitsocket = new WebSocket(socketURI);
    bitsocket.onopen = function() {
      console.log('Connection opened!');
    };
    bitsocket.onerror = function(e) {
      console.log('There was an error: ', e);
    };
    bitsocket.onmessage = function(event) {
      //console.log('New event recieved: ', event.data.slice(0, 200));
      getInputs(JSON.parse(event.data));

      event = JSON.parse(event.data);

      if (Array.isArray(event)) {

        event.forEach(function(item) {
          var coord = cleanCoords(item);

          if (coord.length > 0) {
            window.worldMap.add(coord);
          }
        });
      } else {
          var coord = cleanCoords(event);

          if (coord.length > 0) {
            window.worldMap.add(coord);
          }
      }

    };

  };

  initSocket();

};

var updateRes = function(res) {

  if (res === 'all') {
    maxLen = undefined;
    var shownData = volumeData;
  } else {
    maxLen = res * 20;
    var shownData = volumeData.slice(-maxLen);
  }

  update(shownData, 500);

};

var rescaleAxis = function(currency, exchange) {

  //To handle the default case
  exchange.BTC = {
    last: 1
  };
  convert = exchange[currency].last;

  console.log('Changing to: ', currency, 'Exchange data: ', exchange);
  //Convert each data point
  volumeData.forEach(function(dataPoint) {
    dataPoint.btc = dataPoint.btc / exchange[currentCurrency].last;
    dataPoint.btc = dataPoint.btc * exchange[currency].last;
  });

  //Update global var
  currentCurrency = currency;

  //Call update
  update(volumeData, 100);

  //Change the axis label
  d3.select('.y.axis > text').text('Volume (' + exchange[currency].symbol + ')');

};

window.graph = {
  init: initGraph,
  rescale: rescaleAxis,
  updateRes: updateRes
};
