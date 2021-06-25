
// function setup() {
//     createCanvas(400, 400);
// }

// function draw() {
//     background(26);

//     stroke(255);
//     strokeWeight(5);
//     for (var i = 0; i <= 10; i++) {
//         line(i * 50, height, i * 50, height/2);
//     }
// }

let mic;

 function setup(){
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
}

function draw(){
  background(0);
  fill(255);
  text('Volume', width/2, 20);

  micLevel = mic.getLevel();
  let y = height - micLevel * height;
  ellipse(width/2, y, 10, 10);
}