// load images in order, declare loaded when done, push background images in the bgArray in the process
updateLoadingText("image handler loaded ..");
pauseImg.onload = function() {
	introImg.onload = function() {
		bgImg1.onload = function() {
			bgImg2.onload = function() {
				bgImg3.onload = function() {
					bgImg4.onload = function() {
						bgImg5.onload = function() {
							bgImg6.onload = function() {
								bgImg7.onload = function() {
									bgImg8.onload = function() {
										bgImg9.onload = function() {
											shipImg0.onload = function() {
												shipImg1.onload = function() {
													bulletImg.onload = function() {
														asteroidImg.onload = function() {
															restartImg.onload = function() {
																crushedShipImg.onload = function() {
																	updateLoadingText("all images loaded ..");
																	updateCanvasBg();
																	loadNextScript();
																};
																crushedShipImg.src = crushedShipSrc;
															};
															restartImg.src = restartSrc;
														};
														asteroidImg.src = asteroidSrc;
													};
													bulletImg.src = bulletSrc;
												};
												
												currShipImg = shipImg0;
												shipImg1.src = shipSrc1;
											};
											bgArray.push(bgImg9);
											shipImg0.src = shipSrc0;
										};
										bgArray.push(bgImg8);
										bgImg9.src = bgSrc9;
									};
									bgArray.push(bgImg7);
									bgImg8.src = bgSrc8;
								};
								bgArray.push(bgImg6);
								bgImg7.src = bgSrc7;
							};
							bgArray.push(bgImg5);
							bgImg6.src = bgSrc6;
						};
						bgArray.push(bgImg4);
						bgImg5.src = bgSrc5;
					};
					bgArray.push(bgImg3);
					bgImg4.src = bgSrc4;
				};
				bgArray.push(bgImg2);
				bgImg3.src = bgSrc3;
			};
			bgArray.push(bgImg1);
			bgImg2.src = bgSrc2;
		};
		bgImg1.src = bgSrc1;
		};
	introImg.src = introSrc;
};
pauseImg.src = pauseSrc;