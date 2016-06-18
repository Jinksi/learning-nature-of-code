var Drum = function(x, y, diam){
  this.pos = createVector(x, y)
  this.diam = diam
  this.colour = 255
  this.opac = 0

  this.emissions = []

  this.render = function(){
    noStroke()
    blendMode(ADD)
    fill('rgba(104, 171, 250, ' + this.opac / 2 + ')')
    ellipse(this.pos.x, this.pos.y, diam+2, diam+2)
    blendMode(NORMAL)
    fill(this.colour)
    ellipse(this.pos.x, this.pos.y, diam, diam)
    for(var i = 0; i < this.emissions.length; i++){
      this.emissions[i].render()
    }
  }
  this.react = function(){
    this.emissions.push(new Emit(this.pos.x, this.pos.y, this.diam))
    setTimeout(function(){
      this.emissions.splice(0, 1)
    }.bind(this), 2000)
  }.bind(this)

}

var Emit = function(x, y, size){
  this.size = size + 100
  this.x = x
  this.y = y
  this.time = 1
  this.colour = 255
  this.render = function(){
    noFill()
    stroke(this.colour, 255 - (this.time * 30))
    strokeWeight(1)
    ellipse(this.x, this.y, this.size * this.time / 2, this.size * this.time / 2)
    this.time += 0.1
  }
}
