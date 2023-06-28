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
