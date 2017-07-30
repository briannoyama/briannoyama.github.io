var circlelinks = (function(colors){
	var circles = document.getElementsByClassName('circle'); 
	var circles_length = circles.length;
	for (var i = 0; i < circles_length; i++){
		hovercircle(circles[i], 2.5, colors);
	}

	circles = document.getElementsByClassName('largecircle'); 
	circles_length = circles.length;
	for (var i = 0; i < circles_length; i++){
		hovercircle(circles[i], 7.5, colors);
	}
});

var hovercircle = (function(parent_, radius, colors){
	var cnt = 0;
	var max_cnt = 50.0;
	
	var color_index = Math.floor(Math.random()*colors.length);
	
	var polys = [];
	
	var direction = 0;
	function anim(){
		var offset = ((max_cnt - cnt) * radius + cnt * (radius - 1)) / max_cnt;
			polys[0].setAttribute('points', radius + ' ' + offset +
				' -' + offset + ' ' + offset +
				' -' + offset + ' ' + radius);
			polys[1].setAttribute('points', radius + ' ' + offset +
				' ' + offset + ' ' + offset +
				' ' + offset + ' -' + radius);
			polys[2].setAttribute('points', '-' + radius + ' -' + offset +
				' ' + offset + ' -' + offset +
				' ' + offset + ' -' + radius);
			polys[3].setAttribute('points', '-' + radius + ' -' + offset +
				' -' + offset + ' -' + offset +
				' -' + offset + ' ' + radius);
		cnt += direction;
		if (cnt <= max_cnt && cnt >= 0){
			requestAnimationFrame(anim);
		} else {
			direction = 0;
		}
	}

	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('viewBox', '-' +radius+ ' -' + radius + ' ' + 2 * radius + 
		' ' + 2* radius);
	svg.setAttribute('class', 'link');
	parent_.append(svg);

	var circle_ = document.createElementNS(svg.namespaceURI, 'circle');
	circle_.setAttribute('cx', '0');
	circle_.setAttribute('cy', '0');
	circle_.setAttribute('r', '' + (radius - 1));
	circle_.setAttribute('class', 'fold');
	svg.append(circle_);
	
	for(var i = 0; i < 4; i++){
		polys[i] = document.createElementNS(svg.namespaceURI, 'polygon');
		polys[i].setAttribute('class', "fold");
		polys[i].setAttribute('style', "fill:" + colors[(color_index + i) % 
				colors.length] + ";"); 
		svg.append(polys[i]);
	}

	anim();

	function on() {
		if (direction == 0){
			requestAnimationFrame(anim);
		}
		direction = 1;
	}

	function off() {
		if (direction == 0){
			requestAnimationFrame(anim);
		}
		direction = -1;
	}
	
	$(parent_).hover(on, off);
});
