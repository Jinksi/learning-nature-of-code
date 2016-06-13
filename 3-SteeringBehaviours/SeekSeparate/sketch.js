var vehicles = [];
var vehicleCount = 150;
var sr;

function setup(){
  sr = random(0.2, 5);
  pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < vehicleCount; i++){
    vehicles[i] = new Vehicle(width/2 + random(-5, 5), height/2 + random(-5, 5), sr);
  }
  background(21)
}

function draw(){
  blendMode(NORMAL);
  background(21, 175);
  blendMode(NORMAL);
  if(vehicles.length > vehicleCount){
    vehicles.splice(0, vehicles.length - vehicleCount)
  }
  vehicles.map(function(vehicle){
    vehicle.applyBehaviours(vehicles)
    vehicle.update();
    vehicle.display();
  });
}

function mouseDragged(){
  vehicles.push(new Vehicle(mouseX, mouseY, sr))
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(21);
}
