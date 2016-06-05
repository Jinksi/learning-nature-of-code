var Wind = function(c){

  // initialise Perlin offset
  this.xoff = 0;
  this.c = c;
  this.direction = createVector(0,0);

  this.calculateForce = function(part){
    // force relative to particle mass
    var force = this.direction.mult(part.mass * part.mass);
    force.setMag(this.c);
    return force;
  };

  this.update = function(){
    // create new vector from Perlin Noise
    this.direction = createVector(
      map(noise(this.xoff), 0, 1, -1, 1),
      map(noise(this.xoff + 7), 0, 1, -1, 1)
    );
    // scale by coefficient
    this.direction.mult(this.c);
    // increment Perlin offset
    this.xoff += 0.005;
  };

};
