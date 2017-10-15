/*
 *Creates the drawing surface (SVG) for the background of an element.
 *
 */
var canvas = (function(colors, anim){
  var window_ = $(window);
  var body = document.getElementById("page"); 
  var title = document.getElementById('title');
  var menu = document.getElementById('menu');
  //The element that we will put polygons in.
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
  svg.setAttribute('viewBox', '-19 -15 90 260');
  svg.setAttribute('id','origami');
  body.appendChild(svg);

  var height = svg.getBoundingClientRect().height*50/260;
  window_.scroll(function(){
    var w_offset = window_.scrollTop();
    if (w_offset > height){
       svg.setAttribute('style','top: auto; bottom: 0; position: fixed;');
    } else {
       svg.setAttribute('style','top: 0; bottom: auto; position: absolute;');
    }

  });

  window_.resize(function(){
    height = svg.getBoundingClientRect().height*50/260;
  });

  return {
    svg : svg,
    colors : colors,
    anim: anim
  };
});
