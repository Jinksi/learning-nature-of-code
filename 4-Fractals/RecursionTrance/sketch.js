var locs = []
function setup(){
  frameRate(60)
  pixelDensity(2)
  createCanvas(windowWidth, windowHeight)
  background(21)
  locs.push([ width/2, height/2, 0, 100000 ])
  locs.push([ width/2, height/2, 0, random(10000) ])
  setInterval(function(){
    locs.splice(0, 2)
    locs.push([ width/2, height/2, 0, 10000 ])
    locs.push([ width/2, height/2, 0, random(10000) ])
  }, 20000)
}

function draw(){
  background(50, 255)
  for(var i = 0; i < locs.length; i++){
    drawCircle(locs[i][0], locs[i][1], locs[i][2], locs[i][3])
    locs[i][0] += map(noise(locs[i][3]), 0, 1, -2, 2)
    locs[i][1] += map(noise(locs[i][3] - 70), 0, 1, -2, 2)
    // if(locs[i][0] < 50 ) locs[i][0] = 50
    // if(locs[i][0] > width -50 ) locs[i][0] = width -50
    // if(locs[i][1] < 50 ) locs[i][1] = 50
    // if(locs[i][1] > height -50 ) locs[i][1] = height -50
    locs[i][2] += 10
    locs[i][3] += 0.002
  }
  for(var i = 0; i < locs.length; i++){
    fill(50, locs[i][2] / 2)
    ellipse(locs[i][0], locs[i][1], 100, 100)
  }
}

function drawCircle(x, y, diam, xoff){
  noFill()
  stroke('rgba(255, 255, 255, '+ map(diam, 2, width, 0.5, 1) + ')')
  strokeWeight(1)
  ellipse(x, y, diam, diam)
  if(diam > 50){
    // diam *= .9
    diam *= map(noise(xoff), 0, 1, 0.8, 0.9)
    drawCircle(x, y, diam, xoff)
  }

}

function mouseClicked() {
  locs.splice(0, 2)
  locs.push([ mouseX, mouseY, 10, random(10000) ])
  locs.push([ mouseX, mouseY, 10, random(10000) ])
}

function mouseDragged(){
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(21)
}
