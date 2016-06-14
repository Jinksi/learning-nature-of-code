function Boid(x, y, maxSpeed, maxForce, trailLength){
  this.acc = createVector(0, 0)
  this.vel = createVector(random(-1, 1), random(-1, 1))
  this.pos = createVector(x, y)

  this.maxSpeed = maxSpeed || 5
  this.maxForce = maxForce || 0.1
  this.desiredSeparation = 50
  // this.col = Math.round(Math.random(0, 1)) ? '#F84D4D' : '#68ABFA'
  this.col = '255'

  this.trailLength = trailLength || 2
  this.trailPoints = []

  this.arg1 = 1
  this.arg2 = 1
  this.arg3 = 2


  this.run = function(boids){
    this.flock(boids)
    this.update()
    this.edges()
    this.render()
  }

  this.render = function(){
    blendMode(ADD)
    stroke(this.col)
    strokeWeight(1)
    if(this.trailPoints.length > 1){
      for(var i = 1; i < this.trailPoints.length; i++){
        var curr = this.trailPoints[i]
        var prev = this.trailPoints[i - 1]
        if(
          Math.abs(curr.x - prev.x) < width - (width/3) &&
          Math.abs(curr.y - prev.y) < height - (height/3)
        ){
          line(curr.x, curr.y, prev.x, prev.y)
        }
      }
    }
  }

  this.edges = function(){
    if(this.pos.x < 0) this.pos.x = width
    if(this.pos.y < 0) this.pos.y = height
    if(this.pos.x > width) this.pos.x = 0
    if(this.pos.y > height) this.pos.y = 0
  }

  this.update = function(){
    this.trailPoints.push(this.pos.copy())
    if(this.trailPoints.length > this.trailLength){
      this.trailPoints.splice(0, this.trailPoints.length - this.trailLength)
    }
    // Update velocity
    this.vel.add(this.acc)
    // limit velocity
    this.vel.limit(this.maxSpeed)
    // update position
    this.pos.add(this.vel)
    // reset acceleration to 0
    this.acc.mult(0)
  }

  this.applyForce = function(force){
    this.acc.add(force)
  }

  this.seek = function(target){
    var desired = p5.Vector.sub(target, this.pos)
    desired.normalize()
    desired.mult(this.maxSpeed)

    // Steering = desired - velocity
    var steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    return steer
  }

  this.flock = function(boids){
    var separate = this.separate(boids)
    var align = this.align(boids)
    var cohesion = this.cohesion(boids)

    // weighting
    separate.mult(this.arg1)
    align.mult(this.arg2)
    cohesion.mult(this.arg3)

    this.applyForce(separate)
    this.applyForce(align)
    this.applyForce(cohesion)
  }

  this.separate = function(boids){
    var steer = createVector(0, 0)
    var count = 0

    // check each boid to determine separation steering force
    for(var i = 0; i < boids.length; i++){
      // calc distance
      var dist = p5.Vector.dist(this.pos, boids[i].pos)
      if(dist > 0 && dist < this.desiredSeparation){
        // calc vector to avoid
        var diff = p5.Vector.sub(this.pos, boids[i].pos)
        diff.normalize()
        diff.div(dist) // weight by dist
        steer.add(diff)
        count++
      }
    }

    // average steer force
    if(count > 0) steer.div(count)

    // if steer is > 0
    if(steer.mag() > 0){
      // steering = desired - velocity
      steer.normalize()
      steer.mult(this.maxSpeed)
      steer.sub(this.vel)
      steer.limit(this.maxForce)
    }
    return steer
  }

  this.align = function(boids){
    var neighbourDist = 50
    var sum = createVector(0, 0)
    var count = 0
    for (var i = 0; i < boids.length; i++){
      var dist = p5.Vector.dist(this.pos, boids[i].pos)
      if(dist > 0 && dist < neighbourDist){
        sum.add(boids[i].vel)
        count++
      }
    }

    if(count > 0){
      sum.div(count)
      sum.normalize()
      sum.mult(this.maxSpeed)
      var steer = p5.Vector.sub(sum, this.vel)
      steer.limit(this.maxForce)
      return steer
    } else {
      return createVector(0, 0)
    }
  }

  this.cohesion = function(boids){
    var neighbourDist = 50
    var sum = createVector(0, 0)
    var count = 0
    for (var i = 0; i < boids.length; i++){
      var d = p5.Vector.dist(this.pos, boids[i].pos)
      if(d > 0 && d < neighbourDist){
        sum.add(boids[i].pos) // Add location of neighbour
        count++
      }
    }

    if(count > 0){
      // Average the neighbour locations
      sum.div(count)
      return this.seek(sum)
    } else {
      return createVector(0, 0)
    }
  }

}
