var Arm = function(start, acc, time, opacity){
  this.xoff = 0
  this.start = start.copy()
  this.pos = start.copy()
  this.vel = createVector(0, 0)
  this.timerstart = time
  this.timer = time
  this.opacity = opacity * 255
  this.acc = acc.copy()
  this.growing = true
  this.angle = 0

  this.dir = random(1) < 0.5 ? 'x' : 'y'

  this.update = function(){
    this.angle += 0.1
    this.vel.add(this.acc)
    this.acc.set(0, 0)
    var move
    if(this.growing){
      this.pos.add(this.vel)
      move = 0.4
    } else {
      move = 0.15
    }
    if(this.dir === 'x'){
      this.pos.add(createVector(
          map(sin(this.angle), -1, 1, -move, move),
          0
        )
      )
    } else {
      this.pos.add(createVector(
          0,
          map(sin(this.angle), -1, 1, -move, move)
        )
      )
    }
  }

  this.applyForce = function(force){
    if(!this.growing){
      this.acc.add(force)
    }
  }

  this.render = function(){
    this.xoff += 0.05
    blendMode(ADD)
    stroke(255, this.opacity * map(noise(this.xoff), 0, 1, 0, 1))
    line(this.start.x, this.start.y, this.pos.x, this.pos.y)
  }

  this.timeToSplit = function(){
    this.timer--
    if(this.timer < 0 && this.growing){
      this.growing = false
      return true
    } else {
      return false
    }
  }

  this.split = function(angle){
    // current heading
    var theta = this.vel.heading()
    // current speed
    var mag = this.vel.mag()
    // Turn
    theta += radians(angle)
    // Polar to Cartesian
    var newVel = createVector(mag*cos(theta), mag*sin(theta))
    newVel.setMag(random(1))
    // new arm
    return new Arm(this.pos, newVel, this.timerstart + random(5), opacity + 0.04)

  }
}
