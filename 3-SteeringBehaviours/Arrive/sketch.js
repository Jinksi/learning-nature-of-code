var vehicle;

function setup(){
  createCanvas(windowWidth, windowHeight);
  vehicle = new Vehicle(width/2, height/2);
}

function draw(){
  background(21);
  vehicle.update();
  vehicle.display();

  var target = createVector(mouseX,mouseY);

  // 1. action selection
  vehicle.arrive(target);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(21);
}
