// explosion class constructer
function Explosion(x, y) {
	this.x = x;
	this.y = y;
	this.power = 1;
	this.type = "explosion";
}

//	draw explosion
Explosion.prototype.draw = function() {
		var explosionRange = (Math.round((1 - this.power) * 10) / 10).toFixed(2); // as the explosion ages, it gets bigger radius
        var explosionBrightness = (Math.round((this.power) * 10) / 10).toFixed(1); // as the explosion ages, it gets less brightness
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30 * explosionRange, 0, 2*Math.PI, true);
        ctx.closePath();
		var boom = ctx.createRadialGradient(this.x, this.y, explosionRange, this.x, this.y, 30 * explosionRange);
        boom.addColorStop(0.0, "rgba(255,255,255," + explosionBrightness + ")");
        boom.addColorStop(0.5, "rgba(255,0,0," + explosionBrightness + ")");
        boom.addColorStop(1.0, "rgba(255,255,0," + explosionBrightness + ")");
        ctx.fillStyle = boom;
        ctx.fill();
        this.power = this.power - explosionPowerDecoyRate;
};

// kill the explosion effect
Explosion.prototype.kill = function() {
	if (this.power <= 0){
		var explosionIndex = explosionHolder.indexOf(this);
		if (explosionIndex > -1) {
			explosionHolder.splice(explosionIndex, 1);
		}
	}
};

// create new explosion at obj current position
function blowUp(obj){
	var createdExplosion = new Explosion(obj.x, obj.y);
	explosionHolder.push(createdExplosion);
	playExplosionSound();
}

// proccess all explosions with each game loop
function handleExplosions() {
	for (explosion in explosionHolder) {
		explosionHolder[explosion].draw();
		explosionHolder[explosion].kill();
	}
}

// load next script
updateLoadingText("explosion handler loaded..");
loadNextScript();
