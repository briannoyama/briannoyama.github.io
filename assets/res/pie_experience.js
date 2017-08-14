/*
 * 
 */
var pie_experience = (function(experience_obj, script){  
  var paren = [];
  var texts = [];
  var lines = [];
  var current = 0;
  var exper = experience_obj.experiences;
  var gigs = experience_obj.gigs;
  var exp_length = exper.length;
  
  var display_window = document.getElementById(exper.display);
  
  function insert(date, index, time_index){
    var paren_len = paren.length;
    var i = 0;
    for(; i < paren_len; i++){
      if (paren[i][0] == 'now'){
        var today = new Date();
        paren[i][0] = today.getFullYear() * 100 + today.getMonth() + 1;
      }
      if (paren[i][0] > date){
        break;
      }
    }
    paren.splice(i, 0, [date, index, time_index]);
  }

  for (var i = 0; i < exp_length; i++){
    var time_len = exper[i].time.length;
    for (var j = 0; j < time_len; j++){
      insert(exper[i].time[j][0], i, j);
      insert(exper[i].time[j][1], i, j);
    }
  }

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  svg.setAttribute('viewBox', '-180 -100 360 240');
  svg.setAttribute('class', 'experience');

  var paren_len = paren.length;

  var begin = ((paren[0][0] / 100) >> 0) + ((paren[0][0] - 1) % 100)/12.0;
  var end = ((paren[paren_len - 1][0] / 100) >> 0) + 
            (paren[paren_len - 1][0] % 100)/12.0;

  function get_theta(date){
    var normalized = ((date / 100) >> 0) + ((date - 1) % 100)/12.0;
    return Math.PI - 2 * Math.PI * (normalized - begin)/(end - begin);
  }

  function text_node(exper_obj, time_index, x0, y0){
    var x1 = exper_obj.t_pos[time_index][0];
    var y1 = exper_obj.t_pos[time_index][1];

    var text = document.createElementNS(svg.namespaceURI, 'text');
    text.setAttribute('x','' + x1);
    text.setAttribute('y','' + y1);
    
    var tspan0 = document.createElementNS(svg.namespaceURI, 'tspan');
    tspan0.setAttribute('x','' + x1);
    tspan0.setAttribute('y','' + (y1 + 10));
    tspan0.append(document.createTextNode(exper_obj.position));

    var date = exper_obj.time[time_index][0];
    var o_date = exper_obj.time[time_index][1];
    
    var d_text = (date % 100) + '/' + ((date / 100) >> 0) + '-';
    if (o_date === 'now'){
      d_text += 'Now';
    } else {
      d_text += (o_date % 100) + '/' + ((o_date / 100) >> 0);
    }

    var tspan1 = document.createElementNS(svg.namespaceURI, 'tspan');
    tspan1.setAttribute('x','' + x1);
    tspan1.setAttribute('y','' + (y1 + 20));
    tspan1.append(document.createTextNode(d_text));

    text.append(document.createTextNode(exper_obj.company));
    text.append(tspan0);
    text.append(tspan1);

    var line = document.createElementNS(svg.namespaceURI, 'path');

    if (x1 < 0) {
      x1 += 80;
    }

    line.setAttribute('class', 'text-line');
    line.setAttribute('d', 'M ' + x0 + ' ' + y0 + ' V ' + y1 + ' H ' + x1);
    
    var link = document.createElementNS(svg.namespaceURI, 'a');
    link.setAttribute('href', '/');
    link.append(text);
    function on(){
      display_window.innerHTML='<h3>'+exper_obj.position+'</h3><h5>' + d_text + 
      '&nbsp;&nbsp;&nbsp; '+ exper_obj.company + '%</h5>' + skill_obj.desc;
      $(display_window).css({'opacity':'1'});
    }

    function off(){
      $(display_window).css({'opacity':'0'});
    }


    link.onclick = on;
    $(link).mouseup(off);
    $(link).hover(on, off);

    texts[texts.length] = link;
    lines[lines.length] = line;
  }

  var stack = [];
  var arcs = [];
  var exp_arcs = [];
  var min_h = 20;
  var height = min_h;
  for (var i = 0; i < paren_len; i++){
    var start = true;
    for (var j = 0; j < stack.length; j++){
      if (stack[j][0] == paren[i][1]){
        var path = stack[j][1];
        var end_height = stack[j][2];
        stack.splice(j,1);
        
        var date = paren[i][0];
        var index = paren[i][1];
        var theta = get_theta(date + 1);    
        var cos0 = Math.cos(theta);
        var sin0 = Math.sin(theta);      
        var x0 = cos0*end_height;
        var y0 = sin0*end_height;
        
        path.setAttribute('d', path.getAttribute('d') + ' A ' + end_height + ' ' +
                          end_height + ' 0 0 0 ' + x0 + ' ' + y0 );

        if ('offset' in exper[index]){
          path.setAttribute('stroke-width', '' + exper[index].hours);
        } else {
          path.setAttribute('stroke-width', '' + end_height);
          height = min_h;
        }
        
        svg.append(path);
        start = false;
        break;
      }
    }
    if (start) {
      var date = paren[i][0];
      var index = paren[i][1];      
      var theta = get_theta(date);    
      var cos0 = Math.cos(theta);
      var sin0 = Math.sin(theta);

      var loc_height = 0;

      if ('offset' in exper[index]){
        loc_height = (exper[index].offset*2.5 + exper[index].hours);
      } else {
        height += exper[index].hours;
        loc_height = height;
      } 

      var x0 = cos0*loc_height;
      var y0 = sin0*loc_height;
      
      var path = document.createElementNS(svg.namespaceURI, 'path');
      path.setAttribute('d', 'M ' + x0 + ' ' + y0);
      arcs[arcs.length] = path;
      if (exp_arcs[index] == null){
        exp_arcs[index] = [];
      }
      exp_arcs[index][exp_arcs[index].length] = path;
      text_node(exper[index], paren[i][2], x0, y0);

      //Add incomplete arc to the stack.
      stack.splice(0,0,[index, path, loc_height]);      
    }
  }

  var texts_len = texts.length;
  for(var i = 0; i < texts_len; i++){
    svg.appendChild(texts[i])
    svg.appendChild(lines[i])
  }

  script.parentNode.appendChild(svg);
  
  var expr_arcs_len = exp_arcs.length;
  function assign_clr(colors){
		var color_index = Math.floor(Math.random()*colors.length);
    for (var i = 0; i < expr_arcs_len; i++){
      for (var j = 0; j < exp_arcs[i].length; j++){
        exp_arcs[i][j].setAttribute('stroke', 
            colors[(color_index + i) % colors.length]); 
        exp_arcs[i][j].setAttribute('fill', 'none'); 
        exp_arcs[i][j].setAttribute('stroke-dasharray', '0, 1000, 0');
      }
    }
  }

  var count = 0;
  var max_cnt = 50.0;
  var arcs_len = arcs.length;
  function anim(){
    for(var i = 0; i < arcs_len; i++){
      var cnt = count - i * max_cnt *0.15;
      var diff = (max_cnt - cnt);
      if (diff >= 0 && diff <= max_cnt){
        var off = arcs[i].getTotalLength() * diff/max_cnt;
        var on = arcs[i].getTotalLength() * (max_cnt - diff)/max_cnt;
        arcs[i].setAttribute('stroke-dasharray', on + "," + off + "," + on);
      } 
    }
    count ++;
    if (count <= max_cnt * (1 + arcs_len * 0.15)){
      requestAnimationFrame(anim);
    }
  }

  requestAnimationFrame(anim);

  $.getJSON('/assets/data/colors.json', assign_clr);
  
});
