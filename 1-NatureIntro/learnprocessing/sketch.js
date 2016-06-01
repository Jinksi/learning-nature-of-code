var smallPoint, largePoint;
var colors = [];
var index = 0;
var angle = 0;
var t = 0;

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  colors.push(color(237, 70, 100, 6));
  colors.push(color(237, 70, 47, 6));
  colors.push(color(104, 171, 250, 6));
  smallPoint = 1;
  largePoint = 30;
  noStroke();
  clear();

  angleMode(RADIANS);
}

function draw() {
  t = t + 0.01;
  var p1 = noise (t);
  var p2 = noise(t - 2);
  var x = map(p1, 0, 1, 0, width);
  var y = map(p2, 0, 1, 0, height);
  for (var i = 0; i < 15; i++) {
    var v = p5.Vector.random2D();

    var wave = map(sin(angle), -1, 1, 3, 4);

    v.mult(random(1, 5*wave));
    var pointillize = random(smallPoint, largePoint);
    x += v.x;
    y += v.y;
    blendMode(ADD);
    fill(colors[index]);
    ellipse(x, y, pointillize, pointillize);
  }

  if (random(1) < 0.01) {
    index = (index + 1) % colors.length;
  }

  angle += 0.02;
}
