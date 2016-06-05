var particles = [];
var particleCount = 100;
var air;
var gravity;
var wind;

function setup(){
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  background(21);

  // Add particles to array
  for (var i = 0; i < particleCount; i++) {
    particles[i] = new Particle(width / particleCount * i, random(height), random(20, 50));
  }
  
  // Initialise forces
  gravity = new Gravity(1);
  air = new Air(0.0005);
  wind = new Wind(0.5);
}

function draw(){
  blendMode(MULTIPLY);
  background('rgba(31, 31, 31, .03)');
  blendMode(NORMAL);
  noStroke();
  // each particle
  particles.map(function(part){
    // apply forces
    part.applyForce(gravity.calculateForce(part));
    part.applyForce(air.calculateForce(part));
    part.applyForce(wind.calculateForce(part));
    // update particle
    part.update();
    part.edges();
    part.display();
  });
  // update forces
  wind.update();
  gravity.rotate();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(21);
}
