// The script generates a scatterplot that shows how selected neglected 
// tropical diseases compared with the "big three" diseases of Malaria, 
// HIV and TB when it comes to both funding and DALYs

// Set chart size
let scatter_margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    scatter_width = 960 - scatter_margin.left - scatter_margin.right,
    scatter_height = 500 - scatter_margin.top - scatter_margin.bottom;

// First we'll define our ascatter_xes
let scatter_x = d3.scaleLog().range([0, scatter_width]);
let scatter_y = d3.scaleLog().range([scatter_height, 0]);

let scatter_svg = d3.select("#scatter")
    .append("svg")
    .attr("width", scatter_width + scatter_margin.left + scatter_margin.right)
    .attr("height", scatter_height + scatter_margin.top + scatter_margin.bottom);

let scatter_g = scatter_svg.append("g")
    .attr("transform", `translate(${scatter_margin.left}, ${scatter_margin.top})`);

d3.csv("data/scatter.csv", function (error, data) {
    if (error) throw error;

    scatter_x.domain([d3.min(data, (d) => d.daly2015),
              d3.max(data, (d) => d.daly2015)])
        .nice();


    scatter_y.domain([10, 12000])
        .nice();
    
    // X formatting
    var axisFormat = d3.format(".0s");

	// Make the SI "G" and "M" labels into "b" for billion and "m" for million respectively
	function formatAbbrv(x) {
		var s = axisFormat(x);
		switch (s[s.length - 1]) {
			case "G":
				return s.slice(0, -1) + "b";
			case "M":
				return s.slice(0, -1) + "m";
		}
		return s;
	}
    
    // Add the x axis
    let xaxis = scatter_g.append("g").classed("xaxis", true)
        .attr("transform", "translate(0," + scatter_height + ")")
        .call(d3.axisBottom(scatter_x).tickFormat(function (d) {
				return scatter_x.tickFormat(6, formatAbbrv)(d);
			}))
        .append("text")
        .attr("fill", "#000")
        .attr("x", scatter_width-6)
        .attr("y", "-5px")
        .attr("dx", "0.75em")
        .attr("text-anchor", "end")
        .text("Disability-Adjusted Life Years");

    // Add the y axis
    let yaxis = scatter_g.append("g").classed("yaxis", true)
        .call(d3.axisLeft(scatter_y).tickFormat(function (d) {
				return scatter_y.tickFormat(5, formatAbbrv)(d);
			}))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Total funding since 2007 ($ millions)");

    // Add points
    let scatterpoints = scatter_g.append("g").classed("circles", true)
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (data) => scatter_x(data.daly2015))
        .attr("cy", (data) => scatter_y(data.total))
        .attr("r", 10)
        .attr("fill", (data) => {
            if (data.ntd == "TRUE") return "red";
            else return "blue";
        });

    // Add captions to each point
    let captions = scatter_g.append("g").classed("captions", true)
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((data) => data.disease)
        .attr("x", (data) => scatter_x(data.daly2015))
        .attr("y", (data) => scatter_y(data.total) + 20)
        .style("font-family", "sans-serif")
        .style("font-size", "50%")
        .style("text-anchor", "middle");
});
