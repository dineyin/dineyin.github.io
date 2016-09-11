
var gui;

function setup() {
	noStroke();
	createCanvas(windowWidth, windowHeight);
  frameRate(5);

  params = new patternParameters();
  gui = new dat.GUI();
  initGui();

	renderCircles();
}

function draw() 
{
	renderCircles();  
}

//Features to add
// overlap
// proper rotation
// seamless output
// size gradient
// size randomness
// speed improvement
// custom shapes (stars, shamrocks, pumpkins and ghosts)
// random eyes and ears on some circles
// presets (UI already provides this)
// Save
var patternParameters = function()
{
  this.circle_size = 50;
  this.circle_distance = 15;
  this.position_offset= 0;
  this.size_offset = 0;
  this.stagger = true;

  this.circle_color = [ 220, 140, 130 ]; // RGB array
  this.color_offset = 0;

  this.back_color = [ 60, 140, 165 ]; // RGB array

  this.piece_rotation = 0;
  this.whole_rotation = 0;

  this.random_seed = 1000;
}

function renderCircles()
{
  background(params.back_color[0], params.back_color[1], params.back_color[2]);
  randomSeed(params.random_seed);
  push();
  rotate(params.whole_rotation);
  for (i = 0; i <= int(width / (params.circle_size + params.circle_distance) + 1); i = i+1)
  {
    for (j = 0; j <= int(width / (params.circle_size + params.circle_distance) +1); j = j+1) 
    {
      push();
      fill (params.circle_color[0] + random(-params.color_offset, params.color_offset), params.circle_color[1] + random(-params.color_offset, params.color_offset), params.circle_color[2]+ random(-params.color_offset, params.color_offset));
      var offset = (params.stagger) ? (i % 2) : 0;
      var vertical_offset = (params.stagger) ? 0.866025: 1;
      
      translate((j - (offset/2.0)) * (params.circle_size + params.circle_distance)+ random(-params.position_offset, params.position_offset), i * (params.circle_size + (params.circle_distance)) * (vertical_offset) + random(-params.position_offset, params.position_offset));
      rotate(params.piece_rotation);
      ellipse(0,0, params.circle_size/1.0, params.circle_size/1.0,5);
      
      pop();
    }
  }
  pop();
}





function star(x,  y,  radius1, radius2,npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

var initGui = function() {
  var f1 = gui.addFolder('Pattern Parameters');
  f1.add(params, 'circle_size',10,300);
  f1.add(params, 'circle_distance',0,300);
  f1.add(params, 'stagger'); 
  
  var f2 = gui.addFolder('Colors');  
  f2.addColor(params, 'circle_color');  
  f2.addColor(params, 'back_color');

  var f3 = gui.addFolder('Randomness');  
  f3.add(params, 'random_seed');
  f3.add(params, 'size_offset', 0,1);
  f3.add(params, 'position_offset',0,100);  
  f3.add(params, 'color_offset',0,255); 
};