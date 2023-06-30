let bands = 128;
let smoothing = 0.8;
let distance = 2;
let spectrumStyle = $("#spectrumStyle").val();
let spectrumColor = $("#spectrumColor").val();
let backgroundColor = $("#backgColor").val();

let fft;
let microphone;
let currentAudio;
let canvas;

$(document).ready(function () {
	$("#audioFile").on("change", function (e) {
		let file = e.target.files[0];
		handleFile(file);
	});

	$("input[name='audioSource']").change(function () {
		const selectedSrc = $("input[name='audioSource']:checked").val();
		if (selectedSrc === "mic") {
			setup();
			microphone = new p5.AudioIn();
			microphone.start();
			fft.setInput(microphone);
		}
	});

	$("#spectrumStyle").on("change", () => (spectrumStyle = $("#spectrumStyle").val()));
	$("#spectrumColor").on("input", () => (spectrumColor = $("#spectrumColor").val()));
	$("#backgColor").on("input", () => (backgroundColor = $("#backgColor").val()));

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
	getAudioContext().resume(); // Resume audio context once during setup
	background(backgroundColor);

	let spectrum = fft.analyze();
	let position = height / 2;

	fill(spectrumColor);
	noStroke();

	for (let i = 0; i < spectrum.length; i++) {
		let x = map(i, 0, spectrum.length, 0, width);
		let bandHeight = map(spectrum[i], 0, 255, 0, height);
		selectStyle(spectrumStyle, x, position, bandHeight);
	}
}

function windowResized() {
	updateCanvasSize();
}

function updateCanvasSize() {
	let sketchContainer = document.getElementById("sketchContainer");
	let cWidth = sketchContainer.offsetWidth;
	let cHeight = sketchContainer.offsetHeight;
	resizeCanvas(cWidth, cHeight);
}

function selectStyle(selected, x, pos, bandHeight) {
	switch (selected) {
		case "Intestine":
			ellipse(x * distance, pos, 200, bandHeight);
			break;
		case "Rectangle":
			rect(x * distance, height - bandHeight, 15, bandHeight);
			break;
		case "Rectangle Thin":
			rect(x * distance, height - bandHeight, 5, bandHeight, 100);
			break;
		case "Hypno":
			noFill();
			stroke($("#spectrumColor").val());
			strokeWeight(3);
			ellipse(width / 2, height / 2, bandHeight, bandHeight);
			break;
		case "Mirror":
			let rectWidth = 5;
			let rectX = x * distance - rectWidth / 2;
			let rectY = height / 2 - bandHeight / 2;

			rect(rectX, rectY, rectWidth, bandHeight);
			let bottomRectY = height / 2 + bandHeight / 2;
			rect(rectX, bottomRectY, rectWidth, -bandHeight, 50);
			break;
		case "Ellipse":
			const bassAmplitude = fft.getEnergy("bass");
			const ellipseSize = map(bassAmplitude, 0, 255, 20, 200);

			ellipse(width / 2, height / 2, ellipseSize, ellipseSize);
			break;
	}
}

function updateFreqBands() {
	let freqBandInput = document.getElementById("freqBands");
	let freqBandsLabel = document.getElementById("freqBandsLabel");

	freqBandInput.addEventListener("change", function () {
		let b = [16, 32, 64, 128, 256, 512, 1024];
		bands = parseInt(b[this.value]);
		freqBandsLabel.innerHTML = bands;

		setup();
	});
}

function updateFreqBandSmoothing() {
	let freqBandSmoothingInput = document.getElementById("freqBandSmoothing");
	let freqBandSmoothingLabel = document.getElementById("freqBandSmoothingLabel");

	freqBandSmoothingInput.addEventListener("change", function () {
		smoothing = parseFloat(this.value);
		freqBandSmoothingLabel.innerHTML = smoothing;
		fft.smoothing = smoothing; // Update the smoothing property of the existing fft object
	});
}

function handleFile(file) {
	const fileName = file.name;
	const fileExtension = fileName.split(".").pop().toLowerCase();

	if (fileExtension === "mp3" || fileExtension === "wav") {
		if (currentAudio) {
			currentAudio.stop();
			currentAudio.disconnect();
		}

		currentAudio = loadSound(file, startAudioVisualization);
	} else {
		alert("Invalid file type. Please select an audio file.");
	}
}

function startAudioVisualization(audio) {
	fft.setInput(audio);
}

function playSong(element) {
	if (currentAudio) {
		const iconElement = element.querySelector("i");

		if (element.classList.contains("playing")) {
			element.classList.remove("playing");
			iconElement.classList.remove("fa-pause");
			iconElement.classList.add("fa-play");
			currentAudio.pause();
		} else {
			element.classList.add("playing");
			iconElement.classList.remove("fa-play");
			iconElement.classList.add("fa-pause");
			currentAudio.play();
		}
		return;
	}
	alert("Please enter an audio file.");
}

function repeatSong() {
	if (currentAudio) {
		currentAudio.stop();
		currentAudio.play();
	}
}

function getLocalStream() {
	navigator.mediaDevices
		.getUserMedia({ audio: true })
		.then(function (stream) {
			// Microphone access granted, do something with the audio stream
			alert("Microphone access granted");
			// You can use the `stream` object to process the audio stream
		})
		.catch(function (error) {
			// Microphone access denied or error occurred
			alert("Error accessing microphone:", error);
		});
}
