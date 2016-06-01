var t = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  background('#050505');
  frameRate(120);
}

function draw() {

  // random
  var x = random(0, width);
  var y = random(0, height);
  fill(255, 100);
  noStroke();
  // ellipse(x, y, 1, 1);

  // Perlin Noise
  t = t + 1;
  for (var i = 1; i <= 50; i++) {
    var tx = t / i;
    var p = noise(tx);
    var p2 = noise(tx - 2);
    var a = map(p, 0, 1, 0, width);
    var b = map(p2, 0, 1, 0, height);
    fill('rgba(255, 54, 144, 0.2)');
    noStroke();
    blendMode(ADD);
    var size = 2;
    ellipse(a, b, size, size);

  }

}

  function windowResized() {
    t = 0;
    resizeCanvas(windowWidth, windowHeight);
    fill('#050505');
    rect(0,0,width, height);

  }
