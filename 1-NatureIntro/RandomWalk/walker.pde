class Walker {
  int xpos, ypos;
  Walker(int x, int y) {
    xpos = x;
    ypos = y;
  }
  
  void render() {
    stroke(255);
    point(xpos,ypos);
  }
  
  /// randomly move
  void step() {
    float vx = random(-4, 4);
    float vy = random(-4, 4);
    xpos += vx;
    ypos += vy;
    
    // Stay on screen
    if(xpos < 0){ xpos = width; }
    if(xpos > width){ xpos = 0; }
    if(ypos < 0){ ypos = height; }
    if(ypos > height){ ypos = 0; }
  }
}