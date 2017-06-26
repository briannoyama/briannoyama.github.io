/*
 *Creates the drawing surface (SVG) for the background of an element.
 *
 */
var canvas = (function(colors){
	var body = document.getElementsByTagName('body')[0];
	//The element that we will put polygons in.
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	//TODO Change the viewBox based off of the size of the parent element.
	svg.setAttribute('viewBox', '-19 -15 90 120');
	svg.setAttribute('id','origami');
	body.appendChild(svg);

	return {
		svg : svg,
		colors : colors
	};
});
