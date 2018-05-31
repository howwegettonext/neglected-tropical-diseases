// The script generates a line chart that shows how interventions for
// Neglected Tropical Diseases have changed over time

// Set chart size
let line_margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 80
    },
    line_width = 960 - line_margin.left - line_margin.right,
    line_height = 500 - line_margin.top - line_margin.bottom;

// First we'll define our axes
let line_x = d3.scaleLinear()
    .range([0, line_width]);

let line_y = d3.scaleLinear()
    .range([line_height, 0]);

// Make an SVG to house the chart
let line_svg = d3.select("#line")
    .append("svg")
    .attr("width", line_width + line_margin.left + line_margin.right)
    .attr("height", line_height + line_margin.top + line_margin.bottom);

// Make a group to contain all the chart bits
let line_g = line_svg.append("g")
    .attr("transform", `translate(${line_margin.left}, ${line_margin.top})`);

// Calculate the x and y coords of each point
let line = d3.line()
    .x(function (d) {
        return line_x(d.year);
    })
    .y(function (d) {
        return line_y(d.total);
    });

d3.csv("data/line.csv", function (error, data) { // Load the data, then...
    if (error) throw error;

    // Set the x axis domain
    line_x.domain([d3.min(data, (d) => d.year),
              d3.max(data, (d) => d.year)])
        .nice();

    // Set the y axis domain
    line_y.domain([0,
              d3.max(data, (d) => d.total)])
        .nice();

    // Add the x axis
    let xaxis = line_g.append("g").classed("xaxis", true)
        .attr("transform", "translate(0," + line_height + ")")
        .call(d3.axisBottom(line_x)
            .ticks(4, d3.format(".4")));

    // Define the y-axis formatting function    
    var yFormat = d3.format(".0s");

//    function yFormatAbbrv(y) {
//        var s = yFormat(y);
//        switch (s[s.length - 1]) {
//            case "G":
//                return s.slice(0, -1) + "b";
//            case "M":
//                return s.slice(0, -1) + "m";
//        }
//        return s;
//    }

    // Add the y axis
    let yaxis = line_g.append("g").classed("yaxis", true)
        .call(d3.axisLeft(line_y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Total interventions");

    // Add the path
    line_g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", line);
});
