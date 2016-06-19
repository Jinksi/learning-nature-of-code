
var arms = []

function setup(){
  frameRate(60)
  pixelDensity(2)
  createCanvas(windowWidth, windowHeight)
  background(21)
}

function draw(){
  background(21, 255)
  noStroke()
  fill(0, 150)
  ellipse(width/2, height/2, 35, 35)

  if(arms.length < 150){
    arms.push(
      new Arm(
        createVector(width/2, height/2),
        createVector(random(-1.5, 1.5), random(-1.5, 1.5)),
        50, 0.05
      )
    )
  }

  for(var i = 0; i < arms.length; i++){
    arms[i].update()
    arms[i].render()

    if(arms[i].timeToSplit() && arms.length < 1000){
      if(random(1) < 0.1){
        arms.push(arms[i].split(random(-35, 35)))
        arms.push(arms[i].split(random(-35, 35)))
      } else {
        arms.push(arms[i].split(random(-35, 35)))
      }
    }

  }
}

function windowResized() {
  arms = []
  resizeCanvas(windowWidth, windowHeight)
  background(21)
}
