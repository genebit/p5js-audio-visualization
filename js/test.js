
// Drawing a grid
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(26);

  stroke(255);
  // strokeWeight(5);

  beginShape();
  endShape();
}

function drawGrid() {
  let column = height / 5;
  let row = width / 5;

  for (let x = 0; x < width; x += row)
  {
    for (let y = 0; y < height; y += column)
    {
      // horizontal
      line(0, y, width, y);

      // vertical
      line(x, 0, x, height);
    }
  }
}
