Walker t, u, v, w;

void setup(){
  fullScreen();
  frameRate(120);
  t = new Walker(width/2,0);
  u = new Walker(width/2,height/2);
  v = new Walker(0,height/2);
  w = new Walker(0,0);

  background(31);
}

void draw(){ 
   t.step();
   u.step();
   v.step();
   w.step();
   t.render();
   u.render();
   v.render();
   w.render();

}