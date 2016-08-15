var vehicles = []
var vehicleCount = 250
var sr

function setup(){
  pixelDensity(2)
  createCanvas(windowWidth, windowHeight, WEBGL)
  background(21)
  for(var i = 0; i < vehicleCount; i++){
    sr = random(5, 20)

    vehicles[i] = new Vehicle(width/2 + random(-5, 5), height/2 + random(-5, 5), random(1000), sr)
  }

}

function draw(){
  // ambientLight(255, 255, 255);
  // blendMode(NORMAL);
  background(21)
  // blendMode(NORMAL);
  if(vehicles.length > vehicleCount){
    vehicles.splice(0, vehicles.length - vehicleCount)
  } else {
    // vehicles.push( new Vehicle(width/2 + random(-50, 50), height/2 + random(-50, 50), -random(300), sr) );
  }
  vehicles.map(function(vehicle){
    vehicle.applyBehaviours(vehicles)
    vehicle.update()
    vehicle.display()
  })
}

function mouseDragged(){
  // vehicles.push(new Vehicle(mouseX, mouseY, 300, sr))
}

function mouseClicked(){
  for(var i = 0; i < vehicleCount; i++){
    vehicles[i] = new Vehicle(width/2 + random(-5, 5), height/2 + random(-5, 5), random(1000), sr)
  }
}
// setInterval(function(){
//   for(var i = 0; i < vehicleCount; i++){
//     vehicles[i] = new Vehicle(width/2 + random(-5, 5), height/2 + random(-5, 5), random(1000), sr);
//   }
// }, 5000);

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  background(21)
}
