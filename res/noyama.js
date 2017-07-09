$.getScript('res/coordinates.js');
$.getScript('res/canvas.js');
$.getScript('res/polygons.js');
$.getScript('res/paths.js');
$.getScript('res/circles.js');
$.getScript('res/circlelinks.js');

//The colors randomly selected for shapes.
var colors=["#FF0000", "#FF6100", "#FFb400", 
	"#00D47C", "#008ED6", "#FE2BD0"]
circlelinks(colors);
var canvas_ = canvas(colors);
circle(canvas_);
var polygons_ = polygons(canvas_, coordinates);
var paths_ = paths(canvas_, coordinates, polygons_);

requestAnimationFrame(paths_.anim);
