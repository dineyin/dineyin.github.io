
var circle_size = 50;
var circle_distance = 15;
var random_offset= 0;
var stagger_offset = true;


var circle_r = 220;
var circle_g = 140;
var circle_b = 130;
var circle_color_random = 20;

var back_r = 60;
var back_g = 140;
var back_b = 165;

var piece_rotation = 0;
var whole_rotation = 0;

var rSlider, gSlider, bSlider, randomColorSlider;

function setup() {
	noStroke();
	createCanvas(800, 600);

	renderCircles();

	rSlider = createSlider(0, 255, 100);
	rSlider.position(650, 20);
	gSlider = createSlider(0, 255, 0);
	gSlider.position(650, 40);
	bSlider = createSlider(0, 255, 255);
	bSlider.position(650, 60);
	randomColorSlider = createSlider(0, 255, 45);
	randomColorSlider.position(650, 80);  
  pieceRotationSlider = createSlider(0, 255, 0);
  pieceRotationSlider.position(650, 100);  
  circleSizeSlider = createSlider(10, 300, 45);
  circleSizeSlider.position(650, 120);  
}

function draw() 
{
	getUIState();
	renderCircles();  
}

function getUIState()
{
	circle_r = rSlider.value();
	circle_b = bSlider.value();
	circle_g = gSlider.value();
	circle_color_random = randomColorSlider.value();
  piece_rotation = pieceRotationSlider.value();
  circle_size = circleSizeSlider.value();
}

function renderCircles()
{
  background(back_r, back_g, back_b);
  randomSeed(0);
  push();
  rotate(whole_rotation);
  for (i = 0; i <= int(width / (circle_size + circle_distance) + 1); i = i+1)
  {
    for (j = 0; j <= int(width / (circle_size + circle_distance) +1); j = j+1) 
    {
      push();
      fill (circle_r + random(-circle_color_random, circle_color_random), circle_g+ random(-circle_color_random, circle_color_random), circle_b+ random(-circle_color_random, circle_color_random));
      var offset = (stagger_offset) ? (i % 2) : 0;
      var vertical_offset = (stagger_offset) ? 0.866025: 1;
      
      translate((j - (offset/2.0)) * (circle_size + circle_distance)+ random(-random_offset, random_offset), i * (circle_size + (circle_distance)) * (vertical_offset) + random(-random_offset, random_offset));
      rotate(piece_rotation);
      star(0,0, circle_size/2.0, circle_size/4.0,5);
      
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