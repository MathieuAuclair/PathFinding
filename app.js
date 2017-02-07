


var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//check it for yourself!

//the algorithm for A* is
//f(n) = g(n) + h(n);

//f(n) stand for cost for moving
//g(n) stand for actual distance from destination
//h(n) stand for heuristics

//sorry for these poor name, but they actually refers to the formula
function point(xValue,yValue){
  this.x = xValue;
  this.y = yValue;
	
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.nearPoint = [];
  
  this.addNearPoint = function(){
	//adding every near point
	if(this.x < cols-1)
  	this.nearPoint[this.nearPoint.length] = grid[this.x+1][this.y];
	if(this.x > 0)
	this.nearPoint[this.nearPoint.length] = grid[this.x-1][this.y];
	if(this.y < rows-1)
	this.nearPoint[this.nearPoint.length] = grid[this.x][this.y+1];
	if(this.y > 0)
	this.nearPoint[this.nearPoint.length] = grid[this.x][this.y-1];
  }

  this.draw = function(color){
	ctx.fillStyle = color;
  	ctx.fillRect(this.x*pointWidth, this.y*pointHeight, pointWidth, pointHeight);
	ctx.strokeRect(this.x*pointWidth, this.y*pointHeight, pointWidth, pointHeight);
  }
}

//declare size of the grid
var rows = 9;
var cols = 9;

var grid = new Array(rows);
var pointWidth = canvas.width/cols;
var pointHeight = canvas.height/rows;

//create point into the 2D array
for (i = 0; i < cols; i++){
	grid[i] = new Array(cols);
	for (j = 0; j < rows; j++){
		grid[i][j] = new point(i, j);
	}
}

//add nearPoint to every point after they've been generated
for (i = 0; i < cols; i++){
	for (j = 0; j < rows; j++){
		grid[i][j].addNearPoint();
	}
}


//set the end of the path
var end = grid[cols-1][rows-1];
//point that need to be checked
var openSet = [];
//point where path is starting
openSet[0] = grid[0][0];


//point that are checked and closed
var closeSet = [];


//setting a loop for drawing on canvas
var loop = setInterval(function(){ 

	//draw the whole grid
	for(i=0; i < cols; i++){
		for(j=0; j < rows; j++){
			grid[i][j].draw("white");
		}
	}	
	

	//draw close Set
	for(i = 0; i < closeSet.length; i++){
		if(closeSet[i]!=null)
		closeSet[i].draw("red");
	}

	//draw open Set
	for(i = 0; i < openSet.length; i++){
		openSet[i].draw("green");
	}

	//if no solution to explore, stop the pattern
	if(openSet.length > 0)
	{
		var lowestIndex = 0;
		for (i = 0; i < openSet.length; i++){
			if(openSet[i].f < openSet[lowestIndex].f)
			{
				lowestIndex = i;
				console.log(i);
			}
		}
		//check if job is done
		if(openSet[lowestIndex].x == end.x && openSet[lowestIndex].y == end.y)
		{
			console.log("done");
		}	
		closeSet[closeSet.length] = openSet[lowestIndex];
		removeFromArray(openSet, openSet[lowestIndex]);
	}
	else
	{
		//no solution
	}
}, 100);



function removeFromArray(array, index){
	for (i = --array.length; i >= 0; i--){
		if(array[i] == index)
		{
			array.splice(i,1);
		}
	}
}


