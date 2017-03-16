
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//check it for yourself!

//the algorithm for A* is
//f(n) = g(n) + h(n);

//f(n) stand for cost for moving
//h(n) stand for heuristics

//sorry for these poor name, but they actually refers to the formula
function point(xValue,yValue){
  this.x = xValue;
  this.y = yValue;
	
  this.f = 0;
  this.h = 0;
  this.parentPath = 0;
  this.open = false;

  this.draw = function(color){
	ctx.fillStyle = color;
  	ctx.fillRect(this.x*pointWidth, this.y*pointHeight, pointWidth, pointHeight);
	ctx.strokeRect(this.x*pointWidth, this.y*pointHeight, pointWidth, pointHeight);
  }
}

//declare size of the grid
var rows = 9; //y
var cols = 9; //x

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



//set the end of the path
var end = grid[cols-1][rows-1];

//give a heuristic value to all spot after defining end spot
for (i=0; i < cols; i++){
	for(j=0; j < rows; j++){
		grid[i][j].h = (grid[i][j].x - end.x)+(grid[i][j].y - end.y);
	}
}


//point that need to be checked
var openSet = [];

//point where path is starting
openSet[0] = grid[0][0];
grid[0][0].open = true;


//point that are checked and closed
var closeSet = [];


//setting a loop for drawing on canvas
var loop = setInterval(function(){ 

	//define open set member
	for(i = 0; i < openSet.length; i++){		
		if(openSet[i].x > 0){                                              	     //if it's not out of bound
			if(grid[openSet[i].x-1][openSet[i].y].open == false){ 		      //if it's not already part of openSet
				openSet[openSet.length] = (grid[openSet[i].x-1][openSet[i].y]);//add it to openSet at the end of the list
				grid[openSet[i].x-1][openSet[i].y].open = true; 		//make sure we don't select him again
			}
		}
		if(openSet[i].x < (cols-1)){
			if(grid[openSet[i].x+1][openSet[i].y].open == false){
				openSet[openSet.length] = (grid[openSet[i].x+1][openSet[i].y]);
				grid[openSet[i].x+1][openSet[i].y].open = true;
			}
		}
		if(openSet[i].y < (rows-1)){
			if(grid[openSet[i].x][openSet[i].y+1].open == false){
				openSet[openSet.length] = (grid[openSet[i].x][openSet[i].y+1]);
				grid[openSet[i].x][openSet[i].y+1].open = true;
			}
		}
		if(openSet[i].y > 0){
			if(grid[openSet[i].x][openSet[i].y-1].open == false){
				openSet[openSet.length] = (grid[openSet[i].x][openSet[i].y-1]);
				grid[openSet[i].x][openSet[i].y-1].open = true;
			}
		}
	}	

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
}, 100);


