updateLoadingText("sound handler loaded ..");
//load the sounds in order, then declare sounds loaded
asteroidsReloaded_musicSnd.addEventListener('loadeddata', function() { 
	asteroidsReloaded_thrustSnd.addEventListener('loadeddata', function() { 
		asteroidsReloaded_fireSnd.addEventListener('loadeddata', function() { 
			asteroidsReloaded_explosionSnd.addEventListener('loadeddata', function() { 
				asteroidsReloaded_forcefieldSnd.addEventListener('loadeddata', function() { 
					asteroidsReloaded_harshForcefieldSnd.addEventListener('loadeddata', function() { 
						updateLoadingText("all sounds loaded ..");
						loadNextScript();
					}, false);
					asteroidsReloaded_harshForcefieldSnd.src = harshForcefieldSrc;
				}, false);
				asteroidsReloaded_forcefieldSnd.src = forcefieldSrc;
			}, false);
			asteroidsReloaded_explosionSnd.src = explosionSrc;
		}, false);
		asteroidsReloaded_thrustSnd2.src = thrustSrc;
		asteroidsReloaded_fireSnd.src = fireSrc;
	}, false);
	asteroidsReloaded_thrustSnd.src = thrustSrc;
}, false);
asteroidsReloaded_musicSnd.src = musicSrc;

// sound functions
function playSounds(){
	if (asteroidsReloaded_soundOn) {
		//	thrust sound handler
		if (shielding){
			if (asteroidsReloaded_forcefieldSnd.paused){
				asteroidsReloaded_forcefieldSnd.currentTime = 0;
				asteroidsReloaded_forcefieldSnd.play();
			}
		} else {
			asteroidsReloaded_forcefieldSnd.pause();
			asteroidsReloaded_forcefieldSnd.currentTime = 0;
		}
		if (emergencyShielding){
			if (asteroidsReloaded_harshForcefieldSnd.paused){
				asteroidsReloaded_harshForcefieldSnd.currentTime = 0;
				asteroidsReloaded_harshForcefieldSnd.play();
			}
		} else {
			asteroidsReloaded_harshForcefieldSnd.pause();
			asteroidsReloaded_harshForcefieldSnd.currentTime = 0;
		}
		if (thrusting) {
			if (asteroidsReloaded_thrustSnd.paused && asteroidsReloaded_thrustSnd2.paused){
				asteroidsReloaded_thrustSnd.play();
			}
			if (asteroidsReloaded_thrustSnd.currentTime > asteroidsReloaded_thrustSndLoopPoint){
				asteroidsReloaded_thrustSnd2.play();
				if (asteroidsReloaded_thrustSnd.currentTime > asteroidsReloaded_thrustSndLoopPoint + overlapBreaker){
					asteroidsReloaded_thrustSnd.pause();
					asteroidsReloaded_thrustSnd.currentTime = 0;
				}
			}
			if (asteroidsReloaded_thrustSnd2.currentTime > asteroidsReloaded_thrustSndLoopPoint){
				asteroidsReloaded_thrustSnd.play();
				if (asteroidsReloaded_thrustSnd.currentTime > asteroidsReloaded_thrustSndLoopPoint + overlapBreaker){
					asteroidsReloaded_thrustSnd2.pause();
					asteroidsReloaded_thrustSnd2.currentTime = 0;
				}
			}
		} else {
			asteroidsReloaded_thrustSnd.pause();
			asteroidsReloaded_thrustSnd2.pause();
		}
			if (asteroidsReloaded_musicSnd.paused){
				asteroidsReloaded_musicSnd.currentTime = 0;
				asteroidsReloaded_musicSnd.volume = asteroidsReloaded_musicVolume;
				asteroidsReloaded_musicSnd.play();
		}
	} else {
		asteroidsReloaded_musicSnd.pause();
	}
}

// background music loop
asteroidsReloaded_musicSnd.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

// shooting sound function
function playShootingSound(){
	if (asteroidsReloaded_soundOn) {
		asteroidsReloaded_fireSnd.currentTime = 0;
		asteroidsReloaded_fireSnd.play();
	}
}

// explosion sound function
function playExplosionSound(){
	if (asteroidsReloaded_soundOn) {
		asteroidsReloaded_explosionSnd.currentTime = 0;
		asteroidsReloaded_explosionSnd.play();
	}
}

// music controls
function decreaseMusicVolume(){
	if (asteroidsReloaded_musicSnd.volume > 0){
		asteroidsReloaded_musicSnd.volume = (Math.round((asteroidsReloaded_musicSnd.volume - soundVolumeModifier) * 10) / 10).toFixed(1);
		asteroidsReloaded_musicVolume = asteroidsReloaded_musicSnd.volume;
		save("asteroidsReloaded_musicSnd.volume");
		save("asteroidsReloaded_musicVolume");
	}
}

