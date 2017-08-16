var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//open node list
var openNode = [];

//closed node list
var closedNode = [];

//set the end of the path
var end = {"x":9,"y":9};

//start point
openNode.push(grid[0][0]);

//point on the grid object
function node(){
	this.h,
	this.g,
	this.f,
	this.parentNode
}

//declare size of the grid
var grid = new Array(10,10);

//init all nodes from grid values
for(i=0; i < grid.length; i++){
	for(j=0; j < grid[0].length; j++){
		grid[i][j].h = (Math.abs(i-end.x) + Math.abs(j-end.y));
		setNodeAsParent(i,j);
	}
}

function setNodeAsParent(x,y){
	grid[x][y]
}


ctx.fillStyle = "red";
ctx.fillRect(10,10,20,20);
