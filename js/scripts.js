var windowWidth		= d3.select("body").style("width"),
	windowHeight	= d3.select("body").style("height"),
	width 			= 1000,
	height 			= 500,
	originX			= 600,
	originY			= 600,
	originZ			= 600,
	maxX			= originX,
	maxY			= originY,
	maxZ			= originZ,
	maxSpan			= 100,
	maxZSpan		= 160,
	offsetY			= 1400;



var posX,
	posY,
	posZ,
	pointer;

var xRange = [10,15],  //Set up very conservative ranges at first. Range[0] is min, [1] is max. 
	yRange = [100,105],
	zRange = [10,15];

var svg = d3.select("body")
	.append("svg")
	.attr("width", windowWidth)
	.attr("height", windowHeight);

xScale = d3.scale.linear()
			.domain(xRange)
			.range([0, width])

yScale = d3.scale.linear()
			.domain(yRange)
			.range([height, 0])

// function translateX(distance) {
// 	return (distance / maxSpan) * maxX;
// }
// function translateY(distance) {
// 	return offsetY - ((distance / maxSpan) * maxY);
// }

function translateZ(distance){
	return (distance / maxZSpan) * maxZ;
}

function position(x,y,z,index) {
	var color = "grey"
	if (index%2 == 0){
		color = "green"
	} else {
		color = "gold"
	}
	
	svg.append("circle")
		.attr("cx", x)
		.attr("cy", y)
		.attr("r", z/30)
		.attr("fill", color)
	.transition(40)
	.attr("fill", "white")
		.remove();
}

function isMax(value, max) {
	if (value > max){
		return value
	} else {
		return max
	}
}

function isMin(value, min) {
	if (value < min) {
		return value
	} else {
		return min
	}
}

Leap.loop(function(frame) {
	for (var i = 0; i < frame.pointables.length; i++) {
		pointer = frame.pointables[i];
		var x = pointer.tipPosition[0],
			y = pointer.tipPosition[1],
			z = pointer.tipPosition[2];

		xRange[1] = isMax(x, xRange[1])
		yRange[1] = isMax(y, yRange[1])
		zRange[1] = isMax(z, zRange[1])

		xRange[0] = isMin(x, xRange[0])
		yRange[0] = isMin(y, yRange[0])
		zRange[0] = isMin(z, zRange[0])

		xScale.domain(xRange)
		yScale.domain(yRange)
		// zScale.domain(zRange)

		// posX = maxX + translateX(x);
		// posY = maxY + translateY(y);
		// posZ = maxZ + translateZ(z);
		posX = xScale(x);
		posY = yScale(y);
		posZ = maxZ + translateZ(z);

		position(posX, posY, posZ,i);
	}
});
