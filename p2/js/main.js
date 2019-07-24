/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

margin = 20;
width = 600 - (margin * 3);
height = 400 - (margin * 6);

var svg = d3.select('#chart-area').append('svg')
    .attr("width", width + (margin * 3))
    .attr("height", height + (margin * 6));

    var g = svg.append('g') //;lagyanan ng kwan
        .attr('transform','translate('+margin * 2.5 +','+margin+')')


d3.json('data/buildings.json').then(function(dat){
    
    dat.forEach(function(dat){
        dat.height = +parseFloat(dat.height);
        // dataNames.push(dat.name);
    })
    
    

    var theX = d3.scaleBand()
        .domain(
            dat.map(function(d){
                return  d.name
            })
        ) 
        .range([0,width])
        .paddingInner(.1)
        .paddingOuter(.25);

    //calculate height relative to the height of the svg canvas
    var theY = d3.scaleLinear()
                .domain([
                    // d3.min(dat,function(d){ return d.value }), //return smolest
                    // d3.max(d3.extent(dat,function(d){ return d.value })), // return largest
                    0,
                    d3.max(dat,function(d){ return d.height }),
                ]) //actual amounts. array to dapat hja
                .range([height,0]); //scaled to svg canvas amounts pag binaligtan mo ganun din arrangement tsaka values  ni kuya pati yung mga height kaYA ISOLVE MO GAMIT ANG MATH




    var axisX = d3.axisBottom(theX);
    g.append('g')
        .attr('class','labels labels-x')
        .call(axisX)
        .attr('transform','translate(0,'+height+')')//di sya nag aapend agad sa baba so itransform mo sya
        //format labels
        .selectAll('text')
            .attr('x',10)
            .attr('y',5)
            .attr('text-anchor','end')
            .attr('transform','rotate(-45)')

    var axisY = d3.axisLeft(theY)
        .ticks(3)
        .tickFormat(function(d){
            return d + "m";
        });
    g.append('g')
        .attr('class','labels labels-y')
        .call(axisY)

    
    var block = g.selectAll('rect')
        .data(dat)
        .enter()
        .append('rect')
            .attr('x',function(d,i){
                return theX(d.name); //yung name
            })
            .attr('y',function(d){
                return theY(d.height)
            })
            .attr('fill','#962f39')
            .attr('width',theX.bandwidth) // calculated width
            .attr('height',function(d,i){
                return height - theY(d.height)
            });
        
        
    console.log(dat);


var text = svg.append("text")
    .attr("x", 150)
    .attr("y", 95)
	.attr("font-size", 70)
	.attr("font-family", "Papyrus")
	// .attr("fill", "#000");
	text.text('butthole');

}).catch(function(e) {
    console.log(e);
});