var particle1;
var particle2;

function setup(){
  createCanvas(650, 400);
  background(21);
  particle1 = new Particle(200, 100, 3);
  particle2 = new Particle(400, 100, 1);
}

function draw(){
  background(21);

  // create force external to object
  var gravity1 = createVector(0, 0.1*particle1.mass);
  var gravity2 = createVector(0, 0.1*particle2.mass);
  var wind = createVector(0.3, 0);
  // apply force to object via method
  particle1.applyForce(gravity1);
  particle2.applyForce(gravity2);

  if(mouseIsPressed){
    particle1.applyForce(wind);
    particle2.applyForce(wind);
  }

  particle1.update();
  particle1.edges();
  particle1.display();
  particle2.update();
  particle2.edges();
  particle2.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(21);
}
