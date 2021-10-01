
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
    getAudioContext().resume();

    // FFT Setup
    fft = new p5.FFT(smoothing, bands);
    fft.setInput(microphone);
}

var distance = 2; 

function draw() {
    background($("#backg-color").val());
    
    let spectrum = fft.analyze();
    let position = height / 2;
    
    // "#Ed4E4E"
    fill($("#spectrum-color").val());
    noStroke();

    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let bandHeight = -height + map(spectrum[i], 0, 255, height, 0);
        
        ellipse(x * 1.5, position, 100, bandHeight);
        
        // rect(x * 2, height-20, 15, bandHeight);
    }
}

var toggleMic = function() { microphone.start(); }
var pauseMic = function() { microphone.stop(); }