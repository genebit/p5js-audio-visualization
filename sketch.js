let fft;
let soundFile;

let bands = 256; // 2 4 8 16 32 64 128 256 512
let smoothing = 0.8;
let distance = 2;
let microphone;

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
	background($("#backg-color").val());

	let spectrum = fft.analyze();
	let position = height / 2;

	fill($("#spectrum-color").val());
	noStroke();

	for (let i = 0; i < spectrum.length; i++) {
		let x = map(i, 0, spectrum.length, 0, width);
		let bandHeight = map(spectrum[i], 0, 255, 0, height / 2);
		selectStyle($("#spectrum-style").val(), x, position, bandHeight);
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

		case "Hypno":
			noFill();
			stroke($("#spectrum-color").val());
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

let toggleMic = function () {
	microphone.start();
};
let pauseMic = function () {
	microphone.stop();
};

function touchStarted() {
	getAudioContext().resume();
}

$(document).ready(function () {
	// Listen for change event on file input
	$("#audioFile").on("change", function (e) {
		var file = e.target.files[0];
		var audio = $("#audioControls")[0];

		// Update src attribute of audio element
		var fileURL = URL.createObjectURL(file);
		audio.src = fileURL;

		let audioElement = $("#audioControls")[0];
		soundFile = new p5.SoundFile(audioElement.src);
		fft.setInput(soundFile);
	});
});
