var Vehicle = function(x, y, sr){
  this.prevPos = createVector(x,y);
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.r = 3;
  this.colour = Math.round(random(0,1)) === 0 ? 'RGB(104, 171, 250)' : '#C01B3B';
  this.xoff = random(0, 100);
  this.sr = 10;
  this.desiredSeparation = 100
  // maximum magnitude
  this.maxSpeed = random(this.sr / 10, this.sr);
  // turning circle
  this.maxForce = random(0.1, 0.2);

  this.applyForce = function(force){
    this.acc.add(force);
  };

  this.separate = function(vehicles){
    var desiredSeparation = this.desiredSeparation
    var sum = createVector(0,0)
    var count = 0
    for (var i = 0; i < vehicles.length; i++){
      var d = p5.Vector.dist(this.pos, vehicles[i].pos)
      if(d > 0 && d < desiredSeparation){
        // calc opposing vector
        var diff = p5.Vector.sub(this.pos, vehicles[i].pos)
        diff.normalize()
        diff.div(d) // weight by distance
        sum.add(diff)
        count++
      }
    }
    // Average the forces
    if(count > 0){
      sum.div(count)
      sum.normalize()
      sum.mult(this.maxSpeed)

      // Steering = desired - velocity
      var steer = p5.Vector.sub(sum, this.vel)
      steer.limit(this.maxForce)
      this.applyForce(steer)
    }

  }

  this.update = function(){
    this.prevPos = this.pos.copy();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed); // limit vel to maxSpeed
    this.pos.add(this.vel);
    this.acc.set(0,0);

    if(this.pos.y < 0){ this.pos.y = this.prevPos.y = 0; }
    if(this.pos.x < 0){ this.pos.x = this.prevPos.x = 0; }
    if(this.pos.y > height){ this.pos.y = this.prevPos.y = height; }
    if(this.pos.x > width){ this.pos.x = this.prevPos.x =  width; }
  };

  this.display = function(){
    blendMode(ADD);
    stroke(this.colour);
    strokeWeight(map(noise(this.xoff), 0, 1, 8, 10));
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.xoff += 0.3;
  };

};
