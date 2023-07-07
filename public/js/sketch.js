let $freqBands, $freqBandSmoothing, $freqBackgroundColor, $freqSpectrumColor, $freqSpectrumStyle;
let bands, smoothing, spectrumStyle, spectrumColor, backgroundColor;

// p5js
let fft, source, sound, microphone;
let canvas, $sketchContainer;
let FPS = 10;

jQuery(function () {
	initVariables();
	updateVariablesOnChange();
});

function setup() {
	// Canvas setup, parent it to the sketchContainer div
	let canvasWidth = $sketchContainer.width();
	let canvasHeight = $sketchContainer.height();
	canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent("sketchContainer");

	// Initialize microphone
	microphone = new p5.AudioIn();

	frameRate(FPS);

	// FFT Setup
	fft = new p5.FFT(smoothing, bands);
}

function draw() {
	// Set the background
	background(backgroundColor);

	let spectrum = fft.analyze();

	// Show the demo by default, this is where no audio source are selected yet
	// If there are currently no audio source selected then show the demo
	if (!microphone || !sound) demo();
	else {
		console.log(spectrum);
	}
}

// Canvas resizing to make it reponsive
function windowResized() {
	let canvasWidth = $sketchContainer[0].offsetWidth;
	let canvasHeight = $sketchContainer[0].offsetHeight;
	resizeCanvas(canvasWidth, canvasHeight);
}

function demo() {
	// No need to read this, this is just for demo purposes
	// It just randomizes values for each bands
	fill(spectrumColor);
	noStroke();

	const padding = 10;
	const totalPadding = (16 - 1) * padding;
	const rectWidth = (width - totalPadding) / 16;

	for (let i = 0; i < 16; i++) {
		let x = map(i, 0, 16, 0, width);
		let randomValue = lerp(random(0, 255), random(0, 255), 0.05);

		rect(x, height - randomValue, rectWidth, randomValue);
		x += rectWidth + padding;
	}
}
