

var venn_edu(function(venn_obj, script){


  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  svg.setAttribute('viewBox', '0 0 10 6');
  svg.setAttribute('class', 'education');



  script.parentNode.appendChild(svg);

  
  function assign_clr(colors){
		var color_index = Math.floor(Math.random()*colors.length);
    for (var i = 0; i < expr_arcs_len; i++){
      for (var j = 0; j < exp_arcs[i].length; j++){
        exp_arcs[i][j].setAttribute('stroke', 
            colors[(color_index + i) % colors.length]);
      }
    }
  }

  
  $.getJSON('/assets/data/colors.json', assign_clr);  


});
