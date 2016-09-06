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
      .y(function(d) { return y(d.close); });

  var svg = d3.select('.main-graph').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  
  var type = function(d) {
    d.date = formatDate.parse(d.date);
    d.close = +d.close;
    return d;
  };


  d3.tsv('data.tsv', type, function(error, data) {
    if (error) { 
      throw error;
    }

    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.close; }));

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
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);
  });



  var socketURI = 'wss://ws.blockchain.info/inv';

  var getInputs = function(data) {
    var sumIn = 0;
    var sumOut = 0;
    data = JSON.parse(data);

    console.log(data.x.time);
    data.x.inputs.forEach(function(input) {
      sumIn += input.prev_out.value;
    });

    data.x.out.forEach(function(output) {
      sumOut += output.value;
    });

    return [sumIn / 1000000, sumOut / 1000000];
  };

  var initSocket = function() {

    var bitsocket = new WebSocket(socketURI);
    bitsocket.onopen = function() {
      console.log('Connection opened!');
      bitsocket.send(JSON.stringify({op: 'unconfirmed_sub'}), JSON.stringify({masked: true, setTxMini: true}));
    };
    bitsocket.onerror = function(e) {
      console.log('There was an error: ', e);
    };
    bitsocket.onmessage = function(event) {

      console.log('Message recieved: ', getInputs(event.data));
    };

  };

  initSocket();

  // var graph = d3.select('.main-graph')
  //               .append('svg:svg')
  //               .attr('width', graphOptions.width)
  //               .attr('height', graphOptions.height);



})();
