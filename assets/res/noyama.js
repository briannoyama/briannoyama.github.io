var noyama = (function(){

  $(document).ready(function() {
    var page = $('body');
    page.css({'opacity':'0'});
    var head = $("head");
    head.append('<script type="text/javascript" src="/assets/res/polys_coors.js"></script>');
    head.append('<script type="text/javascript" src="/assets/res/canvas.js"></script>');
    head.append('<script type="text/javascript" src="/assets/res/polygons.js"></script>');
    head.append('<script type="text/javascript" src="/assets/res/paths.js"></script>');
    head.append('<script type="text/javascript" src="/assets/res/circles.js"></script>');
    head.append('<script type="text/javascript" src="/assets/res/circlelinks.js"></script>');

    //The colors randomly selected for shapes.
    var colors=["#FF0000", "#FF6100", "#FFb400", 
      "#00D47C", "#008ED6", "#FE2BD0"]
    circlelinks(colors);
    var anim = true;
    if (window.location.hash == '#_'){
      anim = false;
      history.replaceState("", document.title, window.location.pathname);
    }
  
    var canvas_ = canvas(colors, anim);
    circle(canvas_);
    var polygons_ = polygons(canvas_, coordinates);
    var paths_ = paths(canvas_, coordinates, polygons_);
    $(document).ready(paths_.anim);

    //Fade in if not animating svg.
    if (!anim){
      $(document).ready(function(){
        page.animate({
          opacity: '1'
        });
      });
    } else {
      page.css({'opacity':'1'});
    }
  
    //Fade when leaving page.
    var links = document.getElementsByTagName("a"); 
    var links_length = links.length;
    for (var i = 0; i < links_length; i++){
      var class_ = links[i].getAttribute("class");
      if (class_ != null && class_.indexOf('nav')!=-1){
        $(links[i]).click(function(event){
          event.preventDefault();
          var href = this.href;
          if (window.location != href.split('#')[0] && window.location != href){
            page.animate({
                opacity: '0'
              }, 400, function(){
                window.location = href;
            });
          }
        });
      }
    }
  });
})();

