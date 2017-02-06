var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//A* algorithm (heuristics)
//made from this tutorial: https://www.youtube.com/watch?v=aKYlikFAV4k
//check it for yourself!

//the algorithm for A* is
//f(n) = g(n) + h(n);

//f(n) stand for cost for moving
//g(n) stand for actual distance from destination
//h(n) stand for heuristics

//sorry for these poor name, but they actually refers to the formula
function point(){
  this.x = i;
  this.y = j;
	
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.draw = function(color){
	ctx.fillStyle = color;
  	ctx.fillRect(this.x*pointWidth, this.y*pointHeight, pointWidth, pointHeight);
	ctx.strokeRect(this.x*pointWidth, this.y*pointHeight, pointWidth, pointHeight);
  }
}

//declare size of the grid
var rows = 6;
var cols = 6;

var grid = new Array(rows);
var pointWidth = canvas.width/cols;
var pointHeight = canvas.height/rows;

//create point into the 2D array
for (i = 0; i < cols; i++)
{
	grid[i] = new Array(cols);
	for (j = 0; j < rows; j++){
		grid[i][j] = new point(i, j);
	}
}


//point that need to be checked
var openSet = [];
//point where path is starting
openSet[0] = grid[0][0];


//point that are checked and closed
var closeSet = [];


//setting a loop for drawing on canvas
var loop = setInterval(function(){ 

	for(i = 0; i < cols; i++){
		for(j = 0; j < rows; j++){
			grid[i][j].draw("white");
		}
	}


	for(i = 0; i < closeSet.length; i++){
		closeSet[i].draw("red");
	}

	for(i = 0; i < openSet.length; i++){
		openSet[i].draw("green");
	}

}, 100);




