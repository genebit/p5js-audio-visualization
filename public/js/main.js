import * as c from "./controls.js";
import * as cP from "./colorPicker.js";

let fft, microphone, sound;
let $sketchContainer = $("#sketchContainer");

jQuery(function () {
	cP.colorPickerBehavior("backgroundClrPicker");
	cP.colorPickerBehavior("spectrumClrPicker");
});

const setup = function () {
	// Responsive canvas setup
	// Parent the generated p5js canvas to the #sketchContainer div
	let canvasWidth = $sketchContainer.width();
	let canvasHeight = $sketchContainer.height();

	let canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent("sketchContainer");

	// FFT Setup
	fft = new p5.FFT(c.smoothing, c.bands);

	console.log("hello");
};

const draw = function () {
	background("#000000");
	console.log("hello");
};

const windowResized = function () {
	let newCanvasWidth = $sketchContainer[0].offsetWidth;
	let newCanvasHeight = $sketchContainer[0].offsetHeight;
	resizeCanvas(newCanvasWidth, newCanvasHeight);
};
