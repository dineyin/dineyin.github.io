
var gui;
var mainGraphics, outputGraphics;

function setup() {
	noStroke();
	createCanvas(windowWidth, windowHeight);
  mainGraphics = createGraphics(windowWidth,windowHeight);
  params = new patternParameters();
  gui = new dat.GUI();
  initGui();

	renderCircles(mainGraphics);
}

function draw() 
{
	renderCircles(mainGraphics);
  textSize(32);
  fill(255, 255, 255);
  image(mainGraphics,0,0);
  //Some debug text
  //text(str(params.circle_color), 10, 30);
  //text(str(params.piece_shape), 10, 90);
}

//Features to add
// overlap
// proper rotation
// seamless output
// size gradient
// speed improvement
// custom shapes (stars, shamrocks, pumpkins and ghosts)
// random eyes and ears on some circles
// presets (UI already provides this)
// Save
var patternParameters = function()
{
  this.circle_size = 50;
  this.circle_distance = 50;
  this.position_offset= 0;
  this.size_offset = 0;
  this.stagger = true;

  this.circle_color = '#dcd7be'; // RGB array
  this.color_offset = 0;

  this.back_color = '#a53c3c'; // RGB array

  this.piece_rotation = 0;
  this.whole_rotation = 0;

  this.random_seed = 1000;
  this.piece_shape = 'Circle';
  this.save = function()
  {
    outputGraphics = createGraphics(floor(params.circle_size + params.circle_distance), floor((params.circle_size + params.circle_distance ) *2 *0.866025));
    renderCircles(outputGraphics);
    save(outputGraphics, 'dots.png');
    
  }
}

//If the input is a color array then just return that, if it's not check that it's a string and unhex it
function colorToColorArray(inputColor)
{
  if (Array.isArray(inputColor))
  {
    return inputColor;
  }
  else
  {
    inputColor = str(inputColor);
    outputColor = [unhex(inputColor.substring(1, 2)), unhex(inputColor.substring(3, 4)),unhex(inputColor.substring(5, 6))];
    return outputColor;
  }
}



function renderCircles(gp)
{  
  gp.background(params.back_color);
  gp.rectMode(CENTER);
  gp.angleMode(DEGREES);
  gp.noStroke();
  randomSeed(params.random_seed);
  gp.push();
  gp.rotate(params.whole_rotation);
  gp.translate(0, -params.circle_size *0.52);
  for (i = 0; i <= int(gp.height / (params.circle_size + params.circle_distance) + 4); i = i+1)
  {
    for (j = 0; j <= int(gp.width / (params.circle_size + params.circle_distance) + 3); j = j+1) 
    {
      gp.push();
      var fillColor = color(params.circle_color);
      gp.fill(red(fillColor) + random(-params.color_offset, params.color_offset), green(fillColor) + random(-params.color_offset, params.color_offset), blue(fillColor) + random(-params.color_offset, params.color_offset));
      var offset = (params.stagger) ? (i % 2) : 0;
      var vertical_offset = (params.stagger) ? 0.866025: 1;
      
      gp.translate((j - (offset/2.0)) * (params.circle_size + params.circle_distance)+ random(-params.position_offset, params.position_offset), i * (params.circle_size + (params.circle_distance)) * (vertical_offset) + random(-params.position_offset, params.position_offset));
      gp.rotate(params.piece_rotation);
      var scaled_circle_size = Math.max(params.circle_size + random(-params.size_offset * params.circle_size, params.size_offset * params.circle_size) , 10);
      switch (params.piece_shape)
      {        
        case 'Square':
          gp.rect(0,0, scaled_circle_size/1.0, scaled_circle_size/1.0);
          break;
        case 'RSquare':
          gp.rect(0,0, scaled_circle_size/1.0, scaled_circle_size/1.0, scaled_circle_size/5.0);
          break;
        case 'Cross':
          gp.rect(0,0, scaled_circle_size/1.0, scaled_circle_size/3.0);
          gp.rect(0,0, scaled_circle_size/3.0, scaled_circle_size/1.0);
          break;
        case 'Star5':
          star(0,0, scaled_circle_size/1.8, scaled_circle_size/4.0,5,gp);
          break;
		case 'Star4' :
		  star(0,0, scaled_circle_size/1.8, scaled_circle_size/6.0,4,gp);
          break;
        case 'Circle':
        default:
          gp.ellipse(0,0, scaled_circle_size/1.0, scaled_circle_size/1.0);
          break
      }
      
      
      gp.pop();
    }
  }
  gp.pop();    
}

function star(x,  y,  radius1, radius2, npoints, gp) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  gp.beginShape();
  for (a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    gp.vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    gp.vertex(sx, sy);
  }
  gp.endShape(CLOSE);
}

var initGui = function() {
  var f1 = gui.addFolder('Pattern Parameters');
  f1.add(params, 'circle_size',10,300);
  f1.add(params, 'circle_distance',0,300);
  f1.add(params, 'whole_rotation', 0,90);
  f1.add(params, 'piece_rotation', 0,90);
  f1.add(params, 'piece_shape', { Circle: 'Circle', Square: 'Square', RoundedSquare: 'RSquare', Star_5: 'Star5' , Star_4: 'Star4' , Cross: 'Cross'});
  f1.add(params, 'stagger'); 
  f1.add(params, 'save'); 
  
  var f2 = gui.addFolder('Colors');  
  f2.addColor(params, 'circle_color');  
  f2.addColor(params, 'back_color');

  var f3 = gui.addFolder('Randomness');  
  f3.add(params, 'random_seed');
  f3.add(params, 'size_offset', 0,1);
  f3.add(params, 'position_offset',0,100);  
  f3.add(params, 'color_offset',0,255); 
};