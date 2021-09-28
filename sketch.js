
var canvas;
var fft;
const bands = 128;
const smoothing = 0.7;

var microphone;

let song;

function setup() {
    canvas = createCanvas(windowWidth, 400);
    canvas.parent("#sketch");
    
    microphone = new p5.AudioIn();
    microphone.start();
    getAudioContext().resume();

    // Sound Setup
    song = loadSound("./sound/kokeko🐔.mp3");

    // FFT Setup
    fft = new p5.FFT(smoothing, bands);
    fft.setInput(microphone);
}

var distance = 2; 

function draw() {
    background(26);
    
    let spectrum = fft.analyze();
    let position = height / 2;
    
    fill("#Ed4E4E");
    noStroke();

    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let bandHeight = -height + map(spectrum[i], 0, 255, height, 0);
        // rect(x * 2, height-20, 5, bandHeight);
        ellipse(x * 1.5, position, 100, bandHeight);
    }
}

function toggleSong() {
    if (song.isPlaying())
        song.stop();
    else
        song.play();
}