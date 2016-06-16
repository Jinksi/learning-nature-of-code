// Flocking – Eric Jinks

// Move mouse around viewport to affect behaviour

var boids = []
var boidCount = 200

function setup(){
  pixelDensity(2)
  createCanvas(windowWidth, windowHeight)
  for(var i = 0; i < boidCount; i++){
    boids[i] = new Boid(random(width), random(height))
  }
  background(21)
}

function draw(){
  background(21)

  for(var i = 0; i < boids.length; i++){
    boids[i].run(boids)

    // Update behaviours based on mouse position
    boids[i].sep = map(mouseX, width, 0, 0, 3)
    boids[i].ali = map(mouseX, width, 0, 3, 0)
    boids[i].maxForce = map(mouseY, height, 0, 0.05, 1)
    boids[i].maxSpeed = map(mouseY, height, 0, 1, 10)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(21)
}
