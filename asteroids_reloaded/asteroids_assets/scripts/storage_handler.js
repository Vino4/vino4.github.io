// check if localStorage is supported:
if(typeof(Storage)!=="undefined"){
  storingLocally = true;
} else {
		console.log("No local storage.");
		console.log("Nothing will be saved.");
}
// storing function
function save(variable){
	if (storingLocally){
		localStorage.setItem(variable, eval(variable));
	}
}
// loading function
function load(variable){
	if (storingLocally){
		var value = localStorage.getItem(variable);
		if(value != undefined && value != null){
			eval(variable + " = " + value);
		}
	}
}

// variable loader, if there is a value stored it'll load it
if (storingLocally){
	load("asteroidsReloaded_debugMode");
	load("asteroidsReloaded_soundOn");
	load("asteroidsReloaded_musicVolume");
	load("asteroidsReloaded_musicSnd.volume");
	load("asteroidsReloaded_highScore");
	load("asteroidsReloaded_thrustSnd.volume");
	load("asteroidsReloaded_thrustSnd2.volume");
	load("asteroidsReloaded_fireSnd.volume");
	load("asteroidsReloaded_explosionSnd.volume");
	load("asteroidsReloaded_forcefieldSnd.volume");
	load("asteroidsReloaded_harshForcefieldSnd.volume");
}
//load next script:
loadNextScript();