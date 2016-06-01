var w;

function setup(){
  createCanvas(windowWidth, windowHeight);
  w = new Walker();
}

function draw(){
  background(51);
  w.walk();
  w.display();
}

function Walker(){
  // classic
  // this.x = width/2;
  // this.y = height/2;

  // Vector
  this.pos = createVector(width/2, height/2);

  this.walk = function(){
    this.pos.x = this.pos.x + random(-5, 5);
    this.pos.y = this.pos.y + random(-5, 5);
  };

  this.display = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 45, 45);
  };

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
