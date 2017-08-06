/*
 * Holds the coordinates for the themed topic bubbles.
 */
var topics_coors = (function(){
  var squares = [
             [[0, 0.1, 0.1, 1, 1, 0.9, 0.9, 0], 10],  //8
             [[0.143, 0, 0, 0.857, 0.857, 1, 1, 0.143], 7],  //5
             [[0, 0.2, 0.2, 1, 1, 0.8, 0.8, 0], 5],  //3
             [[0.25, 0, 0, 0.75, 0.75, 1, 1, 0.25], 4],  //2
             [[0, 0.333, 0.333, 1, 1, 0.667, 0.666, 0], 3], //1
             [[0.333, 0, 0, 0.666, 0.667, 1, 1, 0.333], 3] //1
             ];
  var positions = [ //Position, size, shape at position.
             [[-5, -5], 0],
             [[-12, -2], 1],
             [[5, -5], 1],
             [[-2, 5], 1],
             [[-12, 5], 2],
             [[5, 7], 2],
             [[-16, 6], 3],
             [[-16, 10], 4],
             [[-19, 10], 5],
             [[-5, -12], 1],
             [[7, -10], 2],
             [[-10, -12], 2],
             [[6, 12], 3],
             [[12, -10], 3],
             [[-10, -16], 3],
             [[10, 13], 4],
             [[13, -13], 4],
             [[-13, -16], 4],
             [[16, -13], 5],
             [[10, 16], 5],
             [[-13, -19], 5]
             ];
  var dimensions = [
             '-5, -5, 10, 10',
             '-12, -5, 17, 10',
             '-12, -5, 24, 10',
             '-12, -5, 24, 17',
             '-12, -5, 24, 17',
             '-12, -5, 24, 17',
             '-16, -5, 28, 17',
             '-16, -5, 28, 18',
             '-19, -5, 31, 18',
             '-19, -12, 31, 25',
             '-19, -12, 31, 25',
             '-19, -12, 31, 25',
             '-19, -12, 31, 28',
             '-19, -12, 35, 28',
             '-19, -16, 35, 32',
             '-19, -16, 35, 32',
             '-19, -16, 35, 32',
             '-19, -16, 35, 32',
             '-19, -16, 38, 32',
             '-19, -16, 38, 35',
             '-19, -19, 38, 38'
             ];
  return {
    squares : squares,
    positions : positions,
    dimensions : dimensions
  }
});
