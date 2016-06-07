var Vehicle = function(x, y, r){
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.r = r || 6;

  // maximum magnitude
  this.maxSpeed = 5;
  // turning circle
  this.maxForce = 0.2;

  this.applyForce = function(force){
    this.acc.add(force);
  };

  this.arrive = function(target){
    // steering = desired - velocity

    // The desired vector – the full magnitude between target & currentPos
    var desired = p5.Vector.sub(target, this.pos);

    // ARRIVE
    var d = desired.mag();
    if(d < 100){
      // Map desired mag according to dist
      var m = map(d, 0, 100, 0, this.maxSpeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxSpeed);
    }


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
    // draw triangle rotated toward heading
    var theta = this.vel.heading() + HALF_PI;
    fill(255, 150);
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();
    pop();
  };

};
