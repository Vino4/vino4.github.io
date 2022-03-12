// event listers for keys
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
window.addEventListener("keypress", keysPressed, false);

// handle key down
function keysPressed(e) {
	// store an entry for every key pressed
	keys[e.keyCode] = true;
	// handle keys that are pressed
	handleKeys();
	// prevent default browser behavior
	e.preventDefault();
}

// handle key up
function keysReleased(e) {
	// mark keys that were released
	keys[e.keyCode] = false;
	// turn of key functions
	thrusting = false;
	turningRight = false;
	turningLeft = false;
	shooting = false;
	if (!keys[40]) {
	shielding = false;
	}
	gameStarting = false;
	// handle keys that are still pressed
	handleKeys();
	// prevent default browser behavior
	e.preventDefault();
}

function handleKeys(){
	// handle up arrow key
	if (keys[38] && (!playerDead)) {
		thrusting = true;
	}
	// handle left arrow key
	if (keys[37] && (!playerDead)) {
		turningLeft = true;
	}
	// handle right arrow key
	if (keys[39] && (!playerDead)) {
		turningRight = true;
	}
	// handle down arrow key
	if (keys[40] && (!playerDead)) {
		if (!shielding){
			if (shieldEnergy > shieldJumpstartEnergy){
				shieldEnergy -= shieldJumpstartEnergy;
				shielding = true;
			}
		}
	}
	// the period (.) key -for debugging-
	if (keys[190]){
		if (asteroidsReloaded_debugMode){
			asteroidsReloaded_debugMode = false;
		} else {
			asteroidsReloaded_debugMode = true;
		}
		save("asteroidsReloaded_debugMode");
	}
	// the (M) key -mute music-
	if (keys[77]){
		if (asteroidsReloaded_soundOn){
			asteroidsReloaded_soundOn = false;
		} else {
			asteroidsReloaded_soundOn = true;
		}
		save("asteroidsReloaded_soundOn");
	}
	// the (I) key -increas music volume-
	if (keys[73]){
		increaseMusicVolume();
	}
	// the (U) key -decrease music volume-
	if (keys[85]){
		decreaseMusicVolume();
	}
	// the (K) key -increas music volume-
	if (keys[75]){
		increaseSfxVolume();
	}
	// the (J) key -decrease music volume-
	if (keys[74]){
		decreaseSfxVolume();
	}
	// the (P) key -pause the game-
	if (keys[80] && (!playerDead)){
		if (gamePaused){
			gamePaused = false;
		} else {
			gamePaused = true;
		}
	}
	// the space key -shoot bullets-
	if (keys[32] && (!playerDead) && (!shielding)){
		shooting = true;
	}	
	// the enter key -starting the game-
	if (keys[13]){
		gameStarting = true;
	}
}

// declare all functions loaded then start the game.
updateLoadingText("key handler loaded..");
updateLoadingText("all game functions loaded..");
updateLoadingText("Running..");
loadNextScript();

