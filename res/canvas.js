/*
 *Creates the drawing surface (SVG) for the background of an element.
 *
 */
var canvas = (function(colors){
	var window_ = $(window);
	var body = document.getElementById('page');
	//The element that we will put polygons in.
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	//TODO Change the viewBox based off of the size of the parent element.
	svg.setAttribute('viewBox', '-19 -15 90 260');
	svg.setAttribute('id','origami');
	body.appendChild(svg);


	window_.scroll(function(){
		var w_offset = $(window).scrollTop();
		var height = svg.getBoundingClientRect().height*50/160;
		if (w_offset > height){
			//Math.round(w_offset)
			svg.setAttribute('style','top: auto; bottom: 0;');
		} else {
			svg.setAttribute('style','top: -' +w_offset+'px; bottom: auto;');
		}
	});

	return {
		svg : svg,
		colors : colors
	};
});
