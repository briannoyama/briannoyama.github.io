var noyama = (function(){
	var head = $("head");
	head.append('<script type="text/javascript" src="res/coordinates.js"></script>');
	head.append('<script type="text/javascript" src="res/canvas.js"></script>');
	head.append('<script type="text/javascript" src="res/polygons.js"></script>');
	head.append('<script type="text/javascript" src="res/paths.js"></script>');
	head.append('<script type="text/javascript" src="res/circles.js"></script>');
	head.append('<script type="text/javascript" src="res/circlelinks.js"></script>');


	//The colors randomly selected for shapes.
	var colors=["#FF0000", "#FF6100", "#FFb400", 
		"#00D47C", "#008ED6", "#FE2BD0"]
	circlelinks(colors);
	var anim = true;
	if (window.location.hash == '#fade'){
		anim = false;
		window.location.hash = '';
	}
	var canvas_ = canvas(colors, anim);
	circle(canvas_);
	var polygons_ = polygons(canvas_, coordinates);
	var paths_ = paths(canvas_, coordinates, polygons_);
	paths_.anim();
	//Fade in if not animating svg.
	if (!anim){
		var page = $('#page');
		page.css({'opacity': '0'});
		$(document).ready(function(){
			page.animate({
				opacity: '1'
			});
		});
	}
	
	//Fade when leaving page.
	var links = document.getElementsByTagName("a"); 
	var links_length = links.length;
	for (var i = 0; i < links_length; i++){
		$(links[i]).click(function(event){
			event.preventDefault();
			var href = this.href;
			$('#page').animate({
				opacity: '0'
			}, 400, function(){
				window.location = href;
			});
		});
	}

})();

