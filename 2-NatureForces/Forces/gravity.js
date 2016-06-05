var Gravity = function(c){

  this.c = c;

  this.direction = createVector(0, this.c);
  this.center = createVector(width/2, height/2);

  this.calculateForce = function(part){
    // gravity relative to particle mass
    var force = this.direction.mult(part.mass * part.mass);
    force.setMag(this.c);
    return force;
  };

  this.rotate = function(){
    // rotate based on mouse pos relative to center of canvas
    var mousePos = createVector(mouseX, mouseY);
    this.direction = mousePos.sub(this.center);
  };

};
