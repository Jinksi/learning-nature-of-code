var Vehicle = function(x, y){
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);

  // maximum magnitude
  this.maxSpeed = 5;
  // turning circle
  this.maxForce = 0.5;

  this.applyForce = function(force){
    this.acc.add(force);
  };

  this.seek = function(target){
    // steering = desired - velocity

    // The desired vector – the full magnitude between target & currentPos
    var desired = p5.Vector.sub(target, this.pos);
    // setMag to maxspeed
    desired.setMag(this.maxSpeed);

    var steering = p5.Vector.sub(desired, this.vel);
    // limit to maxForce
    steering.limit(this.maxForce);

    // Apply the steering force on the vehicle
    this.applyForce(steering);
  };

  this.update = function(){
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed); // limit vel to maxSpeed
    this.pos.add(this.vel);
    this.acc.set(0,0);
  };

  this.display = function(){
    fill(255, 150);
    stroke(255);
    ellipse(this.pos.x, this.pos.y, 40, 40);
  };

};
