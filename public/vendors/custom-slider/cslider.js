const setSliderStyle = function (inputId, fromColor, toColor, trackColor) {
	const slider = document.getElementById(inputId);
	const min = slider.min;
	const max = slider.max;
	const value = slider.value;

	slider.style.background = `linear-gradient(to right, ${fromColor} 0%, ${toColor} ${((value - min) / (max - min)) * 100}%, ${trackColor} ${((value - min) / (max - min)) * 100}%, ${trackColor} 100%)`;

	slider.oninput = function () {
		this.style.background = `linear-gradient(to right, ${fromColor} 0%, ${toColor} ${((this.value - this.min) / (this.max - this.min)) * 100}%, ${trackColor} ${((this.value - this.min) / (this.max - this.min)) * 100}%, ${trackColor} 100%)`;
	};
};
