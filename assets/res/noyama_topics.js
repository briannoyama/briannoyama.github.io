var head = $("head");
head.append('<script type="text/javascript" src="/assets/res/topics_coors.js"></script>');
var t_coors = topics_coors();
/*
 *A cool animation for groups of pics.
 */
var topics = (function(img_json){
  
  var script = document.getElementsByTagName('script');
  script = script[script.length - 1];

  var img_object = JSON.parse(img_json);
  var img_object_len = img_object.length;  

  xlink = 'http://www.w3.org/1999/xlink';
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns:xlink', xlink);
  
  //Change the viewBox based off of the number images passed in .
  svg.setAttribute('viewBox', t_coors.dimensions[img_object_len - 1]);
  svg.setAttribute('class','topics');

  var positions = t_coors.positions;
  var squares = t_coors.squares;

  var squares_len = squares.length;
  for (var i = 0; i < img_object_len; i++){
    square = document.createElementNS(svg.namespaceURI, 'clipPath');
    square.setAttribute('id', 'shift_sq_' + i);
    square.setAttribute('clipPathUnits', 'objectBoundingBox');
    var shape = document.createElementNS(svg.namespaceURI, 'polygon');
    shape.setAttribute('points', squares[positions[i][1]][0].join());
    square.append(shape);
    svg.append(square);
    
    link = document.createElementNS(svg.namespaceURI, 'a');
    link.onclick = function(){
      alert('test');    
      return false;
    }

    image = document.createElementNS(svg.namespaceURI, 'image');
    image.setAttribute('width', squares[positions[i][1]][1]);
    image.setAttribute('height', squares[positions[i][1]][1]);
    image.setAttribute('x', positions[i][0][0]);
    image.setAttribute('y', positions[i][0][1]);
    image.setAttributeNS(xlink, 'href', img_object[i].url);
    image.setAttribute('title', img_object[i].desc);
    image.setAttribute('clip-path', 'url(#shift_sq_' + i + ')');
    title = document.createElementNS(svg.namespaceURI, 'title');
    title.append(document.createTextNode(img_object[i].desc));
    image.append(title);
    link.append(image);
    svg.append(link);
  }

  script.parentNode.appendChild(svg);
});

