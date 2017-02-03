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

  this.draw = function(i,j){
  	ctx.rect(this.x*pointWidth, this.y*pointHeight, pointWidth, pointHeight);
	ctx.stroke();
  }
}

//declare start and end point
var start;
var end;

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

//assign end/start point
start = grid[0][0];
end = grid[cols-1][rows-1];

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








