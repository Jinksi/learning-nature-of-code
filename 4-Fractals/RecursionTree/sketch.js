
var xoff = 0
var d = 10
var origx
var origy

function setup(){
  pixelDensity(2)
  createCanvas(windowWidth, windowHeight)
  background(21)

  origx = width/2
  origy = height/2
}

function draw(){
  background(50, 40)
  drawCircle(origx, origy, d)
  d+= 20
  xoff += 0.0005
  fill(50, d / 2)
  ellipse(width/2, height/2, 100, 100)
}

function drawCircle(x, y, diam){
  noFill()
  stroke('rgba(255, 255, 255, '+ map(diam, 2, width, 0.5, 1) + ')')
  strokeWeight(1)
  ellipse(x, y, diam, diam)
  if(diam > 2){
    diam *= map(noise(xoff), 0, 1, 0.85, 0.99)
    drawCircle(x, y, diam)
  }

}

function mouseClicked() {
  d = 10
  fill(50, 255)
  rect(0, 0, width, height)

  origx = mouseX
  origy = mouseY
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(21)
}
