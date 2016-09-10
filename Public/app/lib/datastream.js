//this file will contain d3 related methods, and will expose the live data
var initGraph = function () {
 
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
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.btc); });

  //Initialize the svg graph
  var svg = d3.select('.main-graph').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var render = function(data) {

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
        .text('Volume (BTC)');

    svg.append('path')
        .attr('class', 'line')
        .attr('d', line(data));
  };

  var update = function(data) {

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.btc; }));

    var trans = d3.select('body').transition();

    trans.select('.x.axis').duration(3000).ease('linear').call(xAxis);
    trans.select('.y.axis').duration(3000).ease('linear').call(yAxis);

    trans.select('.line').duration(3000).ease('linear').attr('d', line(data));
  };



  var socketURI = 'ws://localhost:4000';
  var bucketCount = 0;
  var sumIn = 0;
  var firstBool = true;
  var volumeData = [];

  var processData = function(data) {

    data.time = new Date(data.time);

    //Should only evaulate once
    if (!bucketCount) {
      bucketCount = data.time;
    }

    //Condition to add to the bucket
    if (data.time - bucketCount < 3000) {
      sumIn += data.bc;
    } else {

      //Add to volume data
      //console.log(sumIn);
      volumeData.push({
        btc: sumIn,
        date: data.time
      });

      //Rerender graph
      if (!firstBool) {
        update(volumeData);
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
      render(volumeData);

    } else if (!firstBool) {
      processData(data);
    }
  };

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
    };

  };

  initSocket();

};

var clearGraph = function() {

};

var rescaleAxis = function(currency) {



};

window.initGraph = initGraph;
