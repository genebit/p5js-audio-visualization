
var canvas;
var fft;
// 2 4 8 16 32 64 128 256 512
var bands = 128;
var smoothing = 0.8;

var microphone;

function setup() {
    canvas = createCanvas(windowWidth, 400);
    canvas.parent("#sketch");
    frameRate(60);
 
    microphone = new p5.AudioIn();
    microphone.start();
    
    // FFT Setup
    fft = new p5.FFT(smoothing, bands);
    fft.setInput(microphone);
}

var distance = 2; 

function draw() {
    getAudioContext().resume();
    background($("#backg-color").val());
    
    let spectrum = fft.analyze();
    let position = height / 2;
    
    fill($("#spectrum-color").val());
    noStroke();
    
    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let bandHeight = -height + map(spectrum[i], 0, 255, 500, 0);
        selectStyle($("#spectrum-style").val(), x, position, bandHeight);
    }
}
function selectStyle(selected, x, pos, bandheight) {
    switch (selected) {
        case "Intestine":
            ellipse(x * distance, pos, 200, bandheight);
            break;
    
        case "Rectangle":
            rect(x * distance, height-20, 15, bandheight);
            break;

        case "Hypno":
            noFill();
            stroke($("#spectrum-color").val());
            strokeWeight(3);
            ellipse(width/2, height/2, bandheight, bandheight);
            break;
    }
}

var toggleMic = function() { microphone.start(); }
var pauseMic = function() { microphone.stop(); }

function touchStarted() {
    getAudioContext().resume();
}