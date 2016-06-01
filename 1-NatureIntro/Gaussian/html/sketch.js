function setup(){
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  background('#5100CC');
  frameRate(24);
}

function draw(){

  var h = (height / 4) + (randomGaussian() * height / 4);
  fill('rgba(26, 223, 185, 0.8)');
  stroke('#1ADFB9');
  blendMode(ADD);
  ellipse(width/2, height/2, h, h);
  blendMode(NORMAL);
  fill('rgba(81, 0, 204, 0.05)');
  strokeWeight(0);
  stroke(0);
  rect(0,0, width, height);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
