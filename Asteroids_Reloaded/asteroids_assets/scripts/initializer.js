// declare or modify all global variables from this file -- made for easier tweaking and clearer code.
// *note: variables stored in local storage has been marked with the prefix "asteroidsReloaded_".

// from loader.js:
loadingSpeed = 50;						 // the time between loading each js file, default 500, you get no problems '0'.
										 // loadingSpeed was used previously to fix a bug, not needed now, bug is fixed.
// from storage_handler.js:
var storingLocally= false;				 // does the browser support local storage?. initialized as: false

// from canvas_handler.js:
var canvas, ctx, canvasHolderDiv; 		 // canvas creation variables.
var canvasWidth = "1200"; 				 // canvas width, defualt: "800".
var canvasHeight = "600";				 // canvas height, defualt: "600".
var canvasStyle = "border:5px solid #ffffff;"; // canvas css style, defualt: "border:5px solid #ffffff;".
var noCanvasSupportMSG = "Your browser does not support HTML5 Canvas."; // the message displayed if browser doesn't support HTML5 canvas.
var loadingTextPos = -200;					 // the starting starting position for loading text, 0 = canvas center.
var loadingTextSpaceModifier = 20;       // the space between updated loading texts in pixels, default 20.
var defaultLoadingFont = '15px Arial'; 	 // standard loading font, default: '15px Arial'.
var defaultLoadingColor = 'gold';		 // standard loading color, default: 'gold'.
var defaultLoadingAlign = 'left';		 // standard loading align, default: 'left'.
var asteroidsReloaded_debugMode = false; 					 // show's some game stats
var debugTextPosX = 10;       		 	 // the starting starting x position for debug text, default 10.
var debugTextPosY = 10;       		 	 // the starting starting y position for debug text, default 10.
var debugTextPosYDefault = debugTextPosY;// the starting starting y position for debug text, used for resetting, default 10.
var debugTextSpaceModifier = 10;         // the space between updated debug texts in pixels, default 10.
var defaultDebugFont = '10px Arial'; 	 // standard debug font, default: '10px Arial'.
var defaultDebugColor = 'white';		 // standard debug color, default: 'white'.
var defaultDebugAlign = 'left';			 // standard debug align, default: 'left'.
var bgClipModifierPosX1, bgClipModifierPosY1, bgClipModifierPosX2, bgClipModifierPosY2;// background clippers
var bgZoom = 200;						 // background zoom in px. default: 200
var holderTag = document.body;			 // where should the game be placed on your page?. default: document.body

//from browser_handler.js:
var forceBrowser= true;				 // force player to use firefox or chrome? default: true
var is_firefox_or_chrome = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) || (navigator.userAgent.toLowerCase().indexOf('chrome') > -1);// hello? are you firefox or chrome?

