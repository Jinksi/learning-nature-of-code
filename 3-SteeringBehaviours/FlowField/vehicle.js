var Vehicle = function(x, y, sr){
  this.prevPos = createVector(x,y);
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.r = 3;
  this.colour = Math.round(random(0,1)) === 0 ? '#E33590' : '#BE5005';
  this.xoff = random(0, 100);
  this.sr = sr || 10;
  // maximum magnitude
  this.maxSpeed = random(sr / 10, sr);
  // turning circle
  this.maxForce = random(0.02, 0.07);

  this.applyForce = function(force){
    this.acc.add(force);
  };

  this.follow = function(flow){

    // what is the vector at this spot in flow field
    var desired = flow.lookup(this.pos);
    desired.mult(this.maxSpeed);
    // steering = desired - velocity
    var steering = p5.Vector.sub(desired, this.vel);
    // limit to maxForce
    steering.limit(this.maxForce);

    // Apply the steering force on the vehicle
    this.applyForce(steering);
  };

  this.update = function(){
    this.prevPos = this.pos.copy();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed); // limit vel to maxSpeed
    this.pos.add(this.vel);
    this.acc.set(0,0);

    if(this.pos.y < 0){ this.pos.y = this.prevPos.y = height; }
    if(this.pos.x < 0){ this.pos.x = this.prevPos.x = width; }
    if(this.pos.y > height){ this.pos.y = this.prevPos.y = 0; }
    if(this.pos.x > width){ this.pos.x = this.prevPos.x =  0; }
  };

  this.display = function(){
    blendMode(ADD);
    stroke(this.colour);
    strokeWeight(map(noise(this.xoff), 0, 1, 1, 5));
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.xoff += 0.3;
  };

};
