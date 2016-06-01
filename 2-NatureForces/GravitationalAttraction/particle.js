xoff = 0;
function Particle(x, y, m){
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0.8);
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
  };

  this.display = function(){
    var size = map(noise(xoff-52), 0, 1, 5, 10);
    blendMode(ADD);
    fill('#68ABFA');
    ellipse(this.pos.x, this.pos.y, (this.mass)*size, (this.mass)*size);
    xoff += 0.01;
  };

  this.edges = function() {
    if(this.pos.y > height){
      this.vel.y *= -1;
      this.pos.y = height;
    }
    if(this.pos.x > width){
      this.vel.x *= -1;
      this.pos.x = width;
    }
  };
}
