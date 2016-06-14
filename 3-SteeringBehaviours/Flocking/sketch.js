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
    boids[i].arg1 = map(mouseX, 0, width, 0, 3)
    boids[i].arg2 = map(mouseY, 0, height, 0, 3)
    boids[i].maxForce = map(mouseY, 0, height, 0, 1)
    boids[i].maxSpeed = map(mouseX, 0, height, 0, 30)
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
