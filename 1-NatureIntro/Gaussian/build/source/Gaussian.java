import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class Gaussian extends PApplet {

public void setup(){
  
  // pixelDensity(2);
  background(0xff5100CC);
}

public void draw(){

  float h = (height / 2) + (randomGaussian() * height/2);
  fill(0xff1ADFB9, 200);
  stroke(0xff1ADFB9, 255);
  // blendMode(ADD);
  ellipse(width/2, height/2, h, h);
  // blendMode(NORMAL);
  fill(0xff5100CC,25);
  strokeWeight(0);
  stroke(0);
  rect(0,0,width,height);
}
  public void settings() {  size(800,800); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Gaussian" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
