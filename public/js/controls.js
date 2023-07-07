window.updateVariablesOnChange = function () {
	$freqBands.on("input", function () {
		const bandSet = [16, 32, 64, 128, 256, 512, 1024];
		bands = this.value;
		this.nextElementSibling.innerHTML = bandSet[parseInt(bands)];
	});

	$freqBandSmoothing.on("input", function () {
		smoothing = this.value;
	});

	$freqSpectrumStyle.on("change", function () {
		spectrumStyle = this.value;
	});

	$freqSpectrumColor.on("input", function () {
		spectrumColor = this.value;
	});

	$freqBackgroundColor.on("input", function () {
		backgroundColor = this.value;
	});
};

window.initVariables = function () {
	// Elements
	$freqBands = $("#freqBands");
	$freqBandSmoothing = $("#freqBandSmoothing");
	$freqBackgroundColor = $("#backgroundClrPicker");
	$freqSpectrumColor = $("#spectrumClrPicker");
	$freqSpectrumStyle = $("#spectrumStyle");

	// Controls with their default values
	bands = 128;
	smoothing = 0.9;
	spectrumStyle = $freqSpectrumStyle.val();
	spectrumColor = $freqSpectrumColor.val();
	backgroundColor = $freqBackgroundColor.val();

	$sketchContainer = $("#sketchContainer");
};

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
		$themeSliderIcon.attr("src", darkModePath);
		$(".sidebar").removeClass("bg-white").addClass("bg-dark");
		$(".card").removeClass("bg-white").addClass("bg-secondary");
		$(".text-uppercase, .pSidebar, label").addClass("text-white");
		$(".border").addClass("border-dark").removeClass("border-primary");
		$("#toggleBarIcon").css("color", "white");
	} else {
		$themeSliderIcon.attr("src", lightModePath);
		$(".sidebar").removeClass("bg-dark").addClass("bg-white");
		$(".card").removeClass("bg-secondary").addClass("bg-white");
		$(".text-uppercase, .pSidebar, label").removeClass("text-white");
		$(".border").removeClass("border-dark").addClass("border-primary");
		$("#toggleBarIcon").css("color", "black");
	}
};
