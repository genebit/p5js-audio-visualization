
var canvas;
var fft;
var microphone;

function setup() {
    canvas = createCanvas(500, 500);
    microphone = new p5.AudioIn();
    microphone.start();

    // fft = new p5.FFT(0.7, 16);
    // fft.setInput(microphone);
}

function draw() {
    background(200);

    let volume = microphone.getLevel();
    // let spectrum = fft.analyze();
    // console.log(spectrum)
    
    // map(value, (original values min and max), (new values min and max))

    let size = map(volume, 0, 1, 0, canvas.height)
    ellipse(canvas.width/2, canvas.height/2, size, size);
}