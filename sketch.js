var p;
var sys;

function setup() {
  createCanvas(400, 400);
  sys = new particleSystem([0,0]);
  world = new World();
  flow = new flowField();
  flow.display();
  colorMode(RGB);    
}

function draw() {
  background(220);
  sys.update();
  sys.run();
  sys.emit(random(0, 400), random(0, 400)); 
  flow.update();

}

function mousePressed() {
   
}