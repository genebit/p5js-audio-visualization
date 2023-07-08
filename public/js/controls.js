window.updateVariablesOnChange = function () {
	const $audioSrcCheckbox = $("input[name='audioSource']");

	// Update the freq. bands
	$freqBands.on("input", function () {
		const bandSet = [16, 32, 64, 128, 256, 512, 1024];
		let rawValue = parseInt(this.value);
		bands = bandSet[parseInt(rawValue)];
		this.nextElementSibling.innerHTML = bandSet[parseInt(rawValue)];
		setup();
	});

	$freqBandSmoothing.on("input", function () {
		smoothing = parseFloat(this.value);
		this.nextElementSibling.innerHTML = smoothing;
		fft.smoothing = smoothing;
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

	$audioSrcCheckbox.on("change", function () {
		const selectedSrc = $("input[name='audioSource']:checked").val();
		switch (selectedSrc) {
			case "mic":
				source = "mic";

				if (sound) sound.stop();
				setup();
				break;
			case "file":
				source = "file";

				if (microphone) microphone.stop();

				const $audioFile = $("#audioFile");
				$audioFile.on("change", function (e) {
					let file = e.target.files[0];
					handleFile(file);
				});
				break;
			default:
				source = "mic";
				break;
		}
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

window.startAudioContext = function (element) {
	audioContextState = getAudioContext().state;

	if (audioContextState === "running") {
		audioContextState = "suspended";
		element.innerHTML = "Start";

		getAudioContext().suspend();
	} else {
		audioContextState = "running";
		element.innerHTML = "Stop";

		getAudioContext().resume();
	}

	setup();
};

const handleFile = function (file) {
	const fileName = file.name;
	const fileExtension = fileName.split(".").pop().toLowerCase();

	if (fileExtension === "mp3") {
		if (sound) {
			sound.stop();
			sound.disconnect();
		}

		sound = loadSound(file, startAudioVisualization);
	} else {
		$("#invalidFileAlert").animate(
			{
				right: "1rem",
				opacity: 1,
			},
			"slow"
		);
	}
};

const startAudioVisualization = function (audio) {
	fft.setInput(audio);

	// Update the current time of the audio playback
	let duration = sound.duration();

	// Convert duration to minutes and seconds
	let minutes = Math.floor(duration / 60);
	let seconds = Math.floor(duration % 60);

	$("#songTrackTime").html(`${minutes}:${seconds}`);
};

window.playSong = function (element) {
	if (sound) {
		const iconElement = element.querySelector("i");

		if (element.classList.contains("playing")) {
			element.classList.remove("playing");
			iconElement.classList.remove("fa-pause");
			iconElement.classList.add("fa-play");

			sound.pause();
		} else {
			element.classList.add("playing");
			iconElement.classList.remove("fa-play");
			iconElement.classList.add("fa-pause");

			sound.play();
		}
		return;
	}
	$("#invalidFileAlert").animate(
		{
			right: "1rem",
			opacity: 1,
		},
		"slow"
	);
};
