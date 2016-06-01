var xoff = 0;
function Attractor(x, y){
  this.pos = createVector(x, y);
  this.mass = 150;
  this.G = 1;

  // Key info needed to calculate force:
  //
  // 1. Which way is the force pointing?
  // 2. How strong is the force?
  //

  this.calculateAttraction = function(particle){
    // calc direction of force
    var force = p5.Vector.sub(this.pos, particle.pos);
    // calc distance between objects
    var distance = force.mag();
    // Keep things under control
    distance = constrain(distance, 10, 13);
    // Normalize Vector
    force.normalize();
    // calc gravitational force mag
    var strength = (this.G * this.mass * particle.mass) / (distance * distance);
    // Get force vector --> mag * dist
    force.mult(strength);
    return force;
  };

  this.display = function(){
    blendMode(NORMAL);
    fill('#353535');
    var size = 75;
    ellipse(this.pos.x, this.pos.y, size, size);
    xoff += 0.01;
  };
}
