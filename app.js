var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Node(walkable, nodePosition){
	this.isWalkable = walkable,
	this.position = nodePosition,
	this.parentNode,
	this.gCost = 0,
	this.hCost = 0,
	this.fCost = function(){
		return this.gCost + this.hCost;
	},
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
		this.targetNode = this.grid.nodes[targetPosition.x][targetPosition.y];
		this.startNode = this.grid.nodes[startPosition.x][startPosition.y];
		this.startNode.hCost = this.getDistance(this.startNode, this.targetNode);
		this.startNode.gCost = 14;
		this.openSet.push(this.startNode);
		
		//color the end line
		this.targetNode.draw("blue", this.grid.nodeSize);
	},
	this.getDistance = function(nodeA, nodeB){ //heuristic
		var distX = Math.abs(nodeA.position.x - nodeB.position.x);
		var distY = Math.abs(nodeA.position.y - nodeB.position.y);

		if(distX > distY){
			return 14*distY + 10*(distX-distY);
		}
		else{
			return 14*distX + 10*(distY-distX);
		}
		
	},

	this.getNeighbours = function(parentNode){
		var neighbours = [];
		for(x=parentNode.position.x-1; x<=parentNode.position.x+1; x++){
			for(y=parentNode.position.y-1; y<=parentNode.position.y+1; y++){
				if((x != 0 || y != 0)){
					var neighboursPosition = new Vector2d(x,y);
					if(neighboursPosition.x >= 0 && neighboursPosition.x < this.grid.gridWorldSize.x && neighboursPosition.y >= 0 && neighboursPosition.y < this.grid.gridWorldSize.y){
						if(this.closedSet.indexOf(this.grid.nodes[x][y])==-1 && this.grid.nodes[x][y].isWalkable){
							neighbours.push(this.grid.nodes[x][y]);
						}
					}
				}
			}
		}
		return neighbours;
	},
	this.FindPath = function(){
		var currentNode = this.openSet[0];
		currentNode.draw("green", this.grid.nodeSize);
		for(i=0; i<this.openSet.length; i++){
			//fucken ugly but well....
			
			var neighbours = this.getNeighbours(currentNode);
			neighbours.forEach(function(neighbourNode){
				var newMovementCostToNeighbour = currentNode.gCost + PathFinder.getDistance(currentNode, neighbourNode);
				if(newMovementCostToNeighbour < neighbourNode.gCost || PathFinder.openSet.indexOf(neighbourNode) == -1){
					neighbourNode.gCost = newMovementCostToNeighbour;
					neighbourNode.hCost = PathFinder.getDistance(neighbourNode, PathFinder.targetNode);
					neighbourNode.parentNode = currentNode;
					PathFinder.openSet.push(neighbourNode);
				}
			});



			if(this.openSet[i].fCost() < currentNode.fCost() || (this.openSet[i].fCost() == currentNode.fCost()) && this.openSet[i].hCost < currentNode.hCost){
				currentNode = this.openSet[i];
				this.openSet.splice(i,1);
				this.closedSet.push(currentNode);
				currentNode.draw("red", this.grid.nodeSize);
				
				if(currentNode.position == targetNode.position){
					console.log("The solution has been found!");
					this.retracePath();
					clearInterval(ViewLoop);
				}				
			}	
		}
	},
	this.retracePath = function(){
		var path = [];
		var currentNode

		while(currentNode != this.startNode){
			path.push(currentNode);
			currentNode.draw("black", this.grid.gridWorldSize);
			currentNode = currentNode.parentNode;
		}
		return path;
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



