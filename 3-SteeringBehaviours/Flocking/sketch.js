var boids = []
var boidCount = 200
var trail = 3
var opacity = true

function setup(){
  pixelDensity(2)
  createCanvas(windowWidth, windowHeight)
  for(var i = 0; i < boidCount; i++){
    boids[i] = new Boid(random(width), random(height))
  }
  background(21)
}

function draw(){
  bg = opacity ? 255 : 50
  background(21, bg)
  for(var i = 0; i < boids.length; i++){
    boids[i].run(boids)
    boids[i].arg1 = map(mouseX, width, 0, 0, 3)
    boids[i].arg2 = map(mouseY, height, 0, 3, 0)
    boids[i].maxForce = map(mouseY, height, 0, 0.05, 1)
    boids[i].maxSpeed = map(mouseY, height, 0, 1, 10)
    boids[i].trailLength = trail
  }
}

function keyPressed(){
  if(keyCode === 32){
    opacity = !opacity
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(21)
}
