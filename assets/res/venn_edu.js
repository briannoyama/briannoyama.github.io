

var venn_edu = (function(venn_obj, script){

  var schools = venn_obj.schools;
  var display_window = document.getElementById(venn_obj.display);
  
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  svg.setAttribute('viewBox', '-180 -100 360 200');
  svg.setAttribute('class', 'education');
  
  function new_circle(s){
    var circle = document.createElementNS(svg.namespaceURI, 'circle');
    circle.setAttribute('cx', '' + s.c_pos[0]);
    circle.setAttribute('cy', '' + s.c_pos[1]);
    circle.setAttribute('r', '' + s.size);
    circle.setAttribute('class', 'education');
    svg.append(circle);
    return circle;
  }
  
  function new_link(s){
    var text = document.createElementNS(svg.namespaceURI, 'text');
    text.setAttribute('x','' + s.t_pos[0]);
    text.setAttribute('y','' + s.t_pos[1]);
    text.append(document.createTextNode(s.name));

    var line = document.createElementNS(svg.namespaceURI, 'path');
    line.setAttribute('class', 'text-line');
    line.setAttribute('d', 'M ' + s.t_pos[0] + ' ' + s.t_pos[1] + 
                          ' V ' + s.c_pos[1] + ' H ' + s.c_pos[0]);
    svg.append(line);

    var text_len = s.text.length;
    var content = '<h3>'+s.name+'</h3>';
    for (var i = 0; i < text_len; i++){
      content += '<h5>' + s.text[i] + '</h5>';
    }

    for (var i = 0; i < text_len; i++){
      var tspan = document.createElementNS(svg.namespaceURI, 'tspan');
      tspan.setAttribute('x','' + s.t_pos[0]);
      tspan.setAttribute('y','' + (s.t_pos[1] + (i + 1) * 10));
      tspan.append(document.createTextNode(s.text[i]));
      text.append(tspan);
    }

    var link = document.createElementNS(svg.namespaceURI, 'a');
    link.setAttribute('class', 'experience');
    link.append(text);

    content += s.desc;
    info_loader(link, display_window, content);
    svg.append(link);
  }

  var schools_len = schools.length;
  var circles = []
  for(var i = 0; i < schools_len; i++){
    var s = schools[i];
    circles[i] = new_circle(schools[i]);
  }

  for(var i = 0; i < schools_len; i++){
    new_link(schools[i]);
  }

  script.parentNode.appendChild(svg);

  function assign_clr(colors){
		var color_index = Math.floor(Math.random()*colors.length);
    for (var i = 0; i < schools_len; i++){
      circles[i].setAttribute('stroke', 
          colors[(color_index + i) % colors.length]);
      circles[i].setAttribute('fill', 
          colors[(color_index + i) % colors.length]);
    }
  }

  $.getJSON('/assets/data/colors.json', assign_clr);

});