// from image_handler.js:
var currBgImg;					 								  // current backgroound image reference
var bgArray = [];					 							  // background images array
var bgImg1 = new Image(); 										  // canvas backgroound image 1
var bgSrc1 = "asteroids_assets/images/bgImg/1.jpg";				  // bgImg1 source
var bgImg2 = new Image(); 										  // canvas backgroound image 2
var bgSrc2 = "asteroids_assets/images/bgImg/2.jpg";				  // bgImg2 source
var bgImg3 = new Image(); 										  // canvas backgroound image 3
var bgSrc3 = "asteroids_assets/images/bgImg/3.jpg";				  // bgImg3 source
var bgImg4 = new Image(); 										  // canvas backgroound image 4
var bgSrc4 = "asteroids_assets/images/bgImg/4.jpg";				  // bgImg4 source
var bgImg5 = new Image(); 										  // canvas backgroound image 5
var bgSrc5 = "asteroids_assets/images/bgImg/5.jpg";				  // bgImg5 source
var bgImg6 = new Image(); 										  // canvas backgroound image 6
var bgSrc6 = "asteroids_assets/images/bgImg/6.jpg";				  // bgImg6 source
var bgImg7 = new Image(); 										  // canvas backgroound image 7
var bgSrc7 = "asteroids_assets/images/bgImg/7.jpg";				  // bgImg7 source
var bgImg8 = new Image(); 										  // canvas backgroound image 8
var bgSrc8 = "asteroids_assets/images/bgImg/8.jpg";				  // bgImg8 source
var bgImg9 = new Image(); 										  // canvas backgroound image 9
var bgSrc9 = "asteroids_assets/images/bgImg/9.jpg";				  // bgImg9 source
var shipImg0 = new Image();             						  // ship image without thrust
var shipSrc0 = "asteroids_assets/images/starshipNormal.png";	  // shipImg0 source
var shipImg1 = new Image();             		 				  // ship1 image with thrust
var shipSrc1 = "asteroids_assets/images/starshipEmitter.png";	  // shipImg1 source
var currShipImg;
var bulletImg = new Image();             		 				 // bullet image
var bulletSrc = "asteroids_assets/images/bullet.png";			 // bulletImg source
var asteroidImg = new Image();             		 				 // asteroid image
var asteroidSrc = "asteroids_assets/images/asteroid.png";		 // asteroidImg source
var introImg = new Image();             		 				 // intro image
var introSrc = "asteroids_assets/images/intro.jpg";		 		 // introImg source
var pauseImg = new Image();             		 				 // pause image
var pauseSrc = "asteroids_assets/images/paused.png";		 	 // pauseImg source
var restartImg = new Image();             		 				 // restart image
var restartSrc = "asteroids_assets/images/restart.png";		 	 // restartImg source
var crushedShipImg = new Image();             		 			 // crushed ship image
var crushedShipSrc = "asteroids_assets/images/starshipCrushed.png";// crushedShipImg source

// from sound_handler.js:
var asteroidsReloaded_musicSnd = new Audio(); 			 	// background music
var musicSrc = "asteroids_assets/sounds/bgMusic.mp3";	 	// bgImg source
var asteroidsReloaded_thrustSnd = new Audio();				// ship thrusting sound
var asteroidsReloaded_thrustSnd2 = new Audio();				// ship thrusting sound
var thrustSrc = "asteroids_assets/sounds/engineThrust.mp3";	// thrust sound source source
var asteroidsReloaded_fireSnd = new Audio(); 			 	// shooting sound
var fireSrc = "asteroids_assets/sounds/fire.mp3";	 		// asteroidsReloaded_fireSnd source
var asteroidsReloaded_explosionSnd = new Audio(); 			// explosion sound
var explosionSrc = "asteroids_assets/sounds/explosion.mp3";	// explosionSnd source
var asteroidsReloaded_forcefieldSnd = new Audio(); 			// forcefield sound
var forcefieldSrc = "asteroids_assets/sounds/forcefield.mp3";// asteroidsReloaded_forcefieldSnd source
var asteroidsReloaded_harshForcefieldSnd = new Audio(); 	// emergency forcefield sound
var harshForcefieldSrc = "asteroids_assets/sounds/harshForcefield.mp3";// asteroidsReloaded_harshForcefieldSnd source
var asteroidsReloaded_thrustSndLoopPoint = 2.5;				// after this point in playback, reset play the other thrust sound, default: 2.5
var overlapBreaker = 0.2;									// how much time after the next playback should current one stop. default: 0.2
var asteroidsReloaded_soundOn = true;						// whether or not music is on
var asteroidsReloaded_musicVolume = 0.2;					// initial music valume between 1 and 0, default: 0.2
var soundVolumeModifier = 0.1;								// the rate at which sound is increased or decreased. default: 0.1

