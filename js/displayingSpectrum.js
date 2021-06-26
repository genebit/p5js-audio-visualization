
let microphone;
let fft;

let song;
let amp;

function preload() {
    song = loadSound('./sounds/Vine Boom Sound.mp3');
}

function setup() {
    createCanvas(400, 400);
    
    amp = new p5.Amplitude();
    song.play();
    // Setup Mic Input
    microphone = new p5.AudioIn();
    microphone.start();
}

function draw() {
    background(26);

    fill(255);
    let volume = amp.getLevel();
    ellipse(height/2, width/2, volume*300, volume*300);
    console.log(volume);
}