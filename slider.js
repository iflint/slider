// roadshow.js
function SliderState (name, direction) {
	this.name = name;
	this.direction = direction;
	this.currentSlide = 0;
	this.isPaused = false;

	//finds how many divs (slides) are inside the named div
	this.quantity = $('.' + name + ' div').length;
}
function nextPic (showState) {
	var previous;
	if (showState.currentSlide == 0) {
		console.log(showState.quantity);
		previous = showState.quantity - 1;
	} else {
		previous = showState.currentSlide - 1;
	}
	var following;
	if (showState.currentSlide + 1 < showState.quantity) {
		following = showState.currentSlide + 1;
	} else {
		following = showState.quantity - 1;
	}
	$($('.' + showState.name + ' div')[showState.currentSlide]).css('z-index', 9);
	$($('.' + showState.name + ' div')[previous]).css('z-index', 10);
	$($('.' + showState.name + ' div')[previous]).toggleClass(showState.direction);
	// timeout duration should equal the transition duration
	window.setTimeout(function () {
		$($('.' + showState.name + ' div')[previous]).css('z-index', -10);
		$($('.' + showState.name + ' div')[previous]).toggleClass(showState.direction);
	}, 1500);
}
function intervalFunc (showState) {
	if (showState.isPaused) {
		// dont switch
	} else {
		if (showState.currentSlide + 1 < showState.quantity) {
			showState.currentSlide++;
			console.log(showState);

			nextPic(showState);
		} else {
			showState.currentSlide = 0;
			console.log(showState);

			nextPic(showState);
		}
	}
}

// this is what you configure
var show1 = new SliderState('show1', 'slideLeft');
var show2 = new SliderState('show2', 'slideRight');
window.setInterval(function() {intervalFunc(show1)}, 6000);
window.setTimeout(function() {
	window.setInterval(function() {intervalFunc(show2)}, 6000);
}, 500);