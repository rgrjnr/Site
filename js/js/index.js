// http://paulirish.com/2011/requestanimationframe-for-smart-animating/

(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
			window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

/*
 *  kb:
 *
 *  http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
 *  http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
 */

var img_b64,
	data_b64,

	max_iterations = 50,
	margin = 2000;

var get_img_b64 = function(img) {
	
	var can = document.createElement('canvas');
	can.width = img.width;
	can.height = img.height;
	can.getContext("2d").drawImage(img, 0, 0);
	return can.toDataURL('image/jpeg', 1.0);
	
}

var get_img_b64_glitched = function(data, margin, max_iterations) {

	var gli = data,
		rnd = Math.random,
		round = Math.round,
		i, p, errors,
		thresold = rnd() * .25 + .5;

	if (rnd() > thresold) {
		errors = round(rnd() * max_iterations);

		for (i = 0; i < errors; i++) {
			p = margin + round(rnd() * (gli.length - 1 - margin));
			gli = gli.substr(0, p) + gli.charAt(p + 1) + gli.charAt(p + 2) + gli.substr(p + 2);
		}
	}
	return gli;
}

var delta, now,
	then = Date.now(),
	fps = 60,
	fr = 1000 / fps,

	render = function() {

		requestAnimationFrame(render);
		//frame control
		now = Date.now();
		delta = now - then;

		if (delta > fr) {
			then = now - (delta % fr);
			//frame code

			//update DOM src image
			img_b64.src = get_img_b64_glitched(data_b64, margin, max_iterations);
		}

	};

var init_b64 = function() {

	document.body.appendChild(img_b64);

	data_b64 = get_img_b64(img_b64);

	img_b64.src = data_b64;
	img_b64.onload = null;

	render();
};

//

img_b64 = new Image();
img_b64.crossOrigin = "anonymous";
img_b64.src = $(this).attr("src");
img_b64.onload = init_b64;