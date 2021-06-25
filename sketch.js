
let microphone;

function setup() {
  createCanvas(500, 500);
  frameRate(24);

  microphone = new p5.AudioIn();
  microphone.start();
}

function draw() {
  background('255');

  let volume = microphone.getLevel();
  
  fill(26);
  strokeWeight(5);
  let h = map(volume, -0.4, 1, height, 0);
  line(width/2, 350, width/2, h);
}
