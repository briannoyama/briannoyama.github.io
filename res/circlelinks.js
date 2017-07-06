var circlelinks = (function(colors){
	var circles = document.getElementsByClassName("circle"); 
	var circles_length = circles.length;
	for (var i = 0; i < circles_length; i++){
		//TODO add animations for links here.
		var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('viewBox', '0 0 5 5');
		svg.setAttribute('class', 'link');
		circles[i].append(svg);
		var circle_ = document.createElementNS(svg.namespaceURI, 'circle');
		circle_.setAttribute('cx', '2.5');
		circle_.setAttribute('cy', '2.5');
		circle_.setAttribute('r', '1.5');
		circle_.setAttribute('class', 'fold');
		svg.append(circle_);
	}


});
