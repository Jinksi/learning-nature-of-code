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

  this.pos = createVector(width/2, height/2);
  // Position affected by Velocity
  this.vel = createVector(0, 0); // Initially 0
  // creating initial Acceleration vector from random Radian
  // Radian ranges from 0 -> 2PI
  this.acc = p5.Vector.fromAngle(TWO_PI);

  this.update = function(){

    var mouse = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouse, this.pos);
    // this.acc.normalize();
    // this.acc.mult(0.5);
    // Or setMag()
    this.acc.setMag(0.3);

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
