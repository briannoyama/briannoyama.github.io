/*
 * Contains the data and animations for connecting paths.
 *
 */
var paths = (function(canvas, coordinates){

	var cnt = 0;
	var max_cnt = 200.0;

	var paths = [];

	var svg = canvas.svg;
	var path_pnts = coordinates.path_pnts;
	
	var path_pnts_length = path_pnts.length;

	for (var i = 0; i < path_pnts_length; i++){
		paths[i] = document.createElementNS(svg.namespaceURI, 'path');
		paths[i].setAttribute('stroke', '' + colors[path_pnts[i][2]]); 
		paths[i].setAttribute('class', 'fold'); 
		svg.appendChild(paths[i]);
	}

	paths[0].setAttribute('d', 'M -17.5 16 q 0 0.5 -0.5 1 q -0.5 0.5 -0.5 1 ' + 
			'l 0 299'); 
	paths[1].setAttribute('d', 'M -16 13.5 q 0.5 0 0.5 0.5 l 0 2 q 0 0.5 ' +
			'-0.5 1 l -1.5, 1.5 q -0.5 0.5 -0.5 1  l 0 299'); 
	paths[2].setAttribute('d', 'M -13.5 14 l 0 2 q 0 0.5 -0.5 1 l -3, 3 q -0.5 ' +
			'0.5 -0.5 1  l 0 299'); 
	paths[3].setAttribute('d', 'M -12 10.5 q 0.5 0 0.5 0.5 l 0 5 q 0 0.5 -0.5 1 ' + 
			'l -4.5, 4.5 q -0.5 0.5 -0.5 1  l 0 299'); 
	paths[4].setAttribute('d', 'M -7.5 11 l 0 3 q 0 0.5 -0.5 1 l -8, 8 q -0.5 ' +
			'0.5 -0.5 1  l 0 299'); 
	paths[5].setAttribute('d', 'M -6 5.5 q 0.5 0 0.5 0.5 l 0 8 q 0 0.5 -0.5 1 ' +
			'l -9.5, 9.5 q -0.5 0.5 -0.5 1  l 0 299'); 
	paths[6].setAttribute('d', 'M 4.5 6 q 0 0.5 -0.5 1 l -19, 19 q -0.5 0.5 ' +
			'-0.5 1 l 0 299'); 
	paths[7].setAttribute('d', 'M 5.5 3 q 0 0.5 0.5 0.5 l 10 0 q 0.5 0 1 -0.5 l ' +
			'14 -14 q 0.5 -0.5 1 -0.5 l 99 0'); 
	paths[8].setAttribute('d', 'M 13 1.5 l 3 0 q 0.5 0 1 -0.5 l 12.5 -12.5 ' +
			'q 0.5 -0.5 1 -0.5 l 99 0'); 
	paths[9].setAttribute('d', 'M 12.5 -5 q 0 0.5 0.5 0.5 l 7 0 q 0.5 0 1 -0.5 ' +
			'l 7 -7 q 0.5 -0.5 1 -0.5 l 99 0'); 
	paths[10].setAttribute('d', 'M 18 -6.5 l 2 0 q 0.5 0 1 -0.5 l 5.5 -5.5 ' +
			'q 0.5 -0.5 1 -0.5 l 99 0'); 
	paths[11].setAttribute('d', 'M 16.5 -9 q 0 0.5 0.5 0.5 l 3 0 q 0.5 0 1 -0.5 ' +
			'l 4 -4 q 0.5 -0.5 1 -0.5 l 99 0'); 
	paths[12].setAttribute('d', 'M 20 -10.5 q 0.5 0 1 -0.5 l 2.5 -2.5 q 0.5 ' +
			'-0.5 1 -0.5 l 99 0'); 
	paths[13].setAttribute('d', 'M 20 -14.5 l 99 0'); 


	function anim(){
		for (var i = 0; i < path_pnts_length; i++){
			var diff = (max_cnt - cnt) * (max_cnt - cnt) * (max_cnt - cnt) / (max_cnt * max_cnt);
			var off = paths[i].getTotalLength() * diff/max_cnt;
			var on = paths[i].getTotalLength() * (max_cnt - diff)/max_cnt;
			paths[i].setAttribute('stroke-dasharray', "0," + off + "," + on); 
		}
		
		cnt += 1;

		if (cnt <= max_cnt){
			requestAnimationFrame(anim);
		}
	
	}

	return { 
		anim : anim
	};
});
