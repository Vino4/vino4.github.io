// update ship's bounding boxes
function updateShipBounds(obj){
	obj.x1 = obj.x + obj.width / 2;
	obj.y1 = obj.y + obj.width /2;
	obj.x2 = obj.x - obj.width / 2;
	obj.y2 = obj.y - obj.width / 2;
}

// update bullet's bounding boxes
function updateBulletBounds(obj){
	obj.x1 = obj.x;
	obj.y1 = obj.y;
	obj.x2 = obj.x;
	obj.y2 = obj.y;
}

// update asteroid's bounding boxes
function updateAsteroidBounds(obj){
	obj.x1 = obj.x + (obj.width / 2);
	obj.y1 = obj.y + (obj.width / 2);
	obj.x2 = obj.x - (obj.width / 2);
	obj.y2 = obj.y - (obj.width / 2);
}

// use bullets to draw bounds (for debugging/tweaking only)
function drawBounds(obj){
	if (gameTime % 2){
		ctx.beginPath();
		ctx.strokeStyle = 'green';
		ctx.strokeRect(obj.x1, obj.y1, obj.x2 - obj.x1, obj.y2 - obj.y1);
	}
}

function detectCollision(first, second){
	if (!(first.x1 < second.x2 || second.x1 < first.x2 || first.y1 < second.y2 || second.y1 < first.y2)){
		splitAsteroid(first, second);
		blowUp(second);
		first.kill(second);
		second.kill(first);
	}
}

// declare all functions loaded then load next script.
updateLoadingText("collision handler loaded..");
loadNextScript();