function increaseMusicVolume(){
	if (asteroidsReloaded_musicSnd.volume < 1){
		asteroidsReloaded_musicSnd.volume = (Math.round((asteroidsReloaded_musicSnd.volume + soundVolumeModifier) * 10) / 10).toFixed(1) ;
		asteroidsReloaded_musicVolume = asteroidsReloaded_musicSnd.volume;
		save("asteroidsReloaded_musicSnd.volume");
		save("asteroidsReloaded_musicVolume");
	}
}

// sfx controls
function decreaseSfxVolume(){
	if (asteroidsReloaded_explosionSnd.volume > 0){
		asteroidsReloaded_explosionSnd.volume = (Math.round((asteroidsReloaded_explosionSnd.volume - soundVolumeModifier) * 10) / 10).toFixed(1);
		save("asteroidsReloaded_explosionSnd.volume");
	}
	if (asteroidsReloaded_fireSnd.volume > 0){
		asteroidsReloaded_fireSnd.volume = (Math.round((asteroidsReloaded_fireSnd.volume - soundVolumeModifier) * 10) / 10).toFixed(1);
		save("asteroidsReloaded_fireSnd.volume");
	}
	if (asteroidsReloaded_thrustSnd.volume > 0){
		asteroidsReloaded_thrustSnd.volume = (Math.round((asteroidsReloaded_thrustSnd.volume - soundVolumeModifier) * 10) / 10).toFixed(1);
		save("asteroidsReloaded_thrustSnd.volume");
	}
	if (asteroidsReloaded_thrustSnd2.volume > 0){
		asteroidsReloaded_thrustSnd2.volume = (Math.round((asteroidsReloaded_thrustSnd2.volume - soundVolumeModifier) * 10) / 10).toFixed(1);
		save("asteroidsReloaded_thrustSnd2.volume");
	}
	if (asteroidsReloaded_forcefieldSnd.volume > 0){
		asteroidsReloaded_forcefieldSnd.volume = (Math.round((asteroidsReloaded_forcefieldSnd.volume - soundVolumeModifier) * 10) / 10).toFixed(1);
		save("asteroidsReloaded_forcefieldSnd.volume");
	}
	if (asteroidsReloaded_harshForcefieldSnd.volume > 0){
		asteroidsReloaded_harshForcefieldSnd.volume = (Math.round((asteroidsReloaded_harshForcefieldSnd.volume - soundVolumeModifier) * 10) / 10).toFixed(1);
		save("asteroidsReloaded_harshForcefieldSnd.volume");
	}
}
function increaseSfxVolume(){
	if (asteroidsReloaded_explosionSnd.volume < 1){
		asteroidsReloaded_explosionSnd.volume = (Math.round((asteroidsReloaded_explosionSnd.volume + soundVolumeModifier) * 10) / 10).toFixed(1) ;
		save("asteroidsReloaded_explosionSnd.volume");
	}
	if (asteroidsReloaded_fireSnd.volume < 1){
		asteroidsReloaded_fireSnd.volume = (Math.round((asteroidsReloaded_fireSnd.volume + soundVolumeModifier) * 10) / 10).toFixed(1) ;
		save("asteroidsReloaded_fireSnd.volume");
	}
	if (asteroidsReloaded_thrustSnd.volume < 1){
		asteroidsReloaded_thrustSnd.volume = (Math.round((asteroidsReloaded_thrustSnd.volume + soundVolumeModifier) * 10) / 10).toFixed(1) ;
		save("asteroidsReloaded_thrustSnd.volume");
	}
	if (asteroidsReloaded_thrustSnd2.volume < 1){
		asteroidsReloaded_thrustSnd2.volume = (Math.round((asteroidsReloaded_thrustSnd2.volume + soundVolumeModifier) * 10) / 10).toFixed(1) ;
		save("asteroidsReloaded_thrustSnd2.volume");
	}
	if (asteroidsReloaded_forcefieldSnd.volume < 1){
		asteroidsReloaded_forcefieldSnd.volume = (Math.round((asteroidsReloaded_forcefieldSnd.volume + soundVolumeModifier) * 10) / 10).toFixed(1) ;
		save("asteroidsReloaded_forcefieldSnd.volume");
	}
	if (asteroidsReloaded_harshForcefieldSnd.volume < 1){
		asteroidsReloaded_harshForcefieldSnd.volume = (Math.round((asteroidsReloaded_harshForcefieldSnd.volume + soundVolumeModifier) * 10) / 10).toFixed(1);
		save("asteroidsReloaded_harshForcefieldSnd.volume");
	}
}