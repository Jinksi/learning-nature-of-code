var w;

function setup(){
  createCanvas(windowWidth, windowHeight);
  w = new Walker();
}

function draw(){
  background(51);
  w.update();
  w.display();
}

function Walker(){

  this.pos = createVector(width/2, 0);
  // Position affected by Velocity
  this.vel = createVector(0, 0); // Initially 0
  // Velocity affected by Acceleration
  this.acc = createVector(0, 0.1);

  this.update = function(){
    this.vel.add(this.acc);
    this.pos = this.pos.add(this.vel);
  };

  this.display = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 45, 45);
  };

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
