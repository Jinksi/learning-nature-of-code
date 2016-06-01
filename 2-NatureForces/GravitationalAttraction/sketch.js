var particle;
var attractor;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background('RGBA(248, 77, 77, 1)');
  noStroke();
  particle = new Particle((width/2)-200, (height/2), 1);
  attractor = new Attractor(width/2, height/2);
}

function draw(){
  background('RGBA(248, 77, 77, 0.0)');

  var force = attractor.calculateAttraction(particle);
  particle.applyForce(force);

  particle.update();

  blendMode(OVERLAY);
  particle.display();
  attractor.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background('RGBA(248, 77, 77, 1)');
}
