// inizialize player ship
playerShip = new Ship(canvas.width /2, canvas.height /2, 0, 0, 270);

// main game loop
playSounds();		 	   // at this point game is ready, play music, from sounds_handler.js
setInterval(function() {
	if (gameOn){
		if(!gamePaused && !playerDead){
			clearCanvas();     // from canvas_handler.js
			playerShip.move(); // from ship_handler.js
			playSounds();	   // from sounds_handler.js
			playerShip.draw(); // from ship_handler.js
			handleBullets();   // from bullet_handler.js
			handleAsteroids(); // from asteroids_handler.js
			handleExplosions();// from explosion_handler.js
			showGameStats();   // from stat_handler.js
			showDebugMode();   // press (.) "period" to activate, shows some variables in real-time, from canvas_handler.js
			gameTime++;		   // increase game loop counter
		} else if (gamePaused && !playerDead){
			showPauseSc(); 	   // from screen_handler.js
			showPausedStats(); // from stat_handler.js
		} else if (playerDead){
			showGameOverSc();  // from screen_handler.js
			showGameOverStats();// from stat_handler.js
		}
	} else {
		showIntroSc();		   // from screen_handler.js
	}

}, frameRate);

// reloading the game function
function restart(){
	location.reload(false);
}