
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//set the end of the path
var end = new point(20,24);

//start point
var start = new point(0,0);

//declare size of the grid
var rows = 25; //y
var cols = 25; //x



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

//give a heuristic value to all spot after defining end spot
for (i=0; i < cols; i++){
	for(j=0; j < rows; j++){
		grid[i][j].h = Math.abs(grid[i][j].x - end.x)+Math.abs(grid[i][j].y - end.y);
	}
}


//point that need to be checked
var openSet = [];

//point where path is starting
openSet[0] = start;
openSet[0].open = true;

//point that are checked and closed
var closeSet = [];

//declare an index
var index;


//make a function that return grid point so code is lighter
function getPoint(offsetX, offsetY, current){
	var x = openSet[current].x - offsetX; 
	var y = openSet[current].y - offsetY;

	return grid[x][y];
}


//setting a loop for drawing on canvas
var loop = setInterval(function(){ 

	index = 0;

	//define open set member
	while(index < openSet.length && grid[end.x][end.y].open == false){		
		var bestChoice0 = false, bestChoice1 = false, bestChoice2 = false, bestChoice3 = false;
		var heuristic = rows+cols;
		
		if(getPoint(0,0,index).y < cols-1)//y + 1
		if(getPoint(0,-1,index).open == false && heuristic >= getPoint(0,-1,index).h){  //if it's not already part of openSet
			bestChoice0 = true;
			heuristic = getPoint(0,-1,index).h;
		}

		if(getPoint(0,0,index).x < rows-1)//x + 1
		if(getPoint(-1,0,index).open == false && heuristic >= getPoint(-1,0,index).h){  
			bestChoice1 = true;
			heuristic = getPoint(-1,0,index).h;
			
		}

		if(getPoint(0,0,index).y > 0)//y - 1
		if(getPoint(0,1,index).open == false && heuristic >= getPoint(0,1,index).h){   
			bestChoice2 = true;
			heuristic = getPoint(0,1,index).h;
		}

		if(getPoint(0,0,index).x > 0)//x - 1
		if(getPoint(1,0,index).open == false && heuristic >= getPoint(1,0,index).h){    
			bestChoice3 = true;
			heuristic = getPoint(1,0,index).h;
		}

		
		//this code is real bad, but for now this will work
		//these if statement check if 

		if(bestChoice0){
			openSet[openSet.length] = (grid[openSet[index].x][openSet[index].y+1]);//add it to openSet at the end of the list
			grid[openSet[index].x][openSet[index].y+1].open = true;			//make sure we don't select him again
			grid[openSet[index].x][openSet[index].y+1].parentPath = grid[openSet[index].x][openSet[index].y]; //set the parent
			}
		if(bestChoice1){
			openSet[openSet.length] = (grid[openSet[index].x+1][openSet[index].y]);
			grid[openSet[index].x+1][openSet[index].y].open = true;
			grid[openSet[index].x+1][openSet[index].y].parentPath = grid[openSet[index].x][openSet[index].y];
			}
		if(bestChoice2){
			openSet[openSet.length] = (grid[openSet[index].x][openSet[index].y-1]);
			grid[openSet[index].x][openSet[index].y-1].open = true;
			grid[openSet[index].x][openSet[index].y-1].parentPath = grid[openSet[index].x][openSet[index].y];
			}
		if(bestChoice3){
			openSet[openSet.length] = (grid[openSet[index].x-1][openSet[index].y]);
			grid[openSet[index].x-1][openSet[index].y].open = true;
			grid[openSet[index].x-1][openSet[index].y].parentPath = grid[openSet[index].x][openSet[index].y];
			}


		//add point to closed set
	
		closeSet[closeSet.length] = grid[openSet[index].x][openSet[index].y];
		

		//remove point from openSet
	
		openSet.splice(openSet.indexOf(grid[openSet[index].x][openSet[index].y]), 1);
		
		index++;

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

	end.draw("yellow");
	start.draw("blue");
}, 10);


