var flowfield;
var vehicles = [];
var vehicleCount = 300;
var sr;

function setup(){
  sr = random(0.2, 5);
  pixelDensity(2);
  createCanvas(windowWidth, windowHeight);
  // for(var i = 0; i < vehicleCount; i++){
  //   vehicles[i] = new Vehicle(random(width), random(height));
  // }
  vehicles[0] = new Vehicle(random(width), random(height), sr);
  flowfield = new FlowField(100);
  background(21);
  setInterval(function(){
    flowfield.init();
  }, 10000);
}

function draw(){
  blendMode(NORMAL);
  background(21, 100);
  blendMode(NORMAL);

  vehicles.map(function(vehicle){
    vehicle.update();
    vehicle.display();
    vehicle.follow(flowfield);
  });
  if(vehicles.length < vehicleCount){
    vehicles.push(new Vehicle(random(width), random(height), sr));
  }
  // flowfield.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(21);
}
