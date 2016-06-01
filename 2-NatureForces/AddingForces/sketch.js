var particle;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(21);
  particle = new Particle();
}

function draw(){
  background(21);

  // create force external to object
  var gravity = createVector(0, 0.1);
  var wind = createVector(0.3, 0);
  // apply force to object via method
  particle.applyForce(gravity);

  if(mouseIsPressed){
    particle.applyForce(wind);
  }

  particle.update();
  particle.edges();
  particle.display();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(21);
}
