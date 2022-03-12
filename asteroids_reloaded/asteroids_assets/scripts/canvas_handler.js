// Game Canvas Creation
canvas = document.createElement('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
canvas.style = canvasStyle;
canvas.innerHTML = noCanvasSupportMSG;
ctx = canvas.getContext('2d');

// adding canvas to page
canvasHolderDiv = document.createElement('div');
canvasHolderDiv.appendChild(canvas);
holderTag.appendChild(canvasHolderDiv);

function updateCanvasBg(){
	currBgImg = bgArray[Math.floor(Math.random() * bgArray.length)];
}
// clear canvas by drawing background
function clearCanvas(){
	canvas.width = canvas.width; // changing canvas.width resets canvas faster than clearRect();
//	bgClipModifierPosX1 = (currBgImg.width / canvas.width) * playerShip.x - bgZoom;
//	bgClipModifierPosY1 = (currBgImg.width / canvas.width) * playerShip.y - bgZoom;
//	bgClipModifierPosX2 = (currBgImg.width / canvas.width) * playerShip.x + bgZoom;
//	bgClipModifierPosY2 = (currBgImg.width / canvas.width) * playerShip.y + bgZoom;

	ctx.drawImage(currBgImg, 0, 0, currBgImg.width, currBgImg.height, 0, 0, canvas.width, canvas.height);
}

// loading text functions
function clearLoadingScreen(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function updateLoadingText(text, font, color, align){
	if (font == null){
		ctx.font = defaultLoadingFont;
	} else {
		ctx.font = font;
	}

	if (color == null){
		ctx.fillStyle = defaultLoadingColor;
	} else {
		ctx.fillStyle = color;
	}
	
	if (align == null){
		ctx.textAlign = defaultLoadingAlign;
	} else {
		ctx.textAlign = align;
	}
	
	ctx.fillText(text, canvas.width / 2 - 50, canvas.height / 2 + loadingTextPos);

	loadingTextPos += loadingTextSpaceModifier;
}

function updateDebugStat(text, value, font, color, align){
	if (font == null){
		ctx.font = defaultDebugFont;
	} else {
		ctx.font = font;
	}

	if (color == null){
		ctx.fillStyle = defaultDebugColor;
	} else {
		ctx.fillStyle = color;
	}
	
	if (align == null){
		ctx.textAlign = defaultDebugAlign;
	} else {
		ctx.textAlign = align;
	}
	
	ctx.fillText(text + ": " + value, debugTextPosX, debugTextPosY);
	
	debugTextPosY += debugTextSpaceModifier;
}

function showDebugMode(){
	// show some game stats stats (for debugging):
	if (asteroidsReloaded_debugMode){
		debugTextPosY = debugTextPosYDefault;
		updateDebugStat("facing angel", playerShip.facingAngel);
		updateDebugStat("drifting angel", playerShip.driftingAngel);
		updateDebugStat("force", playerShip.force);
		updateDebugStat("trusting", thrusting);
		updateDebugStat("thrust sound1 time:", asteroidsReloaded_thrustSnd.currentTime);
		updateDebugStat("thrust sound2 time:", asteroidsReloaded_thrustSnd2.currentTime);
		updateDebugStat("X Pos", playerShip.x);
		updateDebugStat("Y Pos", playerShip.y);
		updateDebugStat("clip x1", bgClipModifierPosX1);
		updateDebugStat("clip y1", bgClipModifierPosY1);
		updateDebugStat("clip x2", bgClipModifierPosX2);
		updateDebugStat("clip y2", bgClipModifierPosY2);
		updateDebugStat("sound", asteroidsReloaded_soundOn);
		updateDebugStat("music volume", asteroidsReloaded_musicSnd.volume);
		updateDebugStat("SFX volume", asteroidsReloaded_forcefieldSnd.volume);
		updateDebugStat("game time", gameTime);
		updateDebugStat("spawn rate", numberOfAsteroidsEachSpawn);
		updateDebugStat("X1", playerShip.x1);
		updateDebugStat("X2", playerShip.y1);
		updateDebugStat("Y1", playerShip.x2);
		updateDebugStat("Y2", playerShip.y2);
		updateDebugStat("Shielding", shielding);
		updateDebugStat("Emergency Shielding", emergencyShielding);
		updateDebugStat("congratsMsgOrder", congratsMsgOrder);
		updateDebugStat("increaseSpawnsEvery", increaseSpawnsEvery);
		updateDebugStat("Asteroids on next wave", numberOfAsteroidsEachSpawn);
		updateDebugStat("emergencyShields", emergencyShields);
		
	}
}

// declare loaded when done
updateLoadingText("initialized..");
updateLoadingText("canvas handler loaded..");
updateLoadingText("canvas loaded..");
loadNextScript();
