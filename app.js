var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Node(walkable, nodePosition){
	this.isWalkable = walkable,
	this.position = nodePosition
	this.gCost,
	this.hCost,
	this.fCost = function(){
		return this.gCost + this.fCost;
	}
	this.draw = function(color, size){
		ctx.fillStyle = color;
  		ctx.fillRect(this.position.x*size.x, this.position.y*size.y, size.x, size.y);
		ctx.strokeRect(this.position.x*size.x, this.position.y*size.y, size.x, size.y);
	}
}

function Grid(worldSize){
	this.gridWorldSize = worldSize,
	this.nodeSize = new Vector2d((canvas.width/this.gridWorldSize.x), (canvas.height/this.gridWorldSize.y)),
	this.nodes = new Array(10),
	this.initGrid = function(){
		for(x=0; x < this.gridWorldSize.x; x++){
			this.nodes[x] = new Array(10);
			for(y=0; y < this.gridWorldSize.y; y++){
				this.nodes[x][y] = new Node(true, new Vector2d(x,y));
				this.nodes[x][y].draw("white", this.nodeSize);
			}
		}
	}
}

function PathFinding(){
	this.grid = new Grid(new Vector2d(10,10)),
	this.startNode,
	this.targetNode,
	this.openSet = [],
	this.closedSet = [],
	this.InitPath = function(startPosition, targetPosition){
		//set grid
		this.grid.initGrid();

		//set pathfinding
		this.startNode = this.grid.nodes[startPosition.x][startPosition.y];
		this.targetNode = this.grid.nodes[targetPosition.x][targetPosition.y];
		this.openSet.push(this.startNode);
	}
	this.FindPath = function(){
		var currentNode = this.openSet[0];
		for(i=0; i<this.openSet.length; i++){
			if(this.openSet[i].fCost() < currentNode.fCost() || (this.openSet[i].fCost() == currentNode.fCost()) && this.openSet[i].hCost < currentNode.hCost){
				currentNode = openSet[i];
				this.openSet.splice(i,1);
				this.closedSet.push(currentNode);
			}	
		}
	}
}

var PathFinder = new PathFinding();
PathFinder.InitPath(new Vector2d(0,0), new Vector2d(9,9));


//Progress interval to see
var ViewLoop = setInterval(function(){
	if(PathFinder.openSet.length == 0){
		console.log("no solution possible...");
		clearInterval(ViewLoop);
	}
	else{
		PathFinder.FindPath();
	}
}, 100);



