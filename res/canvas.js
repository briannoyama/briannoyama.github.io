/*
 *Creates the drawing surface (SVG) for the background of an element.
 *
 */
var canvas = (function(colors){
	var window_ = $(window);
	var body = document.getElementById('page');
	var title = document.getElementById('title');
	var menu = document.getElementById('menu');
	//The element that we will put polygons in.
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	//TODO Change the viewBox based off of the size of the parent element.
	svg.setAttribute('viewBox', '-19 -15 90 260');
	svg.setAttribute('id','origami');
	body.appendChild(svg);

	var height = svg.getBoundingClientRect().height*50/260;
	window_.scroll(function(){
		var w_offset = window_.scrollTop();
		if (w_offset > height){
			svg.setAttribute('style','top: auto; bottom: 0;');
		} else {
			svg.setAttribute('style','top: 0; bottom: auto;');
		}

		if (w_offset > title.offsetHeight){
			menu.setAttribute('style','position: fixed; background:linear-gradient(#FFFFFFFF, #FFFFFF00);');
		} else {
			menu.setAttribute('style','position: relative; background: auto;');
		}

	});

	window_.resize(function(){
		height = svg.getBoundingClientRect().height*50/260;
	});

	return {
		svg : svg,
		colors : colors
	};
});
