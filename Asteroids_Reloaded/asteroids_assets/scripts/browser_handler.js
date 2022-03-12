// only browser that is supported so far is firefox.
if (forceBrowser){
	updateLoadingText("detecting browser ..");
	if (is_firefox_or_chrome){
		updateLoadingText("allowed browser detected, browser approved ..");
		loadNextScript();
	} else {
		clearStatsText();
		updateStatsText(statCanvas.width /2, statCanvas.height / 2 + 10, "Browser Not Supported!", "35px 'Revalia'", "red", 'center');
		updateStatsText2(canvas.width /2, canvas.height / 2 + loadingTextPos + 10, "Please use the latest version of Mozilla Firefox or Google Chrome", "20px Arial bold", "red", 'center');
	}
} else {
	loadNextScript();
} 
