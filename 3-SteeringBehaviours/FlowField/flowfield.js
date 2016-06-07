var FlowField = function(res){
  // resolution of each 'cell'
  this.resolution = res;

  // Determine Columns/Rows
  this.cols = width/this.resolution;
  this.rows = height / this.resolution;

  // fake 2D array
  this.make2Darray = function(n){
    var array = [];
    for (var i = 0; i < n; i++){
      array[i] = [];
    }
    return array;
  };

  this.init = function(){
    this.field = null;
    this.field = this.make2Darray(this.cols);
    // reseed noise
    noiseSeed(Math.floor(random(10000)));
    var xoff = 0;
    for (var i = 0; i < this.cols; i++){
      var yoff = 7;
      for (var j = 0; j < this.rows; j++){
        // generate random angle for this cell
        var theta = map(noise(xoff, yoff), 0, 1, 0, PI * 1.5);
        // theta = map(random(), 0, 1, 0, TWO_PI);
        // Polar to cartesian coordinate transformation to get x and y components of the vector
        vect = createVector(cos(theta), sin(theta));

        this.field[i][j] = vect.mult(-1);
        yoff += 0.3;
      }
      xoff += 0.3;
    }
  };

  this.init();

  // Draw each vector
  this.display = function(){
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
      }
    }
  };

  this.drawVector = function(v, x, y, scale){
    push();
    var arrowsize = 4;
    // Translate to vector location
    translate(x, y);
    stroke(150);
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    //  calc mag of vector and scale
    var len = v.mag() * scale;
    // draw line
    line(0, 0, len, 0);
    pop();
  };

  // instructions to Vehicle
  this.lookup = function(lookup){
    var col = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    var row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
    return this.field[col][row].copy();
  };
};
