let fft;
let soundFile;

let bands = 128;
let smoothing = 0.8;
let distance = 2;
let microphone;

$(document).ready(function () {
	// Listen for change event on file input
	$("#audioFile").on("change", function (e) {
		var file = e.target.files[0];
		var audio = $("#audioControls")[0];

		// Update src attribute of audio element
		var fileURL = URL.createObjectURL(file);
		audio.src = fileURL;

		setup();
	});

	updateFreqBands();
	updateFreqBandSmoothing();
});

function setup() {
	let $sketchContainer = $("#sketchContainer");
	let cWidth = $sketchContainer.width();
	let cHeight = $sketchContainer.height();
	let canvas = createCanvas(cWidth, cHeight);
	canvas.parent("sketchContainer");

	microphone = new p5.AudioIn();
	microphone.start();

	// FFT Setup
	fft = new p5.FFT(smoothing, bands);
	fft.setInput(microphone);
}

function draw() {
	getAudioContext().resume();
	background($("#backgColor").val());

	let spectrum = fft.analyze();
	let position = height / 2;

	fill($("#spectrumColor").val());
	noStroke();

	for (let i = 0; i < spectrum.length; i++) {
		let x = map(i, 0, spectrum.length, 0, width);
		let bandHeight = map(spectrum[i], 0, 255, 0, height / 2);
		selectStyle($("#spectrumStyle").val(), x, position, bandHeight);
	}
}

function selectStyle(selected, x, pos, bandheight) {
	switch (selected) {
		case "Intestine":
			ellipse(x * distance, pos, 200, bandheight);
			break;
		case "Rectangle":
			rect(x * distance, height - bandheight, 15, bandheight);
			break;
		case "Rectangle Thin":
			rect(x * distance, height - bandheight, 5, bandheight, 100);
			break;
		case "Hypno":
			noFill();
			stroke($("#spectrumColor").val());
			strokeWeight(3);
			ellipse(width / 2, height / 2, bandheight, bandheight);
			break;
		case "Mirror":
			let rectWidth = 5;
			let rectX = x * distance - rectWidth / 2;
			let rectY = height / 2 - bandheight / 2;

			// Draw top rectangle
			rect(rectX, rectY, rectWidth, bandheight);

			// Draw bottom rectangle
			let bottomRectY = height / 2 + bandheight / 2;
			rect(rectX, bottomRectY, rectWidth, -bandheight, 50);
			break;
	}
}

function updateFreqBands() {
	let $freqBandInput = $("#freqBands");
	let $freqBandsLabel = $("#freqBandsLabel");

	$freqBandInput.on("input", function () {
		let b = [16, 32, 64, 128, 256, 512, 1024];

		bands = parseInt(b[this.value]); // Update the bands value when the input changes
		$freqBandsLabel.html(bands);
		setup();
	});
}

function updateFreqBandSmoothing() {
	let $freqBandSmoothingInput = $("#freqBandSmoothing");
	let $freqBandSmoothingLabel = $("#freqBandSmoothingLabel");

	$freqBandSmoothingInput.on("input", function () {
		smoothing = parseFloat(this.value);
		$freqBandSmoothingLabel.html(smoothing);
		setup();
	});
}
