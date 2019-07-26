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
    duration: d3.transition().duration(750),
    area:'population',
    y:'life_exp',
    x:'income',
    id: 'country'
} 
var svg = d3.select('#chart-area').append('svg')
    .attr('width', def.width + (def.margin * 3))
    .attr('height', def.width + (def.margin * 6));
var g = svg.append('g')
    .attr('transform','translate('+def.margin * 3 +','+def.margin * 6+')');



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
//ready variables
    var x = d3.scaleLog() //scales shit to dimensios
        .base(10)
        .range([0,def.width]) // scaled data from available space

    var y = d3.scaleLinear()
        .range([
            def.height,
            0
        ]);


    var area = d3.scaleLinear()
        .range([25*Math.PI, 1500*Math.PI]);

    
    var xUnit = g.append('g')
        .attr('class','labels labels-x')
        .attr('transform','translate(0,'+def.height +')');
    var yUnit = g.append('g')
        .attr('class','labels labels-y')
        .attr('transform','translate(0,0)');


var color = d3.scaleOrdinal()
        .range(['#F5DDDD','#C2B2B4','#6B4E71','#53687E']);

// yes
    function update(dat) {
        

        var xAx = d3.axisBottom(x) //make an axis, but pass the coordinated value
            .ticks(3)
            .tickFormat(d3.format("$"));
            xUnit.call(xAx);


        

        var yAx = d3.axisLeft(y) //make an axis, but pass the coordinated value
            .ticks(10) //set up visuallness of this axis
            yUnit.call(yAx)



        //data to coordinates
            x.domain([ //value from data
                d3.min(dat,(dis)=>{
                    return dis[def.x]
                }),
                d3.max(dat,(dis)=>{
                    return dis[def.x];
                })
            ]);

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
        
            y.domain([
                0,
                d3.max(dat,(dis)=>{
                    return dis[def.y];
                })
            ]);

            bitches = g.selectAll('circle')
                .data(dat,(dis)=>{
                    return dis[def.id]
                }) // link boxes to data dhit //2nd arg is key. aligns data should there be a change of how many graph elements show

                .enter()
                .append('circle')
                .attr('cx',(dis,i)=>{
                    return dis[def.x] == null ? 0 : x(dis[def.x]) 
                })
                .attr('r',0)
                .attr('cy',(dis,i)=> {
                    return  dis[def.y] == null ? def.height : y(dis[def.y])
                })
                .attr('fill-opacity',.8)
                .attr('fill',(dis,i)=> {
                    return color(dis[def.id])
                })
                .attr('stroke',(dis,i)=> {
                    return color(dis[def.id])
                })
                .transition(def.duration)
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
            
    }

    // function parseShit(dat){

    //     function fuck(doot) {
    //         var doot = doot || dat;
    //         console.log(doot);

    //         if(typeof parseFloat(doot) === 'number') {
    //             doot = parseFloat(doot)
    //         }else if(typeof doot === 'object'){
    //             doot = parseShit(doot);
    //         }

    //         return doot;
    //     }
        
    //     if(typeof dat === 'object') {
    //         Object.keys(dat).forEach((key) => {
    //             var item = dat[key];
    //         })
    //     }else{
    //         dat.forEach((item) => {
    //             fuck(dat);
    //         })
    //     }
    //     return dat;
    // }

d3.json('data/data.json').then(data => {
    // d3.interval(function(){

    //parse data

    // data = parseShit(data);
    // console.log(data);
    var yer = data[0].countries;
            
        
        // var boob = parseShit(data[0]);
            
        console.log(yer);
        update(yer);
    // },1000)
});



