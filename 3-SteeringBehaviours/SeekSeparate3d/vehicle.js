var Vehicle = function(x, y, z, sr){
  this.prevPos = createVector(x,y, z)
  this.pos = createVector(x,y, z )
  this.vel = createVector(0,0, 0)
  this.acc = createVector(0,0, 0)
  this.colour = random(1) > 0.5 ? 'RGB(150, 211, 250)' : '255'
  this.xoff = random(0, 100)
  this.sr = sr
  this.desiredSeparation = 50
  this.birth = millis()
  // maximum magnitude
  this.maxSpeed = random(this.sr / 5, this.sr)
  // turning circle
  this.maxForce = random(0.2, 0.01)

  this.applyForce = function(force){
    this.acc.add(force)
  }

  this.applyBehaviours = function(vehicles){
    var separateForce = this.separate(vehicles)
    var seekVector = createVector(mouseX, mouseY, 200)
    if(mouseX === 0 && mouseY === 0){
      seekVector = createVector(width/2, height/2, 0)
    }
    var seekForce = this.seek(seekVector)

    separateForce.mult(5)
    seekForce.mult(0.2)

    this.applyForce(separateForce)
    this.applyForce(seekForce)

  }

  this.seek = function(target){
    var desired = p5.Vector.sub(target, this.pos)

    desired.setMag(this.maxSpeed)

    // Steering = desired - velocity
    var steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    return steer
  }

  this.separate = function(vehicles){
    var desiredSeparation = this.desiredSeparation
    var sum = createVector(0,0, 0)
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
      return steer
    } else {
      return createVector(0,0, 0)
    }

  }

  this.update = function(){
    this.prevPos = this.pos.copy()
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed) // limit vel to maxSpeed
    this.pos.add(this.vel)
    this.acc.set(0,0)
    // this.colour = map(millis(), this.birth, millis() + 6000, 255, 0);
    // if(this.pos.y < 0){ this.pos.y = this.prevPos.y = 0; }
    // if(this.pos.x < 0){ this.pos.x = this.prevPos.x = 0; }
    // if(this.pos.y > height){ this.pos.y = this.prevPos.y = height; }
    // if(this.pos.x > width){ this.pos.x = this.prevPos.x =  width; }
  }

  this.display = function(){
    push()
    // blendMode(ADD);
    stroke(this.colour)
    // stroke(255);
    // fill(255);
    // strokeWeight(map(noise(this.xoff), 0, 1, 1, 5));
    translate(-width/2, -height/2, 0)
    // translate(this.pos.x, this.pos.y, this.pos.z)
    line(this.pos.x, this.pos.y, this.pos.z, this.prevPos.x, this.prevPos.y, this.prevPos.z)

    // triangle(
    //   this.pos.x, this.pos.y, this.pos.z,
    //   this.prevPos.x, this.prevPos.y, this.prevPos.z,
    //   this.pos.x + map(noise(this.xoff), 0, 1, -2, 2), this.pos.y + map(noise(this.xoff), 0, 1, -2, 2), this.pos.z
    // )
      // sphere(1);
    pop()

    this.xoff += 0.03
  }

}
