// declare loading variables
var scripts, script, loadingIndex;
var loadingSpeed = 0;
//will load the next script in "scripts" array.
function loadNextScript() {
	setTimeout(function(){
	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = scripts[loadingIndex];
	document.getElementsByTagName("head")[0].appendChild(script);
	loadingIndex++;},
	loadingSpeed);


}

// jump start the game loading proccess, after page loads.
window.onload = function() {

	scripts = [
	'asteroids_assets/scripts/initializer.js',   	 // declare global game variables.
	'asteroids_assets/scripts/storage_handler.js',   // declare global game variables.
	'asteroids_assets/scripts/canvas_handler.js',    // load canvas and loading text functions..
	'asteroids_assets/scripts/stats_handler.js',	 // load stats board handling functions.
	'asteroids_assets/scripts/browser_handler.js',   // load browser detection and response functions, used to force firefox.
	'asteroids_assets/scripts/image_handler.js',     // load ALL images.
	'asteroids_assets/scripts/sound_handler.js',     // load ALL sounds.
	'asteroids_assets/scripts/screen_handler.js',    // load main interfacing handeling functions.
	'asteroids_assets/scripts/ship_handler.js',      // load ship functions, including: constructer and moving functions.
	'asteroids_assets/scripts/bullets_handler.js',   // load bullet functions, including: constructer and moving functions.
	'asteroids_assets/scripts/asteroids_handler.js', // load asteroids functions, including: constructer and moving functions.
	'asteroids_assets/scripts/collision_handler.js', // load load the collision handler functions.
	'asteroids_assets/scripts/explosion_handler.js', // load load the collision handler functions.
	'asteroids_assets/scripts/key_handler.js',		 // load the key handeling events listeners and functions.
	'asteroids_assets/scripts/main.js'	 			 // main game loop.
	];

	loadingIndex = 0;
	loadNextScript();

};
