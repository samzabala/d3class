/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/

d3.json('data/ages.json').then(function(data){ //es6 pre. ito yung pramis

	console.log(data);

	//convert to int
	data.forEach(function(dat){
		dat.age = +dat.age; // = +var is like parseInt but mas masakop
	})
	

	var svg = d3.select("#chart-area").append("svg")
	.attr("width", 400)
	.attr("height", 400);

	var circles = svg.selectAll("circle") //select shiet
	.data(data); // bind circles to data

	circles.enter() //creating one  element for every data element in the array.
	.append("circle")
		// d is data, i is increment
		.attr("cx", function(d, i){
			return (i * 50) + 25;
		})
		.attr("cy", 25)
		.attr("r", function(d){
			return d.age * 2;
		})
		.attr("fill", function(d){
			return d.name == 'Tony' ? '#3e390d' : 'cyan';
		});
		

}).catch(function(e){
	console.log(error);
})