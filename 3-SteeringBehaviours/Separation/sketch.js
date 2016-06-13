var vehicles = [];
var vehicleCount = 100;
var sr;

function setup(){
  sr = random(0.2, 5);
  pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < vehicleCount; i++){
    vehicles[i] = new Vehicle(random(width), random(height), sr);
  }
  background(21)
}

function draw(){
  blendMode(NORMAL);
  background(21, 255);
  blendMode(NORMAL);
  if(vehicles.length > vehicleCount){
    vehicles.splice(0, vehicles.length - vehicleCount)
  }
  vehicles.map(function(vehicle){
    vehicle.separate(vehicles)
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
