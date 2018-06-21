var bar_margin = {
        top: 40,
        right: 20,
        bottom: 30,
        left: 20
    },
    bar_width = parseInt(d3.select('#bar').style('width'), 10) - bar_margin.left - bar_margin.right,
    bar_height = bar_width * 0.5 - bar_margin.top - bar_margin.bottom;

// set the ranges
var bar_x = d3.scaleBand()
    .range([0, bar_width])
    .padding(0.1);

var bar_y = d3.scaleLinear()
    .range([bar_height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var barSvg = d3.select("#bar").append("svg")
    .attr("width", bar_width + bar_margin.left + bar_margin.right)
    .attr("height", bar_height + bar_margin.top + bar_margin.bottom)
    .attr("id", "bar_chart");

var barChart = barSvg.append("g")
    .attr("transform", `translate(${bar_margin.left}, ${bar_margin.top})`);

// First set the text format
var bar_format = d3.format(".4s");

// Make the SI "G" and "M" labels into "b" for billion and "m" for million respectively
function bar_format_abbrv(x) {
	var s = bar_format(x);
	switch (s[s.length - 1]) {
		case "G":
			return s.slice(0, -1) + "b";
		case "M":
			return s.slice(0, -1) + "m";
	}
	return s;
}

// get the data
d3.csv("data/bar.csv", function (error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function (d) {
        d.total = +d.total;
        d.year = +d.year;
    });

    // Scale the range of the data in the domains
    bar_x.domain(data.map(function (d) {
        return d.year;
    }));
    bar_y.domain([0, d3.max(data, function (d) {
        return d.total;
    })]).nice();

    // append the rectangles for the bar chart
    var bars = barChart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return bar_x(d.year);
        })
        .attr("width", bar_x.bandwidth())
        .attr("y", function (d) {
            return bar_y(d.total);
        })
        .attr("height", function (d) {
            return bar_height - bar_y(d.total);
        })
        .attr("fill", "#E6AC27");

    // add the x Axis
    var bar_xaxis = barChart.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + bar_height + ")")
        .call(d3.axisBottom(bar_x));

    // Turn the ticks off
    barChart.selectAll(".tick line")
        .attr("stroke", "none");

    // add the y Axis
    //var bar_yaxis = barChart.append("g")
    //    .attr("class", "axis")
    //    .call(d3.axisLeft(bar_y).ticks(bar_width/100));

    var bar_captions = barChart.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "bar_labels")
        .text((d) => bar_format_abbrv(d.total))
        .attr("x", (d) => bar_x(d.year) + (bar_x.bandwidth() / 2))
        .attr("y", (d) => bar_y(d.total) - bar_width/50)
        .style("font-family", "Futura-pt, sans-serif")
        .style("font-size", "80%")
        .style("fill", "#f3f1ec")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "baseline");

    barUpdate = function () {
        // Get new width and height
        bar_width = parseInt(d3.select('#bar').style('width'), 10) - bar_margin.left - bar_margin.right;
        bar_height = bar_width * 0.5 - bar_margin.top - bar_margin.bottom;

        // Resize the SVG
        barSvg.attr("width", bar_width + bar_margin.left + bar_margin.right)
            .attr("height", bar_height + bar_margin.top + bar_margin.bottom);

        // Recalculate scales
        bar_x.range([0, bar_width]);
        bar_y.range([bar_height, 0]);

        // Move the bars
        bars.attr("x", function (d) {
                return bar_x(d.year);
            })
            .attr("width", bar_x.bandwidth())
            .attr("y", function (d) {
                return bar_y(d.total);
            })
            .attr("height", function (d) {
                return bar_height - bar_y(d.total);
            });

        // Move the captions
        bar_captions.attr("x", (d) => bar_x(d.year) + (bar_x.bandwidth() / 2))
            .attr("y", (d) => bar_y(d.total) - bar_width/50);

        // Move the axes
        bar_xaxis.attr("transform", "translate(0," + bar_height + ")")
            .call(d3.axisBottom(bar_x));

        //bar_yaxis.call(d3.axisLeft(bar_y).ticks(bar_width/100));
    };

});
