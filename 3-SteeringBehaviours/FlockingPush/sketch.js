var boids = []
var boidCount = 200
var trail = 3
var opacity = true

var arg1 = 1
var arg2 = 1
var arg3 = 1
var arg4 = 1

var push = new Push().init('fader')
  .then(function(push){
    console.log(push.knobs.knob8)
    push.knobs.knob5.addListener(function(val){
      arg1 += val / 200
      arg1 = constrain(arg1, 0, 1)
      console.log(arg1)
    })
    push.knobs.knob6.addListener(function(val){
      arg2 += val / 200
      arg2 = constrain(arg2, 0, 1)
      console.log(arg2)
    })
    push.knobs.knob7.addListener(function(val){
      arg3 += val / 200
      arg3 = constrain(arg3, 0, 1)
      console.log(arg3)
    })
    push.knobs.knob8.addListener(function(val){
      arg4 += val / 200
      arg4 =   constrain(arg4, 0, 1)
      console.log(arg4)
    })
  })

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
    boids[i].arg1 = map(arg1, 0, 1, 0, 3)
    boids[i].arg2 = map(arg2, 0, 1, 3, 0)
    boids[i].maxForce = map(arg3, 0, 1, 0.05, 1)
    boids[i].maxSpeed = map(arg4, 0, 1, 1, 10)
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
