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


  this.update = function(){
    // Randomise Acceleration
    this.acc = createVector(random(-1, 1), random(-1, 1));
    // Scale the Acceleration down using mult
    // a.k.a reduce magnitude
    this.acc.mult(0.1);

    this.vel.add(this.acc);
    this.pos.add(this.vel);
  };

  this.display = function(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, 45, 45);
  };

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
