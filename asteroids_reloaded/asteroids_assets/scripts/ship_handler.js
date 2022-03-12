// Ship class constructer
function Ship(x, y, dx, dy, deg) {
	this.width = shipWidth;
	this.height = shipHeight;
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.facingAngel = deg;
	this.driftingAngel = deg;
	this.force = 0;

	// bounding box attribtues
	this.x1 = 0, this.y1= 0, this.x2= 0, this.y2= 0;
	this.type = "ship";
}

function updateShipImage(){
	if (!playerDead){
		if (thrusting){
			currShipImg = shipImg1;
		} else {
			currShipImg = shipImg0;
		}
	} else {
		currShipImg = crushedShipImg;
	}
}
function updateShieldDrawing(){
	if (shielding){
		if (gameTime % shieldFlashRate == 0){
		  ctx.beginPath();
	      ctx.arc(playerShip.x, playerShip.y, shieldRadius, 0, 2 * Math.PI, false);
	      ctx.lineWidth = shieldThickness;
	      ctx.strokeStyle = shieldColor;
	      ctx.stroke();
		}
	}
	if (emergencyShielding){
		if (gameTime % emergencyShieldFlashRate == 0){
			ctx.beginPath();
	    	ctx.arc(playerShip.x, playerShip.y, emergencyShieldRadius + parseInt(Math.random()*2), 0, 2 * Math.PI, false);
	    	ctx.lineWidth = emergencyShieldThickness;
	   		ctx.strokeStyle = emergencyShieldColor;
	    	ctx.stroke();
		}
	}
}

// Ship drawing method
Ship.prototype.draw = function() {
	updateShipImage();
	// for rotation
	function drawImageRot(img, x, y, width, height, deg) {

		//Convert degrees to radian
		var rad = deg * Math.PI / 180;
		//save canvas origin and rotation
		ctx.save();
		//Set the origin to the center of the image
		ctx.translate(x, y);

		//Rotate the canvas around the origin
		ctx.rotate(rad);

		//draw the image
		ctx.drawImage(img, width / 2 * (-1), height / 2 * (-1), width, height);

		//reset the canvas
		
		ctx.restore();
	}

	drawImageRot(currShipImg, this.x, this.y, shipWidth, shipHeight, this.facingAngel);
	updateShieldDrawing();
	if (asteroidsReloaded_debugMode){
		drawBounds(this);
	}

};

// bounced back effect
Ship.prototype.pushedBackBy = function(obj){
	this.driftingAngel = obj.driftingAngel;
	this.force = 1;
};

// update emergency shield
Ship.prototype.eShieldUpdate = function(){
	if ((gameTime - emergencyShieldingSince) > emergencyShieldingDuration){
		emergencyShielding = false;
	}
};

// use up an emergency shield
Ship.prototype.useEmergencyShield = function(){
	if (emergencyShields > 0){
		emergencyShielding = true;
		emergencyShields--;
		emergencyShieldingSince = gameTime;
	}
};

// called when collision happens
Ship.prototype.kill = function(killer){
	if (!shielding && !emergencyShielding){
		if (emergencyShields > 0){
			this.useEmergencyShield();
		} else {
			playerDead = true;
		}
	}
	this.freezeEngine();
	if (thrusting){
		thrusting = false;
	}
	this.pushedBackBy(killer);
	if (playerDead && !updatedScore){
		updateScore();
	}
};


// Ship thrusting method
Ship.prototype.thrust = function() {
	if (!engineFrozen){
		// get the difference in angels
		var differenceInAngels = 0;
		
		if (this.driftingAngel > this.facingAngel) {
			differenceInAngels = this.driftingAngel - this.facingAngel;
			this.driftingAngel -= differenceInAngels / 2;
		} else {
			differenceInAngels = this.facingAngel - this.driftingAngel;
			this.driftingAngel += differenceInAngels / 2;
		}
		
		// modify the thrusting force, thrusting should be harder based on how far the drifting angel is
		if (this.force > 0) {
		
			if (differenceInAngels > slowAngelCase1) {
				this.force -= differenceInAngels / slowModifierCase1;
			} else if (differenceInAngels > slowAngelCase2) {
				this.force -= differenceInAngels / slowModifierCase2;
			} else if (differenceInAngels > slowAngelCase3) {
				this.force -= differenceInAngels / slowModifierCase3;
			} else if (differenceInAngels > fastAngelCase2) {
				this.force += (this.force * fastModifierCase2);
			} else if (differenceInAngels > fastAngelCase1) {
				this.force += (this.force * fastModifierCase1);
			} else {
				this.force += (this.force * fastestModifier);
			}
		
		} else {
			this.force = 0.1;
		}
	} else {
		thrusting = false;
	}
};

