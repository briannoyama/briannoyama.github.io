/*
 * 
 */
var skill_bars = (function(skill_obj, script){
  var skills = skill_obj.skills;
  var ul = document.createElement('ul');
  ul.setAttribute('class', 'skills');

  var skills_len = skills.length;

  var display_window = document.getElementById(skill_obj.display);
  //display_window.setAttribute('class', 'skill-display');
  
  skill_bars=[]
  for (var i = 0; i < skills_len; i++){
    var skill_bar = bar(skills[i], display_window);
    ul.append(skill_bar.li);
    skill_bars[i] = skill_bar.bar;
  }

  script.parentNode.appendChild(ul);
  
  var count = 0;
  var max_cnt = 50.0;
  function anim(){
    for(var i = 0; i < skills_len; i++){
      var cnt = count - i * max_bar *0.25;
      var diff = (max_cnt - cnt) * (max_cnt - cnt) / (max_cnt * max_cnt);
      var off = paths[i].getTotalLength() * diff/max_cnt;
      var on = paths[i].getTotalLength() * (max_cnt - diff)/max_cnt;
      skill_bars[i].setAttribute('stroke-dasharray', "0," + off + "," + on); 
    }
    
    count ++;
    if (count < max_cnt * (1 + skills_len * 0.25)){
      requestAnimationFrame(anim);
    }
  }

  return {
    anim : anim
  };

});

var bar = (function(skill_obj, display_window){
  var li = document.createElement('li');
  var link = document.createElement('a');
  link.append(document.createTextNode(skill_obj.type));

  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  svg.setAttribute('viewBox', '0 -0.5 10 1');
  svg.setAttribute('class', 'skills');

  var bar = document.createElementNS(svg.namespaceURI, 'path');
  bar.setAttribute('d','M 0 -0.1 H '+10*skill_obj.amnt);
  bar.setAttribute('class', 'skills-bar');

  var background = document.createElementNS(svg.namespaceURI, 'path');
  background.setAttribute('d','M 0 0 H 10');
  background.setAttribute('class', 'skills-back');

  svg.append(background);
  svg.append(bar);
  link.append(svg);
  li.append(link);
  
  function on(){
    display_window.innerHTML=skill_obj.desc;
    $(display_window).animate({
      opacity: '1'
    });
  }

  function off(){
    $(display_window).animate({
      opacity: '0'
    });
  }

  $(link).mousedown(on);
  $(link).mouseup(off);
  $(link).hover(on, off);

  return {
    li : li,
    bar : bar    
  };
});