// from ship_handler.js:
var thrusting = false;						// wether or not the ship is thrusting, initially: false
var turningLeft = false;					// wether or not the ship is turning left, initially: false
var turningRight = false;					// wether or not the ship is turning right, initially: false
var shielding = false;						// wether or not the ship is shielding, initially: false
var shipWidth = 25;							// ship's width, default: 25
var shipHeight = 24;						// ship's heigh, default: 24
var slowAngelCase1 = 30;	  				// hardest angel to turn, any turn bigger then this will cause player to lose most speed, default: 30
var slowModifierCase1 = 1000;				// hardest speed modifier, the smaller it is, the more speed player loses on turn, default: 1000
var slowAngelCase2 = 20;	  				// second hardest angel to turn, anything between this and the previous angel will lose speed based on its modifier, default: 20
var slowModifierCase2 = 1500;				// second hardest speed modifier, the smaller it is the harder getting force gets, default: 1500
var slowAngelCase3 = 15;	  				// third hardest angel to turn, anything bigger than this but smaller than the previous angel will receive third modifier, default: 15
var slowModifierCase3 = 2000;				// third hardest speed modifier, the smaller the harder it is to get force, defailt: 2000
var fastestModifier = 0.5;					// fastest speed modifier, applies to anything smaller then or equal to the second fast speed angel, between 0 and 1, the bigger the faster, default: 0.5
var fastAngelCase1 = 5;	  					// second easiest angel, the first being 0, uses the fastModifierCase1 to anything bigger than it and smaller than or equal to fastAngelCase2, default: 5
var fastModifierCase1 = 0.3;				// second fastest speed modifier, applies to any angle between second fast angel and third fast angel, between 0 and 1, the bigger the faster, default: 0.3
var fastAngelCase2 = 10;	  				// third easiest angel, the first being 0, uses the fastModifierCase2 to anything bigger than it and smaller than or equal to slowAngelCase3, default: 10
var fastModifierCase2 = 0.2;				// third fastest speed modifier, applies to any angle between third fastest angel and third slowest angel, between 0 and 1, the bigger the faster, default: 0.2
var shipSpeedDecoyRate = 0.001; 			// speed will decoy overtime, between 0 and maximum force, the bigger the more speed the ship loses. default: 0.001
var maxShipSpeed = 1.5;		 				// max speed a ship can reach, default: 1.5
var turnSpeedModifier = 2;					// how fast can the ship turn every frame, in degrees. default: 2
var engineFrozen = false;					// is the engine frozen?. default: false
var frozenSine = 0;							// since when is the engine frozen?. default: 0
var freezePeriod = 500;						// how long should the engine be frozen for?. default: 500
var shieldEnergy = 0;					    // shield energy. initialized at: 0
var shieldMaxEnergy = 5000;					// max shield energy. defualt: 5000
var shieldJumpstartEnergy = 500;			// the energy required to jump start shield engine. defualt: 500
var energyPerAsteroid = 50;					// energy absorbed from crushed astroids. defualt: 50
var energyDecoyRate = 1;					// how fast does the energy go down while shield is on. defualt: 1
var energyGenerationRate = 1;				// how fast does the energy go up while shield is off. defualt: 1
var emergencyShields = 3;				    // emergency shields. initialized at: 3, renewed every 10 waves.
var emergencyShieldingSince = 0;		    // when was emergency shield activated?. initialized at: 0
var emergencyShieldingDuration = 600;		// how long before emergency shield goes down?. default: 600
var emergencyShielding = false;			 	// is ship currently emergency shielding? intizialized as: false
var shieldRadius = 25;			 			// shield's radius around the ship. default: 25
var emergencyShieldRadius = 20;			 	// emergency shield's radius around the ship. default: 20
var shieldColor = 'white';			 		// shield's color. default: 'white'
var emergencyShieldColor = 'red';			// emergancy shield's color. default: 'red'
var shieldThickness = 5;			 		// how thick is the shield looking? default: 5 (in px)
var emergencyShieldThickness = 3;			// how thick is the emergency shield looking? default: 7 (in px)
var shieldFlashRate = 2;			 		// how fast does the shield flash?  default: 2 (in game time)
var emergencyShieldFlashRate = 4;			// how fast does the emergency shield flash?  default: 2 (in game time)
var shooting = false;			 			// is player currently shooting?. initialized as: false
var renewShieldsEvery = 10;	 				// shields are renewed every this number of waves. Default: 10

// from bullet_handler.js:
var bulletSpeed = 4;						// how fast is a bullet once fired. default: 0.5
var bulletSpeedDecoy = 0.01;				// how fast does the bullet slow down. default: 0.01
var bulletDeadSpeed = 3;					// when does the bullet vanish. default: 0.2
var bulletsHolder = [];						// this array holds all the bullet refrences.
var bulletSpawnRadius = 20;					// how far from the ship center should the bullet spawn. default: 20
var fireCooldown = 100;						// how much (in gameTime) before the player is able to fire another, default: 100
var lastShot = 0;							// when did the player last fire a bullet, relative to gameTime. default: 0
var bulletWidth = 7;						// ship's width, default: 25
var bulletHeight = 7;						// ship's heigh, default: 24

