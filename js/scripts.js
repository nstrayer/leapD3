var windowWidth		= d3.select("body").style("width"),
	windowHeight	= d3.select("body").style("height"),
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

var svg = d3.select("body")
	.append("svg")
	.attr("width", windowWidth)
	.attr("height", windowHeight);

function translateX(distance) {
	return (distance / maxSpan) * maxX;
}
function translateY(distance) {
	return offsetY - ((distance / maxSpan) * maxY);
}

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

Leap.loop(function(frame) {
	for (var i = 0; i < frame.pointables.length; i++) {
		pointer = frame.pointables[i];
		posX = maxX + translateX(pointer.tipPosition[0]);
		posY = maxY + translateY(pointer.tipPosition[1]);
		posZ = maxZ + translateZ(pointer.tipPosition[2]);
		position(posX, posY, posZ,i);
	}
});
