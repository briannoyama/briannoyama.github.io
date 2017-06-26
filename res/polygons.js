/*
 *Draws and animates the polygons responsible that represents the pleats.
 *
 */
var polygons = (function(canvas, coordinates){
	var cnt = 0;
	var max_cnt = 200.0;

	var colors = canvas.colors;
	var svg = canvas.svg;
	var mv_pnts = coordinates.mv_pnts;
	var pnts = coordinates.pnts;
	var poly_pnts = coordinates.poly_pnts;
	var path_pnts = coordinates.path_pnts;
	
	var pnts_length = pnts.length;
	var poly_length = poly_pnts.length;
	var path_pnts_length = path_pnts.length;
	

	var polys = [];

	for (var i = 0; i < poly_length; i++) {  
		var color_index = Math.floor(Math.random()*colors.length);
		var assigned = false;
		while(!assigned){
			assigned = true;
			color_index = (color_index + 1 ) % colors.length;
			for (var j = 0; j < poly_pnts[i].length; j++) {
				if (poly_pnts[i][j][2] == color_index){
					assigned = false;
				}
			}
		}
		
		for (var j = 0; j < poly_pnts[i].length; j++) {
			//Only assign a color if we have not assigned one before.
			if (poly_pnts[i][j][2] == -1){
				poly_pnts[i][j][2] = color_index;
			}
		}

		polys[i] = document.createElementNS(svg.namespaceURI, 'polygon');
		polys[i].setAttribute('class', "fold");
		polys[i].setAttribute('style', "fill:" + colors[color_index] + ";"); 
		svg.appendChild(polys[i]);
	}

	//https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
	var a = 17, b = 25, c = -156;
	var den = Math.abs(a*-19 + b*-15 + c);
	function anim() {
		var t = cnt / max_cnt;
		for (var i = 0; i < pnts_length; i++) {
			var dist = Math.abs(a * mv_pnts[i][0][0] + b * mv_pnts[i][0][1] + c) /
				den;
			dist = 1 - dist * dist * dist;
			var percent = (1 - t) * t * dist + t * ((1 - t) * dist + t);
			pnts[i][0] = (1 - percent) * mv_pnts[i][0][0] + percent * mv_pnts[i][1][0];
			pnts[i][1] = (1 - percent) * mv_pnts[i][0][1] + percent * mv_pnts[i][1][1];
		}

		for (var i = 0; i < poly_length; i++) {
			polys[i].setAttribute('points', poly_pnts[i].map(e => e[0] + ' ' + e[1]).join());
		}

		cnt += 1;
		if (cnt <= max_cnt){
			requestAnimationFrame(anim);
		}
	}

	return {
		anim : anim
	}
});
