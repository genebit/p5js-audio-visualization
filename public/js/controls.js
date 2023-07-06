// Controls
let bands = 128;
let smoothing = 0.8;
let spectrumStyle;
let spectrumColor;
let backgroundColor;

const $freqBands = $("#freqBands");
const $freqBandSmoothing = $("#freqBandSmoothing");
const $freqBackgroundColor = $("#backgroundClrPicker");
const $freqSpectrumColor = $("#spectrumClrPicker");
const $freqSpectrumStyle = $("#spectrumStyle");

// Set the default slider styles using linear gradient
setSliderStyle("songTrack", "var(--bs-primary)", "var(--bs-accent)", "#d3d3d3");
setSliderStyle("freqBands", "var(--bs-primary)", "var(--bs-accent)", "#d3d3d3");
setSliderStyle("freqBandSmoothing", "var(--bs-primary)", "var(--bs-accent)", "#d3d3d3");

$freqSpectrumStyle.select2({ minimumResultsForSearch: -1 });

$freqBands.on("input", () => (bands = this.value));
$freqBandSmoothing.on("input", () => (smoothing = this.value));
$freqSpectrumStyle.on("change", () => (spectrumStyle = this.value));

window.toggleSidebar = function () {
	var sidebar = $(".sidebar");
	sidebar.toggleClass("active");
};

// Toggles a div to fullscreen, used on sketchContainer
window.toggleFullscreen = function () {
	const container = $("#sketchContainer")[0];
	const $fullscreenIcon = $("#fullscreenIcon");

	if (!document.fullscreenElement) {
		if (container.requestFullscreen) {
			container.requestFullscreen();
		} else if (container.mozRequestFullScreen) {
			container.mozRequestFullScreen();
		} else if (container.webkitRequestFullscreen) {
			container.webkitRequestFullscreen();
		} else if (container.msRequestFullscreen) {
			container.msRequestFullscreen();
		}

		// Update the icon to the fullscreen icon
		$fullscreenIcon.removeClass("fa-up-right-and-down-left-from-center");
		$fullscreenIcon.addClass("fa-down-left-and-up-right-to-center");
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}

		// Update the icon to the default icon
		$fullscreenIcon.removeClass("fa-down-left-and-up-right-to-center");
		$fullscreenIcon.addClass("fa-up-right-and-down-left-from-center");
	}
};

window.toggleThemeMode = function () {
	const $themeSliderIcon = $("#themeSliderIcon");
	const $body = $("body");
	const lightModePath = "/public/assets/svg/slider-light-mode.svg";
	const darkModePath = "/public/assets/svg/slider-dark-mode.svg";

	$body.toggleClass("dark");

	if ($body.hasClass("dark")) {
		$themeSliderIcon.attr("src", lightModePath);
		$(".sidebar").removeClass("bg-white").addClass("bg-dark");
		$(".card").removeClass("bg-white").addClass("bg-dark");
		$(".p").removeClass("text-dark").addClass("text-white");
	} else {
		$themeSliderIcon.attr("src", darkModePath);
		$(".sidebar").removeClass("bg-dark").addClass("bg-white");
		$(".card").removeClass("bg-dark").addClass("bg-white");
		$(".p").removeClass("text-white").addClass("text-dark");
	}
};

export { bands, smoothing, spectrumStyle, spectrumColor, backgroundColor };
