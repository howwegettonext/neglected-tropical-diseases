// The script generates a scatterplot that shows how selected neglected 
// tropical diseases compared with the "big three" diseases of Malaria, 
// HIV and TB when it comes to both funding and DALYs


// Finally, we'll load the data and run the function.
d3.csv("data/scatter.csv").then(function (data) {
    console.log(data);

    // Set chart size
    let margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // First we'll define our axes
    let x = d3.scaleLinear().range([0, width]);
    let y = d3.scaleLinear().range([height, 0]);

    let svg = d3.select("scatter")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    //    .append("g")
    //    .attr("transform", `translate(${margin.left}, ${margin.top})`);


    x.domain([d3.min(data, (d) => d.daly2015),
              d3.max(data, (d) => d.daly2015)])
        .nice();
    
    console.log(x(1000));

    y.domain([d3.min(data, (d) => d.total),
              d3.max(data, (d) => d.total)])
        .nice();
    
    console.log(y(50000));
});
