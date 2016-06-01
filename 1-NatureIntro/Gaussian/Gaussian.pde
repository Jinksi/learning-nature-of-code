void setup(){
  size(800,800);
  // pixelDensity(2);
  background(#5100CC);
}

void draw(){

  float h = (height / 2) + (randomGaussian() * height/2);
  fill(#1ADFB9, 200);
  stroke(#1ADFB9, 255);
  // blendMode(ADD);
  ellipse(width/2, height/2, h, h);
  // blendMode(NORMAL);
  fill(#5100CC,25);
  strokeWeight(0);
  stroke(0);
  rect(0,0,width,height);
}
