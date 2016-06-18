var Vehicle = function(x, y, sr){
  var scale = [36, 44, 48, 51, 60, 62, 70, 72, 75]
  this.prevPos = createVector(x,y)
  this.pos = createVector(x,y)
  this.vel = createVector(0,0)
  this.acc = createVector(0,0)
  this.colour = 0
  this.xoff = random(0, 100)
  this.sr = 10
  this.desiredSeparation = 30
  // maximum magnitude
  this.maxSpeed = random(this.sr / 5, this.sr)
  // turning circle
  this.maxForce = random(0.5, 0.01)

  this.seekVector = createVector(width/2, height/2)

  this.initialised = false

  this.initAudio = function(){
    this.envelope = new p5.Env()
    // set attackTime, decayTime, sustainRatio, releaseTime
    this.envelope.setADSR(0.01, 0.5, 0.0, 0.0)
    // set attackLevel, releaseLevel
    this.envelope.setRange(0.1, 0)

    this.note = scale[Math.floor(random(scale.length))]
    this.osc = new p5.TriOsc()
    this.osc.amp(0)
    this.osc.start()
    this.initialised = true
  }


  this.applyForce = function(force){
    this.acc.add(force)
  }

  this.applyBehaviours = function(vehicles){
    var separateForce = this.separate(vehicles)
    var seekForce = this.seek(this.seekVector)

    separateForce.mult(1.5)
    seekForce.mult(1)

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
      return steer
    } else {
      return createVector(0,0)
    }

  }

  this.update = function(){
    this.prevPos = this.pos.copy()
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed) // limit vel to maxSpeed
    this.pos.add(this.vel)
    this.acc.set(0,0)

    if(this.pos.y < 0){ this.pos.y = this.prevPos.y = 0 }
    if(this.pos.x < 0){ this.pos.x = this.prevPos.x = 0 }
    if(this.pos.y > height){ this.pos.y = this.prevPos.y = height }
    if(this.pos.x > width){ this.pos.x = this.prevPos.x =  width }
  }

  this.display = function(){
    blendMode(NORMAL)
    stroke(this.colour)
    strokeWeight(map(noise(this.xoff), 0, 1, 1, 5))
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
    this.xoff += 0.3
  }

  this.playNote = function(){
    var freqValue = midiToFreq(this.note)
    this.osc.freq(freqValue)
    this.envelope.play(this.osc, 0, 0.1)
  }

  this.detectEntry = function(drum){
    var dist = p5.Vector.dist(this.pos, drum.pos)
    if(dist < drum.diam / 2){
      if(this.colour !== 0){
        this.playNote()
        drum.react()
      }
      this.colour = 0
    } else {
      if(this.colour !== 255){
        // this.playNote()
        // drum.react()
      }
      this.colour = 255
    }
  }

}
