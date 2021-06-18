
let microphone;

function setup() {
  createCanvas(500, 500);

  microphone = new p5.AudioIn();
  microphone.start()
}

function draw() {
  background('255');

  fill(26)
  noStroke()
  let volume = microphone.getLevel();
  ellipse(height/2, width/2, volume*500, volume*500);
  console.log('volume', volume);
}