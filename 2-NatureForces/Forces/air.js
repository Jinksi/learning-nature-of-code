var Air = function(c){

  this.c = c;

  this.calculateForce = function(part){
    // Magnitude is coefficient * speed squared
    var speed = part.vel.mag();
    var dragMagnitude = this.c * speed * speed;

    // Direction is the inverse of velocity
    var dragForce = part.vel.copy();
    dragForce.mult(-1);

    dragForce.setMag(dragMagnitude);
    // Scale the drag relative to particle mass
    dragForce.mult(part.mass * part.mass);
    return dragForce;
  };

};
