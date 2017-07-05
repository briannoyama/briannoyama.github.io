/*
 *Creates the drawing surface (SVG) for the background of an element.
 *
 */
var canvas = (function(colors){
	var window_ = $(window);
	var body = document.getElementById('page');
	var menu = document.getElementById('menu');
	//The element that we will put polygons in.
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	//TODO Change the viewBox based off of the size of the parent element.
	svg.setAttribute('viewBox', '-19 -15 90 260');
	svg.setAttribute('id','origami');
	body.appendChild(svg);

	var height = svg.getBoundingClientRect().height*50/260;
	var menu_offset = menu.offsetTop;
	window_.scroll(function(){
		var w_offset = window_.scrollTop();
		if (w_offset > height){
			svg.setAttribute('style','top: auto; bottom: 0;');
		} else {
			svg.setAttribute('style','top: 0; bottom: auto;');
		}

		if (w_offset > menu_offset){
			menu.setAttribute('style','position: fixed;');
		} else {
			menu.setAttribute('style','position: relative;');
		}

	});

	window_.resize(function(){
		height = svg.getBoundingClientRect().height*50/260;
		menu_offset = menu.offsetTop;
	});

	return {
		svg : svg,
		colors : colors
	};
});
