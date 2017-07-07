/*
 *Draws and animates the polygons responsible that represents the pleats.
 *
 */
var polygons = (function(canvas, coordinates){
	var cnt = 0;
	var max_cnt = 75.0;

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

	function anim() {
		for (var i = 0; i < pnts_length; i++) {
			pnts[i][0] = ((max_cnt - cnt) * mv_pnts[i][0][0] + cnt * mv_pnts[i][1][0])/max_cnt;
			pnts[i][1] = ((max_cnt - cnt) * mv_pnts[i][0][1] + cnt * mv_pnts[i][1][1])/max_cnt;
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
