var head = $("head");
head.append('<script type="text/javascript" src="/assets/res/topics_coors.js"></script>');
var t_coors = topics_coors();
/*
 *A cool animation for groups of pics.
 */
var topics = (function(img_json){
  
  var script = document.getElementsByTagName('script');
  script = script[script.length - 1];

  var fig_capt = document.createElement('figcaption');
  fig_capt.setAttribute('class', 'topics');
  
  var img_object = JSON.parse(img_json);
  var img_object_len = img_object.length;  

  xlink = 'http://www.w3.org/1999/xlink';
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns:xlink', xlink);
  
  //Change the viewBox based off of the number images passed in .
  svg.setAttribute('viewBox', t_coors.dimensions[img_object_len - 1]);
  svg.setAttribute('class','topics');

  function update(i){
    if (current != i){
      current = i;
      counter = 0;
      if (!animating){
        animating = true;
        anim();
      }
      fig_capt.innerHTML = '';
      fig_capt.append(document.createTextNode(squares[i].desc));
      return false;
    }
    return true;
  }

  var squares = [];
  for (var i = 0; i < img_object_len; i++){
    squares[i] = moving_sq(i, img_object[i], svg, update);
  }

  fig_capt.append(document.createTextNode(squares[0].desc));
  script.parentNode.appendChild(fig_capt);
  script.parentNode.appendChild(svg);

  var animating = false;
  var current = 0;
  var counter = 49;
  var max_cnt = 50.0;

  function anim(){
    var den = max_cnt - counter;
    for (var i = 0; i < img_object_len; i++){
      var index = (i + img_object_len - current) % img_object_len;
      squares[i].anim(index, den);  
    }

    counter += 1;
    if (counter < max_cnt){
      requestAnimationFrame(anim);
    } else {
      animating = false;
    }
  }
  
  anim();
});

var moving_sq = (function(i, img_, svg, update){
    
  var positions = t_coors.positions;
  var squares = t_coors.squares;

  var coors = [squares[positions[i][1]][0].slice(),
               squares[positions[i][1]][1],
               positions[i][0][0],positions[i][0][1]];

  var square = document.createElementNS(svg.namespaceURI, 'clipPath');
  square.setAttribute('id', 'shift_sq_' + i);
  square.setAttribute('clipPathUnits', 'objectBoundingBox');
  var shape = document.createElementNS(svg.namespaceURI, 'polygon');
  square.append(shape);
  svg.append(square);
    
  var link = document.createElementNS(svg.namespaceURI, 'a');
  link.onclick = (function(){
    return update(i);
  });
  link.setAttribute('href', img_.url);
  link.setAttribute('target', '_blank');
  
  var image = document.createElementNS(svg.namespaceURI, 'image');
  image.setAttributeNS(xlink, 'href', img_.url);
  image.setAttribute('clip-path', 'url(#shift_sq_' + i + ')');
  var title = document.createElementNS(svg.namespaceURI, 'title');
  title.append(document.createTextNode(img_.desc));
  image.append(title);
  link.append(image);
  svg.append(link);

  function anim(index, den){
    for (var j = 0; j < 8; j++){
      var prev = coors[0][j] * (den - 1)/den;
      var next = squares[positions[index][1]][0][j]/den;
      coors[0][j] = coors[0][j] * (den - 1)/den + 
                            squares[positions[index][1]][0][j]/den;
    }
    coors[1] = coors[1] * (den - 1)/den + squares[positions[index][1]][1]/den;
    coors[2] = coors[2] * (den - 1)/den + positions[index][0][0]/den;
    coors[3] = coors[3] * (den - 1)/den + positions[index][0][1]/den;
    shape.setAttribute('points', coors[0].join());
    image.setAttribute('width', coors[1]);
    image.setAttribute('height', coors[1]);
    image.setAttribute('x', coors[2]);
    image.setAttribute('y', coors[3]);
  }

  return {
    anim : anim,
    desc : img_.desc
  }

});

