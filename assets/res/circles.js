/*
 *Draws circles in the upper left hand corner.
 */
var circle = (function(canvas){

  var svg = canvas.svg;
  
  function new_circle(cx, cy, r){
    var circle_ = document.createElementNS(svg.namespaceURI, 'circle');
    circle_.setAttribute('cx', ''+cx);
    circle_.setAttribute('cy', ''+cy);
    circle_.setAttribute('r', ''+r);
    circle_.setAttribute('class', 'fold');
    svg.append(circle_);
  }
  
  new_circle(0,0,4);
  new_circle(-8.5,1.5,2.5);
  new_circle(-9.5,7.5,1.5);
  new_circle(-14,8,1);
  new_circle(-14.5,11.5,0.5);
  new_circle(-17.5,11.5,0.5);
  new_circle(-1.5,-8.5,2.5);
  new_circle(-7.5,-9.5,1.5);
  new_circle(-8,-14,1);
  new_circle(-11.5,-14.5,.5);
  new_circle(8.5,-1.5,2.5);
  new_circle(9.5,-7.5,1.5);
  new_circle(14,-8,1);
  new_circle(14.5,-11.5,.5);
  new_circle(17.5,-11.5,.5);
});
