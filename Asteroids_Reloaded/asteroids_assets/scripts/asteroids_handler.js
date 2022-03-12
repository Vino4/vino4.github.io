// asteroid class constructer
function Asteroid(newSpawn, x, y, angel, size) {
	if (newSpawn){
		var randomSpawningLocation = Math.floor(Math.random() * 4) + 1;
		switch(randomSpawningLocation) {
			case 1:
				this.x = 0;
				this.y = Math.floor(Math.random() * canvas.height) + 1;
				var angel = Math.floor(Math.random() * 2) + 1;
				switch(angel){
					case 1:
						angel = 360 - Math.floor(Math.random() * asteroidAngelRange) + 1;
						break;
					case 2:
						angel = Math.floor(Math.random() * asteroidAngelRange) + 1;
						break;
				}
				this.driftingAngel = angel;
				break;
			case 2:
				this.x = canvas.width;
				this.y = Math.floor(Math.random() * canvas.height) + 1;
				var angel = Math.floor(Math.random() * 2) + 1;
				switch(angel){
					case 1:
						angel = 180 - Math.floor(Math.random() * asteroidAngelRange) + 1;
						break;
					case 2:
						angel = 180 + Math.floor(Math.random() * asteroidAngelRange) + 1;
						break;
				}
				this.driftingAngel = angel;
				break;
			case 3:
				this.x = Math.floor(Math.random() * canvas.width) + 1;
				this.y = 0;
				var angel = Math.floor(Math.random() * 2) + 1;
				switch(angel){
					case 1:
						angel = 270 - Math.floor(Math.random() * asteroidAngelRange) + 1;
						break;
					case 2:
						angel = 270 + Math.floor(Math.random() * asteroidAngelRange) + 1;
						break;
				}
				this.driftingAngel = angel;
				break;
			case 4:
				this.x = Math.floor(Math.random() * canvas.width) + 1;
				this.y = canvas.height;
				var angel = Math.floor(Math.random() * 2) + 1;
				switch(angel){
					case 1:
						angel = 90 - Math.floor(Math.random() * asteroidAngelRange) + 1;
						break;
					case 2:
						angel = 90 + Math.floor(Math.random() * asteroidAngelRange) + 1;
						break;
				}
				this.driftingAngel = angel;
				break;
		}
		this.size = 3;
		this.speed = asteroidSpeed / this.size;
		this.dx = 0;
		this.dy = 0;
		this.width = asteroidWidth * this.size;
		this.height = asteroidHeight * this.size;
		
		// bounding box attribtues
		this.x1, this.y1, this.x2, this.y2;
	} else {
		this.x = x;
		this.y = y;
		this.driftingAngel = angel;
		this.size = size;
		this.speed = asteroidSpeed / this.size;
		this.dx = 0;
		this.dy = 0;
		this.width = asteroidWidth * this.size;
		this.height = asteroidHeight * this.size;
		
		// bounding box attribtues
		this.x1, this.y1, this.x2, this.y2;
	}

	this.type = "asteroid";
}

// handle asteroid movement
Asteroid.prototype.move = function() {
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
	// update asteroid's bounding box
	updateAsteroidBounds(this);

};

// respawn same asteroid in a different location, with a different drifting angel
Asteroid.prototype.respawn = function() {
	this.x = Math.floor(Math.random() * canvas.width) + 1;;
	this.y = Math.floor(Math.random() * canvas.height) + 1;;
	this.driftingAngel = Math.floor(Math.random() * 361);
};

Asteroid.prototype.draw = function() {
		//Convert degrees to radian
		var rad = this.driftingAngel * Math.PI / 180;
		//save canvas origin and rotation
		ctx.save();
		//Set the origin to the center of the image
		ctx.translate(this.x, this.y);

		//Rotate the canvas around the origin
		ctx.rotate(rad);

		//draw the image
		ctx.drawImage(asteroidImg, asteroidImg.width * this.size / 2 * (-1), asteroidImg.height * this.size / 2 * (-1), asteroidImg.width * this.size, asteroidImg.height * this.size);
		//reset the canvas
		ctx.restore();
		if (asteroidsReloaded_debugMode){
		drawBounds(this);
		}
};

// get rid of the asteroid
Asteroid.prototype.kill = function(killer) {
	var asteroidIndex = asteroidsHolder.indexOf(this);
	if (asteroidIndex > -1) {
		asteroidsHolder.splice(asteroidIndex, 1);
	}
	if (killer.type == "bullet"){
		this.getPoints(pointsPerAstroid);
	}
	if (shieldEnergy < shieldMaxEnergy){
		shieldEnergy += energyPerAsteroid;
	}
	var firstDriftingAngel = this.driftingAngel;
	firstDriftingAngel += 180;
	if (firstDriftingAngel > 360){
		firstDriftingAngel -= 360;
	}
};

function splitAsteroid(asteroid, splitter){
	if (asteroid.size > 1){
		var newSize = asteroid.size - 1;
		
		var firstHalf = new Asteroid(false, asteroid.x, asteroid.y, splitter.driftingAngel + 30, newSize);
		asteroidsHolder.push(firstHalf);
		
		var secondHalf = new Asteroid(false, asteroid.x, asteroid.y, splitter.driftingAngel - 30, newSize);
		asteroidsHolder.push(secondHalf);
	}
}

// auto spawn a ground of asteroids
function spawnAsteroids(){
	if (asteroidsHolder.length == 0 && !alreadySpawned){
		alreadySpawned = true;
		setTimeout(function(){
			for(i = 0; i < numberOfAsteroidsEachSpawn; i++){
				var spawnedAstroid = new Asteroid(true);
				asteroidsHolder.push(spawnedAstroid);
			}
			asteroidWave++;
			renewShields();
			updateAsteroidSpawnRate();
			alreadySpawned = false;
		}, asteroidSpawnCooldown);
	}
}

function updateAsteroidSpawnRate(){
	if (numberOfAsteroidsEachSpawn < maxAsteroidSpawnRate) {
		if(randomizeSpawnRate){
			increaseSpawnsEvery = Math.floor(Math.random() * randomizeRange) + 1;
		}
		if (asteroidWave % increaseSpawnsEvery == 0){
			numberOfAsteroidsEachSpawn += increaseSpawnsBy;
		}
	}
}

function shipCrossedBounds(){
	for (astroid in asteroidsHolder) {
		asteroidsHolder[astroid].respawn();
	}
	updateCanvasBg();
}

// add points when astroid is destroyed
Asteroid.prototype.getPoints = function(amount){
	if (sizeMatters){
		amount /= this.size;
	}
	if (!playerDead){
		score += amount;
	}
};

// proccess all asteroids with each game loop
function handleAsteroids() {
	spawnAsteroids();
	
	for (astroid in asteroidsHolder) {
		asteroidsHolder[astroid].move();
		asteroidsHolder[astroid].draw();
		detectCollision(asteroidsHolder[astroid], playerShip);
		for (bullet in bulletsHolder) {
			detectCollision(asteroidsHolder[astroid], bulletsHolder[bullet]);
		}
	}
}

// load next script
updateLoadingText("asteroids handler loaded..");
loadNextScript();
