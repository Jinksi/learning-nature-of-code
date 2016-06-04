function Particle(x, y, m){
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.mass = m;

  // method to be influenced by external force
  this.applyForce = function(force){
    // do not affect original force value
    var f = force.copy();
    f.div(this.mass);
    this.acc.add(f);
  };

  this.update = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // reset acc for next force calculation
    this.acc.set(0, 0);
    this.vel.mult(0.99);
  };

  this.display = function(){
    noStroke();
    blendMode(ADD);
    fill('RGBA(104, 171, 250, 0.5)');
    ellipse(this.pos.x, this.pos.y, this.mass*10, this.mass*10);
  };

  this.edges = function() {
    if(this.pos.y > height){
      this.vel.y *= -0.9;
      this.pos.y = height;
    }
    if(this.pos.x > width){
      this.vel.x *= -0.9;
      this.pos.x = width;
    }
  };
}
