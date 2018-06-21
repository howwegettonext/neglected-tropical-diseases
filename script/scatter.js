// The script generates a scatterplot that shows how selected neglected 
// tropical diseases compared with the "big three" diseases of Malaria, 
// HIV and TB when it comes to both funding and DALYs

// Set chart size
let scatter_margin = {
        top: 20,
        right: 40,
        bottom: 30,
        left: 40
    },
    scatter_width = parseInt(d3.select('#scatter').style('width'), 10) - scatter_margin.left - scatter_margin.right,
    scatter_height = scatter_width * 0.5 - scatter_margin.top - scatter_margin.bottom;

// First we'll define our ascatter_xes
let scatter_x = d3.scaleLog().range([0, scatter_width]);
let scatter_y = d3.scaleLog().range([scatter_height, 0]);

let scatterSvg = d3.select("#scatter")
    .append("svg")
    .attr("width", scatter_width + scatter_margin.left + scatter_margin.right)
    .attr("height", scatter_height + scatter_margin.top + scatter_margin.bottom);

let scatterChart = scatterSvg.append("g")
    .attr("transform", `translate(${scatter_margin.left}, ${scatter_margin.top})`);

d3.csv("data/scatter.csv", function (error, data) {
    if (error) throw error;

    scatter_x.domain([200, 100000]);


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
    let scatter_xaxis = scatterChart.append("g").classed("xaxis", true)
        .attr("class", "axis")
        .attr("transform", "translate(0," + scatter_height + ")")
        .call(d3.axisBottom(scatter_x).tickFormat(function (d) {
            return scatter_x.tickFormat(3, formatAbbrv)(d);
        }));

    let scatter_xlabel = scatter_xaxis.append("text")
        .attr("fill", "#f3f1ec")
        .attr("x", scatter_width - 6)
        .attr("y", "-5px")
        .attr("dx", "0.75em")
        .attr("text-anchor", "end")
        .text("Disability-Adjusted Life Years");

    // Add the y axis
    let scatter_yaxis = scatterChart.append("g").classed("yaxis", true)
        .attr("class", "axis")
        .call(d3.axisLeft(scatter_y).tickFormat(function (d) {
            return scatter_y.tickFormat(scatter_height / 200, formatAbbrv)(d);
        }));

    let scatter_ylabel = scatter_yaxis.append("text")
        .attr("fill", "#f3f1ec")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Funding since 2007 ($ millions)");

    // Add points
    let scatterpoints = scatterChart.append("g").classed("circles", true)
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (data) => scatter_x(data.daly2015))
        .attr("cy", (data) => scatter_y(data.total))
        .attr("r", 5)
        .attr("fill", (data) => {
            if (data.ntd == "TRUE") return "#E6AC27";
            else return "#7fbda3";
        });

    // Add captions to each point
    let scatter_captions = scatterChart.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((data) => data.disease)
        .attr("class", "captions")
        .attr("x", (data) => scatter_x(data.daly2015))
        .attr("y", (data) => scatter_y(data.total) + 14)
        .style("visibility", () => { //Breakpoint for caption visibility
            if (scatter_width > 700) {
                return "visible";
            } else {
                return "hidden";
            }
        })
        .style("font-family", "Futura-pt, sans-serif")
        .style("font-size", "70%")
        .style("fill", (data) => {
            if (data.ntd == "TRUE") return "#E6AC27";
            else return "#7fbda3";
        })
        .style("text-anchor", "left")
        .style("alignment-baseline", "middle");

    scatterUpdate = function () {
        // Get new width and height
        scatter_width = parseInt(d3.select('#scatter').style('width'), 10) - scatter_margin.left - scatter_margin.right;
        scatter_height = scatter_width * 0.5 - scatter_margin.top - scatter_margin.bottom;

        // Resize SVG
        scatterSvg.attr("width", scatter_width + scatter_margin.left + scatter_margin.right)
            .attr("height", scatter_height + scatter_margin.top + scatter_margin.bottom);

        // Recalculate scales
        scatter_x.range([0, scatter_width]);
        scatter_y.range([scatter_height, 0]);

        // Move the points and the captions
        scatterpoints.attr("cx", (data) => scatter_x(data.daly2015))
            .attr("cy", (data) => scatter_y(data.total));

        scatter_captions.attr("x", (data) => scatter_x(data.daly2015))
            .attr("y", (data) => scatter_y(data.total) + 18)
            .style("visibility", () => { // Breakpoint for caption visibility
                if (scatter_width > 700) {
                    return "visible";
                } else {
                    return "hidden";
                }
            });

        // Move the axes
        scatter_xaxis.attr("transform", "translate(0," + scatter_height + ")")
            .call(d3.axisBottom(scatter_x).tickFormat(function (d) {
                return scatter_x.tickFormat(3, formatAbbrv)(d);
            }));

        scatter_xlabel.attr("x", scatter_width - 6);

        scatter_yaxis.call(d3.axisLeft(scatter_y).tickFormat(function (d) {
            return scatter_y.tickFormat(scatter_height / 200, formatAbbrv)(d);
        }));
    };

});
