var particles = [];
var particleCount = 100;

function setup(){
  background('rgba(31, 31, 31, 1');
  createCanvas(windowWidth, windowHeight);
  background(21);
  for (var i = 0; i < particleCount; i++) {
    particles[i] = new Particle(random(width), random(height), random(1, 3));
  }
}

function mousePressed(){
  var p = new Particle(mouseX, mouseY, random(1, 3));
  particles.push(p);
  particles.map(function(particle){
    particle.acc.add(createVector(0, random(-5, 0)));
  });
}

function keyPressed(){
  // spacebar
  if(keyCode === 32){
    particles.map(function(particle){
      particle.acc.add(createVector(0, random(50)));
    });
  }
}

function draw(){
  blendMode(MULTIPLY);
  background('rgba(31, 31, 31, 0.2)');

  for (var i = 0; i < particles.length; i++) {
    // create force external to object
    var gravity = createVector(0, 0.1*particles[i].mass);
    // apply force to object via method
    particles[i].applyForce(gravity);
    particles[i].update();
    particles[i].edges();
    particles[i].display();
  }

  if(particles.length > 150){
    particles.splice(0, particles.length - 150);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(21);
}
