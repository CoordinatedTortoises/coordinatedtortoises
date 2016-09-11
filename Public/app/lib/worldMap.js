// Taken from Mike Bostock's example
// https://bl.ocks.org/mbostock/d4021aa4dccfd65edffd
var width = 960,
    height = 547;

var projection = d3.geo.patterson()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(0.1);

var draw = function() {

  var path = d3.geo.path()
      .projection(projection);

  var graticule = d3.geo.graticule();

  var map = d3.select(".main-graph").append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "worldMap");

    map.append("path")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

  d3.json("../assets/world-50m.json", function(error, world) {
    if (error) throw error;

    map.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    map.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);

  });

  d3.select(self.frameElement).style("height", height + "px");

};

// loc = [longitude, latitude]
var addLocation = function(loc) {

  var projection = d3.geo.patterson()
      .scale(153)
      .translate([width / 2, height / 2])
      .precision(0.1);

    var coords = projection(loc);

    d3.select(".worldMap").append('svg:circle')
        .attr('cx', coords[0])
        .attr('cy', coords[1])
        .attr('r', 2.5)
        .attr('fill', 'red');

};