// handle the ship movement method
Ship.prototype.move = function() {
	// case user is shielding, consume energy ship
	if (shielding){
		if (shieldEnergy > 0){
			shieldEnergy -= energyDecoyRate;
		} else {
			shielding = false;
		}
	} else if (shieldEnergy < shieldMaxEnergy){
		shieldEnergy += energyGenerationRate;
	}
	// case user is thrusting, thrust ship
	if (thrusting){
		this.thrust();
	}
	// case user is turning, turn ship
	if (turningLeft){
		this.turnLeft();
	}
	if (turningRight){
		this.turnRight();
	}

	// drifting angel correction
	if (this.driftingAngel > 360){
		this.driftingAngel = 0;
	}

	if (this.driftingAngel < 0){
		this.driftingAngel = 360;
	}

	// direction update
	var rad = this.driftingAngel * Math.PI / 180;
	this.dx = Math.cos(rad) * this.force;
	this.dy = Math.sin(rad) * this.force;

	// move
	this.x += this.dx;
	this.y += this.dy;
	
	// speed decoy overtime
	if (this.force > 0) {
		this.force -= shipSpeedDecoyRate;
	}
	// maximum speed
	if (this.force > maxShipSpeed) {
		this.force = maxShipSpeed;
	}
	
	// handle canvas bounds
	if (this.x > canvas.width) {
		this.x = 1;
		shipCrossedBounds();
	} else if (this.x < -10) {
		this.x = canvas.width - 1;
		shipCrossedBounds();
	}

	if (this.y > canvas.height) {
		this.y = 1;
		shipCrossedBounds();
	} else if (this.y < -10) {
		this.y = canvas.height - 1;
		shipCrossedBounds();
	}
	
	// update ship's bounding box
	updateShipBounds(playerShip);
	// detect collision with asteroids
	//for (astroid in asteroidsHolder) {
	//	detectCollision(this, asteroidsHolder[astroid]);
	//}
	
	if (engineFrozen){
		this.unFreezeEngine();
	}
	
	if (emergencyShielding){
		this.eShieldUpdate();
	}

};

// turning angel currection, make sure it stays between 0 and 360.
Ship.prototype.currectTurnAngel = function(){
	if (this.facingAngel > 360){
		this.facingAngel = 0;
	}
	
	if (this.facingAngel < 0){
		this.facingAngel = 360;
	}
};

// ship turning method, the mord the force is the harder it is to turn
Ship.prototype.turnRight = function() {
		this.facingAngel += (turnSpeedModifier / (this.force + 1));
		this.currectTurnAngel();
};

Ship.prototype.turnLeft = function() {

		this.facingAngel -= (turnSpeedModifier / (this.force + 1));
		this.currectTurnAngel();

};

// ship fire method
Ship.prototype.fire = function() {
	var firedBullet = new Bullet(this.x, this.y, this.facingAngel);
	playShootingSound();
	bulletsHolder.push(firedBullet);
	//bulletIdIndex++;

};

// freeze the engine, used upon impact
Ship.prototype.freezeEngine = function() {
	engineFrozen = true;
	frozenSine = gameTime;

};

// freeze the engine, used upon impact
Ship.prototype.unFreezeEngine = function() {
	if ((gameTime - frozenSine) > freezePeriod){
		engineFrozen = false;
		frozenSine = gameTime;
	}

};

function handleShip(){
	playerShip.move();
	playerShip.draw();
}

function renewShields(){
	if (asteroidWave % renewShieldsEvery == 0){
		emergencyShields = 3;
	}
}
// declare loaded and load next script0
updateLoadingText("ship handler loaded ..");
loadNextScript();
