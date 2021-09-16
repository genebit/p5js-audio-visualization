
let microphone;
let canvas;

function setup() {
    canvas = createCanvas(500, 500);

    microphone = new p5.AudioIn();
    microphone.start();
    background(200);
}

var brushColor;

function draw() {
    // background(200);
    // let volume = microphone.getLevel();
    // ellipse(canvas.width/2, canvas.height/2, volume*1000, volume*1000);

    if (mouseIsPressed) {
        stroke(0);
        strokeWeight(5);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}