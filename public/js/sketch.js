let $freqBands, $freqBandSmoothing, $freqBackgroundColor, $freqSpectrumColor, $freqSpectrumStyle;
let bands, smoothing, spectrumStyle, spectrumColor, backgroundColor;

// p5js
let fft, sound, microphone, source, audioContextState;
let playbackPosition;

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

	// FFT Setup
	fft = new p5.FFT(smoothing, bands);

	if (source === "mic") {
		microphone = new p5.AudioIn();
		microphone.start();

		fft.setInput(microphone);
	}
}

function draw() {
	frameRate(FPS);
	// Set the background
	background(backgroundColor);

	let spectrum = fft.analyze();

	// Show the demo by default, this is where no audio source are selected yet
	// If there are currently no audio source selected then show the demo
	if (!source) demo();
	else {
		FPS = 60;

		renderAudioVisualization(spectrum, spectrumStyle, spectrumColor);
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

function renderAudioVisualization(spectrum, spectrumStyle, spectrumColor) {
	switch (spectrumStyle) {
		case "Rectangle":
			fill(spectrumColor);
			noStroke();

			const padding = 3;
			const totalPadding = (spectrum.length - 1) * padding;
			const rectWidth = (width - totalPadding) / spectrum.length;

			for (let i = 0; i < spectrum.length; i++) {
				let x = map(i, 0, spectrum.length, 0, width);
				let bandHeight = map(spectrum[i], 0, 255, 0, height);

				rect(x, height - bandHeight, rectWidth, bandHeight);
				x += rectWidth + padding;
			}
			break;

		case "Clouds":
			fill(spectrumColor);
			noStroke();

			for (let i = 0; i < spectrum.length; i++) {
				let x = map(i, 0, spectrum.length, 0, width);
				let bandHeight = map(spectrum[i], 0, 255, 0, height);

				ellipse(x * 2, height, 200, bandHeight);
			}
			break;

		case "Ellipse":
			fill(spectrumColor);
			noStroke();
			const bassAmplitude = fft.getEnergy("bass");
			const ellipseSize = map(bassAmplitude, 0, 255, 10, 200);

			ellipse(width / 2, height / 2, ellipseSize, ellipseSize);
			break;

		case "Wavelength":
			let waveform = fft.waveform();
			noFill();
			beginShape();

			stroke(spectrumColor);
			strokeWeight(3);
			for (let i = 0; i < waveform.length; i++) {
				let x = map(i, 0, waveform.length, 0, width);
				let y = map(waveform[i], -1, 1, 0, height);
				vertex(x, y);
			}
			endShape();
			break;

		case "Hypnosis":
			noFill();
			stroke(spectrumColor);
			strokeWeight(3);
			for (let i = 0; i < spectrum.length; i++) {
				let bandHeight = map(spectrum[i], 0, 255, 0, height);

				ellipse(width / 2, height / 2, bandHeight, bandHeight);
			}
			break;

		case "Mirror":
			fill(spectrumColor);
			noStroke();
			for (let i = 0; i < spectrum.length; i++) {
				let x = map(i, 0, spectrum.length, 0, width);
				let bandHeight = map(spectrum[i], 0, 255, 0, height);

				let rectW = 10;
				let rectX = x * 2 - rectW / 2;
				let rectY = height / 2 - bandHeight / 2;

				rect(rectX, rectY, rectW, bandHeight, 100);
				let bottomRectY = height / 2 + bandHeight / 2;
				rect(rectX, bottomRectY, rectW, -bandHeight, 100);
			}
			break;
	}
}
