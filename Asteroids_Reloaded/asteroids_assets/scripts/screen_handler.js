// intro handeling
function showIntroSc(){
	ctx.drawImage(introImg, 0, 0, canvas.width, canvas.height);
	if (gameStarting){
		gameOn = true;
	}
}
// break handeling
function showPauseSc(){
	ctx.drawImage(pauseImg, 0, 0, canvas.width, canvas.height);
}
// loss handeling
function showGameOverSc(){
	thrusting = false;
	turningRight = false;
	turningLeft = false;
	shooting = false;
	shielding = false;
	emergencyShielding = false;
	playSounds();
	clearCanvas();
	asteroidSpeed = 2;
	handleAsteroids();
	shipSpeedDecoyRate = 0;
	maxShipSpeed = 2;
	playerShip.force = 2;
	handleShip();
	handleExplosions();
	ctx.beginPath();
	var frame=ctx.createLinearGradient(canvas.width / 4, canvas.height / 4, canvas.width - canvas.width / 2, canvas.height - canvas.height / 2);
	frame.addColorStop("0","red");
	frame.addColorStop("0.5","white");
	frame.addColorStop("1.0","red");
	ctx.lineWidth = 5;
	ctx.strokeStyle = frame;
	ctx.strokeRect(canvas.width / 4, canvas.height / 4, canvas.width - canvas.width / 2, canvas.height - canvas.height / 2);
	ctx.fillStyle = 'rgba(0,0,0,0.5)';
	ctx.fillRect(canvas.width / 4, canvas.height / 4, canvas.width - canvas.width / 2, canvas.height - canvas.height / 2);
	ctx.stroke();
	updateStatsText2(canvas.width / 2, canvas.height / 3, "YOU HAVE BEEN DESTROYED", null, "red", 'center');
	if (newHighScore){
		updateStatsText2(canvas.width / 2, canvas.height / 3 + 50, "Congratulations!", "40px 'Revalia', cursive", 'green', 'center');
		updateStatsText2(canvas.width / 2, canvas.height / 3 + 100, "New High Score:", "40px 'Revalia', cursive", getRandomColor(), 'center');
		updateStatsText2(canvas.width / 2, canvas.height / 3 + 150, parseInt(asteroidsReloaded_highScore), "40px 'Revalia', cursive", getRandomColor(), 'center');
	} else {
		updateStatsText2(canvas.width / 2.7, canvas.height / 3 + 50, "Score: ", "40px 'Revalia', cursive", 'lightblue', 'left');
		updateStatsText2(canvas.width / 1.9, canvas.height / 3 + 50, parseInt(score), "40px 'Revalia', cursive", 'lightblue', 'left');
		updateStatsText2(canvas.width / 2, canvas.height / 3 + 100, "High Score:", "40px 'Revalia', cursive", 'gold', 'center');
		updateStatsText2(canvas.width / 2, canvas.height / 3 + 150, parseInt(asteroidsReloaded_highScore), "40px 'Revalia', cursive", 'gold', 'center');
	}
	ctx.drawImage(restartImg, canvas.width / 2.7, canvas.height / 3 + 180);
	if (gameStarting && playerDead){
		restart();
	}
	gameTime++;
	showDebugMode();
}
// declare loaded when done
updateLoadingText("main interface handler loaded..");
loadNextScript();