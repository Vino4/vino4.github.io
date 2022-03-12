// bullet class constructer
function Bullet(x, y, deg, id) {
	this.width = bulletWidth;
	this.height = bulletHeight;
	this.x = x + bulletSpawnRadius * Math.cos(deg * Math.PI / 180);
	this.y = y + bulletSpawnRadius * Math.sin(deg * Math.PI / 180);
	this.speed = bulletSpeed;
	this.dx = 0;
	this.dy = 0;
	this.driftingAngel = deg;
	this.id = id;

	// bounding box attribtues
	this.x1, this.y1, this.x2, this.y2;
	this.type = "bullet";

}

// handle bullet movement
Bullet.prototype.move = function() {
	// direction update
	var rad = this.driftingAngel * Math.PI / 180;
	this.dx = Math.cos(rad) * this.speed;
	this.dy = Math.sin(rad) * this.speed;

	// move
	this.x += this.dx;
	this.y += this.dy;
	
	// handle canvas bounds
	if (this.x > canvas.width) {
		this.x = 0;
	} else if (this.x < 0) {
		this.x = canvas.width;
	}

	if (this.y > canvas.height) {
		this.y = 0;
	} else if (this.y < 0) {
		this.y = canvas.height;
	}

	// update bullets's bounding box
	updateBulletBounds(this);

	// speed decoy overtime
	if (this.speed > bulletDeadSpeed) {
		this.speed -= bulletSpeedDecoy;
	}

};

// kill the bullet if it reaches minimum speed
Bullet.prototype.speedKill = function(){
	if (this.speed < bulletDeadSpeed) {
		this.kill();
	}
};

Bullet.prototype.draw = function() {
	ctx.drawImage(bulletImg, this.x, this.y);

};

// get rid of bullet
Bullet.prototype.kill = function(){
	var bulletIndex = bulletsHolder.indexOf(this);
	if (bulletIndex > -1) {
   		bulletsHolder.splice(bulletIndex, 1);
	}
};

// process all bullets with each game loop
function handleBullets(){
	if (shooting && ((gameTime - lastShot) > fireCooldown)){
		playerShip.fire();
		lastShot = gameTime;
	}
	for (bullet in bulletsHolder){	
		bulletsHolder[bullet].move();
		bulletsHolder[bullet].draw();
		bulletsHolder[bullet].speedKill();
	}
}

// load next script
updateLoadingText("bullet handler loaded ..");
loadNextScript();
