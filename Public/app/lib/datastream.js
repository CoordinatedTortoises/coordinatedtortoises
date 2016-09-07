//this file will contain d3 related methods, and will expose the live data
(function () {
 
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

  
  //We might still need something like this.
  var type = function(d) {
    debugger;
    console.log(d.date);
    d.date = formatDate(d.date);
    d.close = +d.close;
    return d;
  };

  // debugger;
  // console.log(formatDate(new Date()));

  var render = function(data) {

    //We might still need this

    // var data = data.map(function(oneData) {
    //   return type(oneData);
    // });

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

    // We might still need this based on what Pete gives me

    // var data = data.map(function(oneData) {
    //   return type(oneData);
    // });
    
    // console.log(data);

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.btc; }));

    d3.select('.x.axis').call(xAxis);
    d3.select('.y.axis').call(yAxis);

    d3.select('.line').attr('d', line(data));
  };



  var socketURI = 'ws://localhost:4000';
  var bucketCount = 0;
  var sumIn = 0;

  var volumeData = [];



  var getInputs = function(data) {
    data = JSON.parse(data);

    //Should just run once on first call
    if (!bucketCount) {
      bucketCount = data.x.time;
    }

    //Condition to add to the bucket
    if (data.x.time - bucketCount < 5) {
      data.x.inputs.forEach(function(input) {
        sumIn += input.prev_out.value;
      });
    } else {
      //Add to volume data
      console.log(sumIn);
      volumeData.push({
        btc: sumIn / 100000000,
        date: new Date()
      });

      //Rerender graph
      //Call the rendering function
      if (volumeData.length === 1 ) {
        render(volumeData);
      } else {
        update(volumeData);
      }

      //Reset variables
      sumIn = 0;
      bucketCount = data.x.time;
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
      console.log(event);
      //getInputs(event.data);
    };

  };

  initSocket();

})();
