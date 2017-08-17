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
	},
	this.setWalls = function(walls){
		walls.forEach(function(wall){
			PathFinder.grid.nodes[wall.x][wall.y].isWalkable = false;
			PathFinder.grid.nodes[wall.x][wall.y].draw("gray", PathFinder.grid.nodeSize);
		});
	}

}

function PathFinding(walls){
	this.grid = new Grid(new Vector2d(10,10)),
	this.startNode,
	this.targetNode,
	this.currentNode,
	this.openSet = [],
	this.closedSet = [],
	this.InitPath = function(startPosition, targetPosition){
		//set grid
		this.grid.initGrid();
		this.grid.setWalls(walls);

		//set pathfinding
		this.targetNode = this.grid.nodes[targetPosition.x][targetPosition.y];
		this.startNode = this.grid.nodes[startPosition.x][startPosition.y];
		this.startNode.hCost = this.getDistance(this.startNode, this.targetNode);
		this.startNode.gCost = 14;
		this.currentNode = this.startNode;
		this.openSet.push(this.startNode);
		
		//color the end line
		this.targetNode.draw("blue", this.grid.nodeSize);
		this.startNode.draw("orange", this.grid.nodeSize);
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
		for(i=0; i<this.openSet.length; i++){
			var neighbours = this.getNeighbours(this.currentNode);
			neighbours.forEach(function(neighbourNode){
				var newMovementCostToNeighbour = PathFinder.currentNode.gCost + PathFinder.getDistance(PathFinder.currentNode, neighbourNode);
				if(newMovementCostToNeighbour < neighbourNode.gCost || PathFinder.openSet.indexOf(neighbourNode) == -1){
					neighbourNode.gCost = newMovementCostToNeighbour;
					neighbourNode.hCost = PathFinder.getDistance(neighbourNode, PathFinder.targetNode);
					neighbourNode.parentNode = PathFinder.currentNode;
					neighbourNode.draw("green", PathFinder.grid.nodeSize);
					PathFinder.openSet.push(neighbourNode);
				}
			});



			if(this.openSet[i].fCost() < this.currentNode.fCost() || (this.openSet[i].fCost() == this.currentNode.fCost()) && this.openSet[i].hCost < this.currentNode.hCost){
				this.currentNode = this.openSet[i];
				this.currentNode.draw("red", this.grid.nodeSize);
				this.openSet.splice(i,1);
				this.closedSet.push(this.currentNode);
				this.currentNode.draw("red", this.grid.nodeSize);
				
				if(this.currentNode.position == this.targetNode.position){
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




