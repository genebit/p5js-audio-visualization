const colorPickerBehavior = function (elementId) {
	const picker = document.getElementById(elementId);
	picker.style.background = picker.value;

	picker.addEventListener("input", function () {
		const label = this.nextElementSibling;
		label.innerHTML = this.value.toUpperCase();
		picker.style.background = this.value;
	});
};

export { colorPickerBehavior };
