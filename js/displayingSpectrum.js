
let microphone;
let fft;

function setup() {
    createCanvas(400, 400);

    // Setup Mic Input
    microphone = new p5.AudioIn();
    microphone.start();
}

function draw() {
    background(26);
    
}