function Particle(x, y, mass){
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = mass;

  // method to be influenced by external force
  this.applyForce = function(force){
    // do not affect original force value
    var f = force.copy();
    // F = m * a
    f.div(this.mass);
    this.acc.add(f);
  };

  this.update = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // reset acc for next force calculation
    this.acc.set(0, 0);
  };

  this.display = function(){
    fill(255);
    // scale size by mass
    ellipse(this.pos.x, this.pos.y, mass/15, mass/15);
  };

  this.edges = function() {
    // keep in canvas
    if(this.pos.y > height){
      this.pos.y = 0;
    }
    if(this.pos.x > width){
      this.pos.x = 0;
    }
    if(this.pos.y < 0){
      this.pos.y = height;
    }
    if(this.pos.x < 0){
      this.pos.x = width;
    }
  };
}
