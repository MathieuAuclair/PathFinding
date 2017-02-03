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
var point = {
  this.x = i;
  this.y = j;
	
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.draw = function(i,j){
  	ctx.rect(this.x*pointWidth, this.y*pointHeight, pointWidth, pointHeight);
	ctx.fill(255,255,255);
	ctx.stroke(0,0,0);
  }
}

//declare start and end point
var start;
var end;

var rows = 5;
var cols = 5;
var grid = new Array(cols);
var pointWidth = canvas.width/cols;
var pointHeight = canvas.height/rows;

//create point into the 2D array
for (i = 0; i < cols; i++)
{
	for (j = 0; j < rows; j++){
		grid[i][j] = new point();
	}
}

//assign end/start point
start = grid[0][0];
end = grid[--cols][--rows];

//point that need to be checked
var openSet = [];

//point where path is starting
openSet[--openSet.lenght] = start;



//point that are checked and closed
var closeSet = [];


//setting a loop for drawing on canvas
var loop = setInterval(function(){ 
if(openSet.lenght > 0)
	{
		//keep going on!
	}
else
	{
		//there is no solution
	clearInterval(loop);
	}
for(i = 0; i < cols; i++){
	for(j = 0; j < rows; j++){
		grid[i][j].draw(i,j);
		}
	}

}, 100);








