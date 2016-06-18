var vehicles = []
var vehicleCount = 20
var sr
var drum
var filter
var reverb
var dry
var wet
var master
var amplitude
var seekVector
var seekTimer
var seekStorage

function setup(){
  sr = random(0.2, 5)
  pixelDensity(2)
  createCanvas(windowWidth, windowHeight)

  seekTimer = 0

  hpf = new p5.HighPass()
  hpf.freq(200)
  hpf.disconnect()
  lpf = new p5.LowPass()
  lpf.freq(1500)
  lpf.disconnect()
  reverb = new p5.Reverb()
  reverb.disconnect()

  master = new p5.Gain()
  master.connect()

  dry = new p5.Gain()
  dry.connect(hpf)
  hpf.connect(lpf)
  lpf.connect(master)
  dry.amp(1.5)

  wet = new p5.Gain()
  wet.connect(master)
  reverb.process(lpf, 30, 5)
  var wetFilt = new p5.HighPass()
  wetFilt.freq(400)
  wetFilt.disconnect()
  reverb.connect(wetFilt)
  wet.setInput(wetFilt)
  wet.amp(5)

  master.amp(4)

  amplitude = new p5.Amplitude()
  drum = new Drum(width/2, height/2, 100)
  background(21)

  seekVector = createVector(width/2, height/2)

}

function draw(){

  if(vehicles.length < vehicleCount){
    vehicles.push(new Vehicle(width/2 + random(-5, 5), height/2 + random(-5, 5), sr))
  }

  blendMode(NORMAL)
  background(21, 175)
  blendMode(NORMAL)
  if(vehicles.length > vehicleCount){
    vehicles.splice(0, vehicles.length - vehicleCount)
  }
  var vis = amplitude.getLevel() * 100
  drum.opac = map(vis, 0, 1, 0, 1)
  drum.render()

  seekStorage = seekVector.copy()

  for(var i = 0; i < vehicles.length; i++){
    if(!vehicles[i].initialised){
      vehicles[i].initAudio()
      vehicles[i].osc.disconnect()
      vehicles[i].osc.connect(dry)
    }
    vehicles[i].applyBehaviours(vehicles)
    vehicles[i].update()
    vehicles[i].detectEntry(drum)
    vehicles[i].display()

    if(mouseX !== 0 && mouseY !== 0){
      vehicles[i].seekVector = seekVector
    }
    if(seekVector.dist(seekStorage) === 0){
      seekTimer += 1

    } else {
      seekTimer = 0
    }
    if(seekTimer > 5000){
      seekVector = createVector(random((width/2) - 200, (width/2) + 200), random((height/2) - 200,(height/2) + 200))

      for(var i = 0; i < vehicleCount; i++){
        vehicles[i].seekVector = seekVector
      }
      seekTimer = 0
    }
  }

}

function mouseMoved(){
  seekVector = createVector(mouseX, mouseY)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  drum.pos = createVector(width/2, height/2)
  background(21)
}
