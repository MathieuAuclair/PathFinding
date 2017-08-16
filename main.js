var walls = [
	new Vector2d(0,1),
	new Vector2d(1,1),
	new Vector2d(2,1),
	new Vector2d(3,1),
	new Vector2d(4,1),
	new Vector2d(6,1),
	new Vector2d(7,1),
	new Vector2d(8,1),
	new Vector2d(9,1),
	new Vector2d(6,2),
	new Vector2d(6,3),
	new Vector2d(6,4),
	new Vector2d(6,5),
	new Vector2d(6,6),
	new Vector2d(6,7),
	new Vector2d(5,7),
	new Vector2d(4,7),
	new Vector2d(3,7)
];

var PathFinder = new PathFinding(walls);
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
}, 200);
