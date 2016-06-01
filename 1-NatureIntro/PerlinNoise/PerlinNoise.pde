float t = 0; // Initialise time

void setup(){
  pixelDensity(2);
  size(800,800);
  background(#050505);
}

void draw(){


  fill(#212121, 0);
  blendMode(NORMAL);
  rect(0,0,width,height);

  // random
  float x = random(0, width);
  float y = random(0, height);
  fill(255);
  noStroke();
  //ellipse(x, y, 7, 7);

  // Perlin Noise
  t = t + 1;
  for(int i = 1; i <= 50; i++){
    float tx = t / i;
    float p = noise(tx);
    float p2 = noise(tx - 2);
    float a = map(p, 0, 1, 0, width);
    float b = map(p2, 0, 1, 0, height);
    fill(#FF3690, 50);
    noStroke();
    blendMode(ADD);
    float size = 2;
    ellipse(a, b, size, size);

  }

}
