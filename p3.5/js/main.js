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
        duration: d3.transition().duration(750)
    } 

    //set up containers
    var svg = d3.select('#chart-area').append('svg')
            .attr('width', def.width + (def.margin * 3))
            .attr('height', def.width + (def.margin * 6));
        var g = svg.append('g')
        .attr('transform','translate('+def.margin * 3 +','+def.margin * 6+')')
        // X Label
            xLab = g.append('text')
                .attr('y', def.height + 50)
                .attr('x', def.width / 2)
                .attr('font-size', '18px')
                .attr('text-anchor', 'middle')
                .text('MONTH');

        // Y Label
            yLab = g.append('text')
                .attr('y', -40)
                .attr('x', -(def.height / 2))
                .attr('font-size', '18px')
                .attr('text-anchor', 'middle')
                .attr('transform', 'rotate(-90)')
                .text('REVENUE');

        x = d3.scaleBand() //scales shit to dimensios
            .range([0,def.width]) // scaled data from available space
            .paddingInner(.1) //spacing between
            .paddingOuter(.1); //spacing of first and last item from canvas

        y = d3.scaleLinear()
            .range([
                
                def.height,
                0,
            ]);
            var xLeg = g.append('g')
            .attr('class','labels labels-x')
            .attr('transform','translate(0,'+def.height +')');
        var yLeg = g.append('g')
            .attr('class','labels labels-x')
            .attr('transform','translate(0,0)');


    function update(dat){


        //check if we look at revenue or profil??
        var value = def.flag ? 'revenue' : 'profit';



        yLab.text(value.toUpperCase());

        //set up data for front end
        //update domains
            x.domain( //value from data
                    dat.map((dis) => {
                        return dis.month
                    })
                );
            
            y.domain([
                    0,
                    d3.max(dat,(dis)=>{
                        return dis[value];
                    })
                ]);;
            


        //set up legends
            var xAxis = d3.axisBottom(x); //make an axis, but pass the coordinated value

            

            var yAxis = d3.axisLeft(y) //make an axis, but pass the coordinated value
                .ticks(5) //set up visuallness of this axis
                .tickFormat((dis) => {
                    return (dis > 0 ? dis/1000 : 0 ) + 'k'
                }); //format boi

            
                xLeg.transition(def.duration).call(xAxis)
                yLeg.transition(def.duration).call(yAxis)
        //set up graph graphic
            bitches = g.selectAll('circle')
                .data(dat,(dis)=>{
                    return dis.month
                }) // link boxes to data dhit //2nd arg is key. aligns data should there be a change of how many graph elements show

                //delete unneeded shiet
            bitches.exit()
                .transition(def.duration)
                    .attr('fill','#FFB4A2')
                    .attr('r',0)
                .remove()

                //update old shit in new data

            // bitches.transition(def.duration)
            //     .attr('r',x.bandwidth)
            //     .attr('cx',(dis,i)=>{
            //         return x(dis.month)
            //     })
            //     .attr('cy',(dis,i)=> {
            //         return y(dis[value])
            //     })
            bitches
                //put new shit in
                .enter()
                .append('circle')
                .attr('cx',(dis,i)=>{
                    return x(dis.month) + (x.bandwidth() / 2)
                })
                .attr('r',0)
                .attr('cy',(dis,i)=> {
                    return y(dis[value])
                })
                .merge(bitches) //use same calls for update from here so less repitir
                .transition(def.duration)
                    .attr('cx',(dis,i)=>{
                        return x(dis.month) + (x.bandwidth() / 2)
                    })
                    .attr('r',(dis,i)=>{
                        return dis[value] / 1000
                    })
                    .attr('cy',(dis,i)=> {
                        return y(dis[value])
                    })
        
    }

    d3.json('data/revenues.json').then(data => {
        //parse dataa
        data.forEach((dis) => {
            dis.revenue = parseFloat(dis.revenue);
            dis.profit = parseFloat(dis.profit);
        });
        console.log(data);

            
        
        update(data);

        d3.interval(function(){
            var newData = def.flag ? data : data.slice(1)
            update(newData)
            def.flag = !def.flag
        },1000);

    })




        