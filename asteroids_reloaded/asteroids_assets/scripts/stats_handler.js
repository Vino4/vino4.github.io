// font from google's servers
WebFontConfig = {
	google : {
		families : ['Revalia::latin']
	}
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})(); 


// Stat Canvas Creation
statCanvas = document.createElement('canvas');
statCanvas.width = statCanvasWidth;
statCanvas.height = statCanvasHeight;
statCanvas.style = statCanvasStyle;
statCanvas.innerHTML = noCanvasSupportMSG;
statCtx = statCanvas.getContext('2d');

// adding canvas to page
statCanvasHolderDiv = document.createElement('div');
statCanvasHolderDiv.appendChild(statCanvas);
holderTag.insertBefore(statCanvasHolderDiv, canvasHolderDiv);

// stats canvas stats text
function updateStatsText(x, y, input, font, color, align){
	if (font == null){
		statCtx.font = defaultStatsFont;
	} else {
		statCtx.font = font;
	}

	if (color == null){
		statCtx.fillStyle = defaultStatsColor;
	} else {
		statCtx.fillStyle = color;
	}
	
	if (align == null){
		statCtx.textAlign = defaultStatsAlign;
	} else {
		statCtx.textAlign = align;
	}
	
	statCtx.fillText(input, x, y);
}

// same as before but works on main canvas
function updateStatsText2(x, y, input, font, color, align){

	if (font == null){
		ctx.font = defaultStatsFont;
	} else {
		ctx.font = font;
	}

	if (color == null){
		ctx.fillStyle = defaultStatsColor;
	} else {
		ctx.fillStyle = color;
	}
	
	if (align == null){
		ctx.textAlign = defaultStatsAlign;
	} else {
		ctx.textAlign = align;
	}
	
	ctx.fillText(input, x, y);
}

function getRandomColor() {
    var possible = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += possible[Math.round(Math.random() * 15)];
    }
    return color;
}

function showGameOverStats(){
	if (gameTime % 30 == 0){
		if (congratsMsgOrder > 7){
			congratsMsgOrder = 1;
		} else {
			congratsMsgOrder++;
		}
	}
	clearStatsText();
	if (newHighScore){
		if (congratsMsgOrder == 1){
			updateStatsText(statCanvas.width /2, statCanvas.height / 2 + 10, "New High Score!", "35px 'Revalia'", getRandomColor(), 'center');
		}
		if (congratsMsgOrder == 3){
			updateStatsText(statCanvas.width /2, statCanvas.height / 2 + 10, "New High Score, Congratulations!", "35px 'Revalia'", getRandomColor(), 'center');
		}
		if (congratsMsgOrder == 5){
			updateStatsText(statCanvas.width /2, statCanvas.height / 2 + 10, "Congratulations, New High Score!", "35px 'Revalia'", getRandomColor(), 'center');
		}
		if (congratsMsgOrder == 7){
			updateStatsText(statCanvas.width /2, statCanvas.height / 2 + 10, "Congratulations!", "35px 'Revalia'", getRandomColor(), 'center');
		}
	} else {
		updateStatsText(statCanvas.width / 2, statCanvas.height / 2 + 5, "Game Over..", null, 'green', 'center');
	}
	
}
function clearStatsText(){
	statCanvas.width = statCanvas.width;
	statCtx.fillStyle = 'black';
	statCtx.fillRect(0, 0, statCanvas.width, statCanvas.height);
}

function showPausedStats(){
	clearStatsText();
	updateStatsText(statCanvas.width / 2, statCanvas.height / 2 + 5, "Game is paused..", null, 'green', 'center');
}

function showGameStats(){
	clearStatsText();
	updateStatsText(10, statCanvas.height / 2 + 5, "SCORE: " + parseInt(score), null, 'green', 'left');
	updateStatsText(200, statCanvas.height / 2 + 5, "Energy: ", null, 'green', 'left');
	statCtx.strokeStyle = 'white';
	statCtx.strokeRect(299, 5, shieldMaxEnergy / 20, statCanvas.height - 10);
	statCtx.fillStyle = 'green';
	statCtx.fillRect(300, 6, shieldEnergy / 20, statCanvas.height - 12);
    updateStatsText(400, statCanvas.height / 2 + 5, parseInt(Math.round(shieldEnergy / shieldMaxEnergy* 100)) +"%", null, 'white', 'left');
    updateStatsText(570, statCanvas.height / 2 + 5, "Shields: ", null, 'green', 'left');
	for (var i = 0; i < emergencyShields; i++){
        updateStatsText(670 + (i*20), statCanvas.height / 2 + 5, " \u2666 ", null, 'lightblue', 'left');
	}
	

    statCtx.strokeStyle = 'white';
    statCtx.strokeRect(760, 5, 126, statCanvas.height - 10);
    statCtx.fillStyle = 'green';
    statCtx.fillRect(761, 6, asteroidsReloaded_musicSnd.volume * 125, statCanvas.height - 12);
	updateStatsText(765, statCanvas.height / 2 + 5, "Music: " + parseInt(Math.round(asteroidsReloaded_musicSnd.volume * 100)) +"%", "15px 'Revalia', cursive", 'white', 'left');
    statCtx.strokeStyle = 'white';
	statCtx.strokeRect(915, 5, 126, statCanvas.height - 10);
    statCtx.fillStyle = 'green';
    statCtx.fillRect(916, 6, asteroidsReloaded_forcefieldSnd.volume * 125, statCanvas.height - 12);
	updateStatsText(935, statCanvas.height / 2 + 5, "SFX: " + parseInt(Math.round(asteroidsReloaded_forcefieldSnd.volume * 100)) +"%", "15px 'Revalia', cursive", 'white', 'left');
	if (asteroidsReloaded_soundOn){
	updateStatsText(canvas.width - 10, statCanvas.height / 2 + 5, "Sound: On", null, 'green', 'right');
	} else {
	updateStatsText(canvas.width - 10, statCanvas.height / 2 + 5, "Sound: Off", null, 'green', 'right');
	}
}

function updateScore(){
	if (score > asteroidsReloaded_highScore){
		asteroidsReloaded_highScore = score;
		newHighScore = true;
		save("asteroidsReloaded_highScore");
	}
	updatedScore = true;
}

// declare loaded when done
updateStatsText(statCanvas.width / 2, statCanvas.height / 2 + 5, "Waiting for game to start..", null, 'green', 'center');
updateLoadingText("stats handler loaded..");
updateLoadingText("stats canvas loaded..");
loadNextScript();