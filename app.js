var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function Node(walkable, nodePosition){
	this.isWalkable = walkable,
	this.position = nodePosition
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

//declare the grid
var grid = new Grid(new Vector2d(10,10));

//init the grid
grid.initGrid();
