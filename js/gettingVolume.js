let mic;

function setup() {
  createCanvas(300, 500);
  
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(26);
  let volume = mic.getLevel();
  console.log('Volume:', volume);

  let volumeHeight = map(volume, -0.4, 1, height, 0);
  
  // Draw the Line
  fill(255);
  stroke(255);
  strokeWeight(10);
  line(width/2, 400, width/2, volumeHeight)

}
