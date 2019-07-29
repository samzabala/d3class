/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/


var def = {
    width: 800,
    height: 600,
    margin: 20,
    flag:true,
    // duration: d3.transition().duration(200),
    area:'population',
    y:'life_exp',
    x:'income',
    id: 'country'
} 

var time = 0;
var svg = d3.select('#chart-area').append('svg')
    .attr('width', def.width + (def.margin * 6))
    .attr('height', def.width + (def.margin * 6));
var g = svg.append('g')
    .attr('transform','translate('+def.margin * 3 +','+def.margin * 6+')');


    var tip = d3.tip().attr('class', 'd3-tip')
        .html(dis=> {
            var text = "<strong style=\"opacity:.5;font-weight:400;\">Count: </strong>"+dis.country+"<br>";
            text += "<strong style=\"opacity:.5;font-weight:400;\">Cont: </strong>"+dis.country+"<br>";
            text += "<strong style=\"opacity:.5;font-weight:400;\">Life Expectancy: </strong>"+d3.format(".2f")(dis.life_exp)+"<br>";
            text += "<strong style=\"opacity:.5;font-weight:400;\">GDP Per Capita: </strong>"+d3.format("$,.0f")(dis.income)+"<br>";
            text += "<strong style=\"opacity:.5;font-weight:400;\">Population: </strong>"+d3.format(",.0f")(dis.population)+"<br>";

            return text
        })
    g.call(tip);
// X Label
    var xLab = g.append('text')
        .attr('y', def.height + 50)
        .attr('x', def.width / 2)
        .attr('font-size', '18px')
        .attr('text-anchor', 'middle')
        .text(def.x);

// Y Label
    var yLab = g.append('text')
        .attr('y', -20)
        .attr('x', -(def.height / 2))
        .attr('font-size', '18px')
        .attr('text-anchor', 'middle')
        .attr('transform', 'rotate(-90)')
        .text(def.y);
    
var timeLabel = g.append("text")
    .attr("y", def.height - (def.margin * 1.5))
    .attr("x", def.width -  def.margin)
    .attr("font-size", "40px")
    
    .attr("text-anchor", "middle")
//scale
    var xUnit = g.append('g')
        .attr('class','labels labels-x')
        .attr('transform','translate(0,'+def.height +')');
    var yUnit = g.append('g')
        .attr('class','labels labels-y')
        .attr('transform','translate(0,0)');
//ready variables
    var x = d3.scaleLog() //scales shit to dimensios
        .base(10)
        .range([0,def.width]) // scaled data from available space
        .domain([ //value from data
            50,
            500000
        ]);

    var y = d3.scaleLinear()
        .range([
            def.height,
            0
        ])
        .domain([
            0,
            100
        ]);;


    var area = d3.scaleLinear()
        .range([25*Math.PI, 1500*Math.PI]);

    //shit dont gotta change
    var xAx = d3.axisBottom(x) //make an axis, but pass the coordinated value
        .tickValues([50,500, 5000, 50000, 500000])
        .tickFormat(d3.format("$"));

    var yAx = d3.axisLeft(y) //make an axis, but pass the coordinated value
        .tickFormat(function(dis){ return +dis; });



var color = d3.scaleOrdinal()
        .range(['#F5DDDD','#b68aae','#6B4E71','#53687E']);

var continents = ['europe','asia','americas','africa'];

var legend = g.append('g')
        .attr('transform','translate('+ (def.width - (def.margin * 3))+','+(def.height - (def.margin * 8))+')')

        continents.forEach((dis,i)=>{
            var row = legend.append('g')
                .attr('transform','translate(0,'+(i * def.margin) +')');
            
            row.append('text')
                .attr('transform','translate('+def.margin +','+ (def.margin * .5) +')')
                .attr('font-size',def.margin * .8)
                .style("text-transform", "uppercase")
                .text(continents[i]);
            row.append('rect')
                // .attr('x',def.margin * 6)
                // .attr('y',i * def.margin)
                .attr('width',10)
                .attr('height',10)
                .attr('fill',color(dis))

        })


// yes
    function update(dat,daYear) {
        



        //data to coordinates

            area.domain([
                
                d3.min(dat,(dis)=>{
                    return dis[def.area];
                }),
                d3.max(dat,(dis)=>{
                    return dis[def.area];
                })
            ]);

            color.domain([
                d3.map(dat,(dis)=>{
                    return dis[def.id];
                })
            ])


        //pafkatapos na ng mga data
            xUnit.call(xAx);
            yUnit.call(yAx)
            //set up
            bitches = g.selectAll('circle')
                .data(dat,(dis)=>{
                    return dis[def.id]
                }) // link boxes to data dhit //2nd arg is key. aligns data should there be a change of how many graph elements show

            //delete fuckholes
            bitches.exit()
                // .transition(def.duration)
                .attr('r',0)
                .attr('fill-opacity',0)
                .remove()

            // ye 
            bitches

                .enter()
                .append('circle')
                .attr('cx',(dis,i)=>{
                    return dis[def.x] == null ? 0 : x(dis[def.x]) 
                })
                .attr('r',0)
                .attr('cy',(dis,i)=> {
                    return  dis[def.y] == null ? def.height : y(dis[def.y])
                })
                .attr('fill-opacity',.9)
                .attr('fill',(dis,i)=> {
                    return color(dis[def.id])
                })
                .attr('stroke',(dis,i)=> {
                    return color(dis[def.id])
                })
                .on('mouseover',tip.show)
                .on('mouseout',tip.hide)
                .merge(bitches) //use same calls for update from here so less repitir 
                // .transition(def.duration)
                    .attr('cx',(dis,i)=>{
                        return dis[def.x] == null ? 0 : x(dis[def.x]) 
                    })
                    .attr('r',(dis,i)=>{
                        // return dis[def.area]
                        return Math.sqrt(area(dis[def.area]) / Math.PI)
                    })
                    .attr('cy',(dis,i)=> {
                        return  dis[def.y] == null ? def.height : y(dis[def.y])
                    })
                
    timeLabel.text(+(time + parseFloat(daYear)))
            
    }

    

d3.json('data/data.json').then(data => {
    console.log(data);
    
    // Clean data filter out shit that have no country income and or life expectancy
    const formattedData = data.map(function(year){
        return year["countries"].filter(function(country){
            var dataExists = (country.income && country.life_exp);
            return dataExists //return tru e if val
        }).map(function(country){
            country.income = +country.income;
            country.life_exp = +country.life_exp;
            return country;            
        })
    });

    console.log(data[0].year);

    timeLabel.text(data[0].year)

     // Run the code every 0.1 second
     d3.interval(function(){
        // At the end of our data, loop back
        time = (time < 214) ? time+1 : 0
        update(formattedData[time],data[0].year);            //ahhhh
    }, 100);
});



