import * as c from "./controls.js";
import * as cP from "./colorPicker.js";

jQuery(function () {
	cP.colorPickerBehavior("backgroundClrPicker");
	cP.colorPickerBehavior("spectrumClrPicker");

	// Set the default slider styles using linear gradient
	setSliderStyle("songTrack", "var(--bs-primary)", "var(--bs-accent)", "#d3d3d3");
	setSliderStyle("freqBands", "var(--bs-primary)", "var(--bs-accent)", "#d3d3d3");
	setSliderStyle("freqBandSmoothing", "var(--bs-primary)", "var(--bs-accent)", "#d3d3d3");

	$("#spectrumStyle").select2({ minimumResultsForSearch: -1 });
});
