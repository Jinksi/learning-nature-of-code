var particle1;
var particle2;
var liquid;

function setup(){
  createCanvas(650, 400);
  background(21);

  liquid = new Liquid(0, height / 2, width, height/2, 0.1 );

  function createParticles(){
    particle1 = new Particle(200, 100, 3);
    particle2 = new Particle(400, 100, 1);
    particles = [particle1, particle2];
  }

  createParticles();
  setInterval(function(){
    createParticles();
  }, 5000);
}

function draw(){
  background(21);

  liquid.display();

  particles.map(function(part){
    if(liquid.contains(part)){
      part.darken();
      // liquid
      part.applyForce(
        liquid.calculateDrag(part)
      );

    } else {
      part.lighten();
    }
  });

  // apply force to object via method
  particles.map(function(part){
    // gravity
    part.applyForce(
      createVector(0, 0.1*part.mass)
    );
  });
  particles.map(function(part){part.update();});
  particles.map(function(part){part.edges();});
  particles.map(function(part){part.display();});
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(21);
}