// from ateroids_handler.js:
var asteroidAngelRange = 30;				// angel range limit for spawning new asteroids. default: 30
var asteroidSpeed = 1;						// how fast is the asteroid going. default: 3, note: asteroids don't slow down, the smaller the asteroid the faster it'll be.
var asteroidsHolder = [];					// this array holds all the asteroid refrences.
var asteroidSpawnCooldown = 1000;			// time between every spawn (initially) (for asteroids, not player), default: 2000
var numberOfAsteroidsEachSpawn = 1;			// how many each spawn (initially)? dafult: 1
var increaseSpawnsBy = 1;					// how many asteroids should be added to the spawn rate?, default: 1
var increaseSpawnsEvery = 3;				// how many waves before increasing spawn rate, default: 3
var maxAsteroidSpawnRate = 15;				// spawn rate limit, default: 15
var asteroidWidth = 50;						// ship's width, default: 50
var asteroidHeight = 64;					// ship's heigh, default: 64
var pointsPerAstroid = 50;					// points gained per astroids destroyed. initialized at: 50
var sizeMatters = true;						// whether or not size affects pointsPerAstroid. initialized at: true
var alreadySpawned = false;					// whether or not asteroids has been already spawned for this wave. initialized at: true
var asteroidWave = 0;						// which wave is this? initialized at: 0
var randomizeSpawnRate = true;				// change increaseSpawnsEvery by a random number chosen from randomizeRange. default: true
var randomizeRange = 3;						// affects randomizeSpawnRate initialized at: 3

// from collision_handler.js:
var shipX1Modifier = -5;					// ship bounding box (x1) modifier, default: -5
var shipY1Modifier = -5;					// ship bounding box (y1) modifier, default: -5
var shipX2Modifier = 0; 					// ship bounding box (x2) modifier, default: 0
var shipY2Modifier = -5;					// ship bounding box (y2) modifier, default: -5
var asteroidBoundsModifier = -15;			// asteroid bounding box (all) modifier, default: -15

// from explosion_handler.js
var explosionHolder = [];					// all explosions are held here for as long as they last.
var explosionPowerDecoyRate = 0.05;			// between 0 and 1, how much power should the explosion lose per loop? default: 0.05

// from stats_handler.js:
var statCanvas, statCtx, statCanvasHolderDiv;	  // canvas creation variables.
var statCanvasWidth = "1200"; 					  // canvas width, defualt: "1200".
var statCanvasHeight = "40";					  // canvas height, defualt: "100".
var statCanvasStyle = "border:5px solid #ffffff;";// canvas css style, defualt: "border:5px solid #ffffff;".
var defaultStatsFont = "20px 'Revalia', cursive"; // standard stats font, default: '15px Arial'.
var defaultStatsColor = 'green';				  // standard stats color, default: 'gold'.
var defaultStatsAlign = 'left';					  // standard stats align, default: 'left'.
var congratsMsgOrder = 1;						  // used at congrats message loop, initialized at: 0

// from key_handler.js:
var keys = [];								// when a key is pressed or held it's value will be true in keys[]

// from main.js and screen_handler.js:
var score = 0;								// game score. initialized at: 0
var asteroidsReloaded_highScore = 0;		// game hieghest score. initialized at: 0, loaded from storage.
var gameTime = 0;							// how long since the game started. inizialized as: 0
var gameOn = false;							// whether or not the game is playing. default: false
var frameRate = 5;							// the less the number, the faster the mainloop goes. default: 5
var playerShip;								// player ship.
var gameStarting = false;					// player currently starting the game?. inizialized as: false
var gamePaused = false;						// player currently starting the game?. inizialized as: false
var playerDead = false;						// player currently starting dead?. inizialized as: false
var updatedScore = false;					// did the score get updated?. inizialized as: false
var newHighScore = false;					// did the player get a new highscore?. inizialized as: false

//load next script:
loadNextScript();
