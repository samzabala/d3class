/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

var def = {
    width: 500,
    height: 600,
    margin: 20
} 

//set up containers
var svg = d3.select('#chart-area').append('svg')
        .attr("width", def.width + (def.margin * 3))
        .attr("height", def.width + (def.margin * 6));
    var g = svg.append('g')
        .attr('width',def.width)
        .attr('height',def.height)


d3.json('data/revenues.json').then(dat => {
    //parse data
    dat.forEach((dis) => {
        dis.revenue = parseFloat(dis.revenue);
        dis.profit = parseFloat(dis.profit);
    });
    console.log(dat);

    //set up data for front end
        var theX = d3.scaleBand()
            .domain( 
                // set domain
                dat.map((dis) => {
                    return dis.month
                })
            )
            // set range
            .range([0,def.width])
            .paddingInner(5)
            .paddingOuter(5);
        
        var theY = d3.scaleLinear()
            .domain([
                0,
                d3.max(dat,(dis)=>{
                    return dis.revenue;
                })
            ])
            .range([
                def.height,
                0
            ]);

            console.log(d3.max(dat,(dis)=>{
                return dis.revenue;
            }));

    //set up elements
        var bar = g.selectAll('rect')
            .data(dat)
            .enter()
            .append('rect')

            .attr('x',(dis,i)=>{
                theX(dis.month)
            })
            .attr('y',0)

            .attr('width',theX.bandwidth)
            .attr('height',(dis,i) => {
                return theY(dis.revenue)
            })

})




        